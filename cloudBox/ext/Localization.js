var internal = {
    defaultLanguage: "en",
    supportedLanguages: [
        "ar", "bg", "ca", "cs", "de", "el", "en",
        "es", "fi", "fr", "he", "hu", "id", "it",
        "ja", "ko", "nb", "nl", "pl", "pt-BR", "pt-PT",
        "ro", "ru", "sr", "tr", "vi", "zh-CN", "zh-TW"
    ],
    loadedMessages: {},
    cacheMessages:function(language, callback, async){

        var request = new XMLHttpRequest();
        request.open("GET", chrome.extension.getURL("/_locales/" + language.replace(/-/g, "_") + "/messages.json"), async);
        request.onload = function(){
            if(this.status === 200){
                var response = this.responseText.replace(/\/\*.+\*\//g, "");
                internal.loadedMessages[language] = JSON.parse(response);
                callback({status: "ok"});
            }else{
                callback({status: "failed"});
            }
        };
        request.onerror = function(){
            callback({status: "failed"});
        };
        request.send();

    }
}

// internal.cacheMessages(args.language, function(result){
//     if(result.status === "failed"){
//         // language is not available
//         // app.getMessage(internal.defaultLanguage, args.messageName, args.callback);
//         return;
//     }
//     // var messages = internal.loadedMessages[args.language];
//     // if(args.messageName in messages){
//     //     // message found
//     //     args.callback(messages[args.messageName].message);
//     // }else if(args.language === internal.defaultLanguage){
//     //     // message not found and is already the default language
//     //     // args.callback("");
//     // }else{
//     //     // message not found in current language, try default language
//     //     // app.getMessage(internal.defaultLanguage, args.messageName, args.callback);
//     // }
// });
