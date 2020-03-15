//百度贴吧：不登录即可看贴 by VA

readFromDB('section_uptime')
function readFromDB(name, column, callback, condition){
    var db = openDatabase('DB', '1.0', 'my database', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS section_uptime (ms,timestamp)');
    var lastUpdateFromPreviousSection = localStorage["section_uptime"];
    if(lastUpdateFromPreviousSection){
        var ms = lastUpdateFromPreviousSection.ms,
            timestamp = lastUpdateFromPreviousSection.ts;

        tx.executeSql('INSERT INTO section_uptime VALUES ('+ ms +','+ timestamp+')',[],function(tx,r){});
        localStorage.removeItem("section_uptime");
    }else{
        var ms = 44444,
            timestamp = 555;
        tx.executeSql('INSERT INTO section_uptime VALUES ('+ ms +','+ timestamp+')',[],function(tx,r){});
        // log("SectionUptimeManager", "Cannot find update from previous section.");
    }

    // set update loop
});
    db.transaction(function (tx) {
        try{
            tx.executeSql('SELECT * FROM ' + name + (condition ? " WHERE " + condition : ""),[],function(tx,r){
                var data = [];
                for(var i = r.rows.length-1; i >= 0 ; i--){  //reverse date ordering
                    if(column){
                        data.push(r.rows.item(i)[column]);
                    }else{
                        data.push(r.rows.item(i));
                    }
                }
                callback && callback(data);
            });
        }catch (e) {


        }
    });
}

// 在页面上插入代码
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', chrome.extension.getURL('block/block.js'));
document.documentElement.appendChild(script);

// content-script 共享dom 不共享js  需要js 通过inject-js
// chrome.windows.Object.freeze = null;
// 监听title改变
// new window.MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
// let type = mutation.type;
// switch (type) {
//     case "childList":
//         console.log("A child node has been added or removed.");
//         break;
//     case "attributes":
//         console.log(`The ${mutation.attributeName} attribute was modified.`);
//         break;
//     case "subtree":
//         console.log(`The subtree was modified.`);
//         break;
//     default:
//         break;
// }
//     });
// }).observe(document.querySelector('head > title'), { subtree: true, characterData: true, childList: true })
// .disconnect(); 阻止监听
document.addEventListener('DOMContentLoaded', function()
{
    try {
        console.log('登录成功')
        // document.querySelector(".index-logo-src").style.display='none'
        // chrome.windows.PageData.user.is_login = 1;
        // unsafeWindow.PageData.user.is_login = 1; //油猴使用方式
    } catch (error) {
    }
    var $ads = [
        // 贴吧推广
        '.spreadad, .game_frs_step1, .BAIDU_CLB_AD, .dasense, .u9_head',
        '.j_click_stats, .p_postlist>div:not(.l_post):not(.p_postlist)',
        '[id="pagelet_frs-header/pagelet/head_content_middle"]',
        '[id="pagelet_encourage-appforum/pagelet/my_app"]',
        '.life_helper',

        // 到处插入的广告
        '[data-daid]',

        // 右下角广告
        '#game_pop_window',

        // 直播
        '#game_live_list',

        // 10 年
        '#j_ten_years',

        // 1l 下方的广告
        '#sofa_post, .banner_post',

        // 贴吧顶部广告
        '#pb_adbanner',

        // 图片页面
        '.af_head_gamelink',

        // 左右侧
        '.j_couplet',

        // 右侧
        '#encourage_entry',
        '.platform_aside_tieba_partner',

        // 客户端发贴 x 倍经验
        '.tb_poster_placeholder',

        // 语音按钮 (需要客户端)
        '.edui-btn-voice, .j_voice_ad_gif, .lzl_panel_voice',

        // 发帖请遵守 ....
        '.poster_head_surveillance',

        // 不水能死何弃疗！
        '.lzl_panel_wrapper > tbody > tr > td:first-child > p',

        // 会员相关广告
        '.doupiao_offline, .fMember_cnt',

        // 右上角
        '.u_tshow, .u_tbmall, .u_app, .u_wallet, .u_xiu8',
        '.u_mytbmall, .u_joinvip, .u_baiduPrivilege, .u_appcenterEntrance',

        // 右下角
        '#pop_frame, #__bdyx_tips, #__bdyx_tips_icon',

        // 猜拳
        '.add_guessing_btn, .guessing_watermark',

        // 帖子推荐
        '.thread_recommend',

        // 右下角广告
        '#__bdyx_tips, #__bdyx_tips_icon, .baidu-tuisong-wrap, .baidutuisong',

        // 打赏、分享
        '.reward_btn, .share_btn_wrapper',

        // 烟花
        '.firework_sender_wrap, .global_notice_wrap',

        '.tbui_fbar_share, .tbui_fbar_tsukkomi, .tbui_fbar_props, .tbui_fbar_square, .tbui_fbar_home',

        '#tshow_out_date_warn, #selectsearch-icon',
        '.index-logo-src',

        // 贴吧推荐
        '#forum_recommend'
    ].join(', ');
    try {
        $($ads).remove();
    }catch (e) {
        console.log(e)
        console.log('111111111111')
    }
},true);

chrome.runtime.onMessage.addListener((data, sender) => {
    console.log("85555555555555")
    // const data = event.data;
    console.log(data)
    if (data.type === 'ajaxInterceptor' && data.to === 'background1') {
        postMessage({type: 'ajaxInterceptor',
            to: 'background1', key: 'ajaxInterceptor_rules', value: data.value});
      //  adInterceptorBlock.settings[data.key]=data.value
    }
    return true;
});
// window.addEventListener("message", function(event) {
//
// }, false);
