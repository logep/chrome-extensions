const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,   //有浏览器界面启动
        slowMo: 100,       //放慢浏览器执行速度，方便测试观察
        args: [            //启动 Chrome 的参数，详见上文中的介绍
            '–no-sandbox',
            '--window-size=1280,960'
        ],
        // defaultViewport: {width: 1440, height: 780},
        ignoreHTTPSErrors: false, //忽略 https 报错
        // args: ['--start-fullscreen'] //全屏打开页面
        dumpio:false
    });
    await page.setViewport({width: 1920, height: 800});
    const page = await browser.newPage();
    await page.goto('https://baidu.com');

    await page.screenshot(
        {path: './temp/example.png',
        type: 'png',
        fullPage: true //边滚动边截图
        // clip: {x: 0, y: 0, width: 1920, height: 800}
        });
    //对页面某个元素截图
    let [element] = await page.$x('/html/body/section[4]/div/div[2]');
    await element.screenshot({
        path: './temp/element.png'
    });




    await page.close();

    await login(browser);
    await request(browser);
    await websocketTest(browser);
    await innerJavascript(browser);
    await innerFrame(browser);
    await tracing(browser);
    await upload(browser);
    await newtab(browser);
    await device(browser);


    await browser.close();
})();
async function  device (browser) {
    const iPhone = puppeteer.devices['iPhone 6'];
    await page.emulate(iPhone);
    await page.goto('https://www.google.com');
    await page.type('#index-kw', 'puppeteer')
    await page.click('#index-bn')
    await page.waitForNavigation({ timeout: 3000 })
    await page.screenshot({
        path: 'c:/temp/baidu_iphone_X_search_puppeteer.png'
    })
    await page.close();
}
async function  newtab (browser) {
    let page = await browser.newPage();
    await page.goto(url);
    let btn = await page.waitForSelector('#btn');
//在点击按钮之前，事先定义一个 Promise，用于返回新 tab 的 Page 对象
    const newPagePromise = new Promise(res =>
        browser.once('targetcreated',
            target => res(target.page())
        )
    );
    await btn.click();
//点击按钮后，等待新tab对象
    let newPage = await newPagePromise;
}
async function  upload (browser) {
    const page = await browser.newPage();
    //通过 CDP 会话设置下载路径
    const cdp = await page.target().createCDPSession();
    await cdp.send('Page.setDownloadBehavior', {
        behavior: 'allow', //允许所有下载请求
        downloadPath: 'path/to/download'  //设置下载路径
    });
    //点击按钮触发下载
    await (await page.waitForSelector('#someButton')).click();
    //等待文件出现，轮训判断文件是否出现 这个方法是自己实现
    await waitForFile('path/to/download/filename');

    //上传时对应的 inputElement 必须是<input>元素
    let inputElement = await page.waitForXPath('//input[@type="file"]');
    await inputElement.uploadFile('/path/to/file');
    await page.close();
}
async function  innerFrame (browser) {
    const page = await browser.newPage();
    await page.goto('https://www.188.com');
    //点击使用密码登录
    let passwordLogin = await page.waitForXPath('//*[@id="qcode"]/div/div[2]/a');
    await passwordLogin.click();
    for (const frame of page.mainFrame().childFrames()){
        //根据 url 找到登录页面对应的 iframe
        if (frame.url().includes('passport.188.com')){
            await frame.type('.dlemail', 'admin@admin.com');
            await frame.type('.dlpwd', '123456');
            await Promise.all([
                frame.click('#dologin'),
                page.waitForNavigation()
            ]);
            break;
        }
    }
    await page.close();
}
async function  tracing (browser) {
    const page = await browser.newPage();
    await page.tracing.start({path: './files/trace.json'});
    await page.goto('https://www.google.com');
    await page.tracing.stop();
    /*
        continue analysis from 'trace.json'
    */
}
async function  websocketTest (browser) {
    const page = await browser.newPage();
    //创建 CDP 会话
    let cdpSession = await page.target().createCDPSession();
    //开启网络调试,监听 Chrome DevTools Protocol 中 Network 相关事件
    await cdpSession.send('Network.enable');
    //监听 webSocketFrameReceived 事件，获取对应的数据
    cdpSession.on('Network.webSocketFrameReceived', frame => {
        let payloadData = frame.response.payloadData;
        if(payloadData.includes('push:query')){
            //解析payloadData，拿到服务端推送的数据
            let res = JSON.parse(payloadData.match(/\{.*\}/)[0]);
            if(res.code !== 200){
                console.log(`调用websocket接口出错:code=${res.code},message=${res.message}`);
            }else{
                console.log('获取到websocket接口数据：', res.result);
            }
        }
    });
    await page.goto('https://netease.youdata.163.com/dash/142161/reportExport?pid=700209493');
    await page.waitForFunction('window.renderdone', {polling: 20});
    await page.close();
}
async function  innerJavascript (browser) {
    const page = await browser.newPage();
    await page.goto('https://webmail.vip.188.com');
    //注册一个 Node.js 函数，在浏览器里运行
    await page.exposeFunction('md5', text =>
        crypto.createHash('md5').update(text).digest('hex')
    );
    //通过 page.evaluate 在浏览器里执行删除无用的 iframe 代码
    await page.evaluate(async () =>  {
        let iframes = document.getElementsByTagName('iframe');
        for(let i = 3; i <  iframes.length - 1; i++){
            let iframe = iframes[i];
            if(iframe.name.includes("frameBody")){
                iframe.src = 'about:blank';
                try{
                    iframe.contentWindow.document.write('');
                    iframe.contentWindow.document.clear();
                }catch(e){}
                //把iframe从页面移除
                iframe.parentNode.removeChild(iframe);
            }
        }
        //在页面中调用 Node.js 环境中的函数
        const myHash = await window.md5('PUPPETEER');
        console.log(`md5 of ${myString} is ${myHash}`);
    });
    await page.close();
}
async function  request (browser) {
    const page = await browser.newPage();
    const blockTypes = new Set(['image', 'media', 'font']);
    await page.setRequestInterception(true); //开启请求拦截
    page.on('request', request => {
        const type = request.resourceType();
        const shouldBlock = blockTypes.has(type);
        if(shouldBlock){
            //直接阻止请求
            return request.abort();
        }else{
            //对请求重写
            return request.continue({
                //可以对 url，method，postData，headers 进行覆盖
                headers: Object.assign({}, request.headers(), {
                    'puppeteer-test': 'true'
                })
            });
        }
    });
    await page.goto('https://demo.youdata.com');
    await page.close();

}
async function  login (browser) {
    //输入账号密码
    const page = await browser.newPage();
    await page.goto('https://demo.youdata.com');
    const uniqueIdElement = await page.$('#uniqueId');
    await uniqueIdElement.type('admin@admin.com', {delay: 20});
    const passwordElement = await page.$('#password', {delay: 20});
    await passwordElement.type('123456');
    //点击确定按钮进行登录
    let okButtonElement = await page.$('#btn-ok');
    //等待页面跳转完成，一般点击某个按钮需要跳转时，都需要等待 page.waitForNavigation() 执行完毕才表示跳转成功
    await Promise.all([
        okButtonElement.click(),
        page.waitForNavigation()
    ]);
    console.log('admin 登录成功');

    await page.close();

}
