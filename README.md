git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:logep/test.git
git push -u origin main


1.提示框需要定制化
2. 隔离期间完成的成绩
## 实现
- webRequest 拦截
- 自定义拦截ajax请求
- 消息通知从backgroud 到page 到options
-  chrome提供的各种数据库操作
- 菜单支持 右键菜单多入口支持打开系统 chrome.contextMenus
- 右键支持自定义选择内容
- Components.define写法支持
- 国际化支持 chrome自带
- 支持清除缓存
- 增加通过chrome.windows.create打开窗口
- 增加支持一键定制打开浏览器窗口url地址定时打开
- 支持页面跳转多种方式
## todo
- 各个组件通信
- 建立一个chrome app

3.localstorage 注意变化的时候需要值变化 不然触发不了

## 接口

- post 支持 chrome.runtime.connect({name: 'POP'}),chrome.runtime.onConnect.addListener
- chrome.browserAction.setPopup({popup:"popup.html"});chrome.browserAction.setTitle({title:"hello"})

## chrome app 支持
- 建立一个快捷方式
- "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"  --profile-directory=Default --app-id=fhbjgbiflinjbdggehcddcbncdddomop
- 起始位置 "C:\Program Files (x86)\Google\Chrome\Application"
- 设置图标位置 %USERPROFILE%\AppData\Local\Google\Chrome\User Data\Default\Web Applications\_crx_dfilbdgggidhfmleclddbojgcllhdikb\Postman.ico
- 有两种方式实现 打开windows窗口 一种postman方式上述方式
- 第二种 通过 chrome.windows.create  借鉴 chromeWinCreate

## 注意
- 一定要注意js加载顺序 特别是backgroud里的js 比如某些js方法会引用jquery,jquery一定要放在前面

## puppeteer

国内带Chromium安装使用：npm install puppeteer-chromium-resolver --save

npm i puppeteer-core

npm install  puppeteer-cn
## page 我们怎么去获取页面中的某个元素呢
page.$('#uniqueId')：获取某个选择器对应的第一个元素
page.$$('div')：获取某个选择器对应的所有元素
page.$x('//img')：获取某个 xPath 对应的所有元素
page.waitForXPath('//img')：等待某个 xPath 对应的元素出现
page.waitForSelector('#uniqueId')：等待某个选择器对应的元素出现
## elementHandle 都提供了哪些操作元素的函数
elementHandle.click()：点击某个元素
elementHandle.tap()：模拟手指触摸点击
elementHandle.focus()：聚焦到某个元素
elementHandle.hover()：鼠标 hover 到某个元素上
elementHandle.type('hello')：在输入框输入文本
##page  页面事件
page.on('close') 页面关闭
page.on('console') console API 被调用
page.on('error') 页面出错
page.on('load') 页面加载完
page.on('request') 收到请求
page.on('requestfailed') 请求失败
page.on('requestfinished') 请求成功
page.on('response') 收到响应
page.on('workercreated') 创建 webWorker
page.on('workerdestroyed') 销毁 webWorker

##有哪些函数可以在浏览器环境中执行代码呢？
  page.evaluate(pageFunction[, ...args])：在浏览器环境中执行函数
  page.evaluateHandle(pageFunction[, ...args])：在浏览器环境中执行函数，返回 JsHandle 对象
  page.$$eval(selector, pageFunction[, ...args])：把 selector 对应的所有元素传入到函数并在浏览器环境执行
  page.$eval(selector, pageFunction[, ...args])：把 selector 对应的第一个元素传入到函数在浏览器环境执行
  page.evaluateOnNewDocument(pageFunction[, ...args])：创建一个新的 Document 时在浏览器环境中执行，会在页面所有脚本执行之前执行
  page.exposeFunction(name, puppeteerFunction)：在 window 对象上注册一个函数，这个函数在 Node 环境中执行，有机会在浏览器环境中调用 Node.js 相关函数库
