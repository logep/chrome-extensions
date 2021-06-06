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
