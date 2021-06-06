var languages=[
    "en",
    "zh-TW",
    "es",
    "ru",
    "nl",
    "pt-BR",
    "zh-CN",
    "fr",
    "he",
    "de",
    "pt-PT",
    "cs",
    "ro",
    "pl",
    "it",
    "fi",
    "tr",
    "id",
    "ja",
    "ko",
    "ca",
    "nb",
    "ar",
    "el",
    "hu",
    "vi",
    "bg",
    "sr"
];
localStorage["language"]="zh-CN"
if(localStorage["language"] == null){
    var lang = processLanguageCode(navigator.language);
    if( ["zh-CN", "zh-TW", "pt-BR", "pt-PT"].indexOf(lang) === -1 ){
        lang = lang.slice(0,2);
    }
    if(languages.indexOf(lang) === -1){
        lang = "en";
    }
    /*
    for(i = 0; i < languages.length; i++){
        if(lang == languages[i]){
            break;
        }
        if(i == languages.length){
            lang = "en";
        }
    }
    */
    localStorage["language"] = lang;
}

function processLanguageCode(code){
    /*
    if(code.indexOf("-") > 0){
        var opt = code.split("-");
        opt[0] = opt[0].toLowerCase();
        opt[1] = opt[1].toUpperCase();
        return opt.join("-");
    }else{
        return code.toLowerCase();
    }*/
    return chrome.i18n.getUILanguage();
}
// var Components = chrome.extension.getBackgroundPage().Components;
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
        request.open("GET", chrome.extension.getURL("_locales/" + language.replace(/-/g, "_") + "/messages.json"), async);
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
function i18n(key,lang){
    // if(window.Components && Components.getSingleton("Localization")){
    //     if(lang){
    //         return Components.getSingleton("Localization").getMessage(lang, key);
    //     }else{
    //         return Components.getSingleton("Localization").getMessage(key);
    //     }
    // }
    var querylang = localStorage["language"],
        text = "";
    if(typeof(lang) != "undefined"){
        querylang = lang;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL("_locales/"+querylang.replace(/\-/g,"_")+"/messages.json"),false);
    xhr.onreadystatechange = function(){

        if(this.readyState == 4){
            var translations = JSON.parse(this.responseText.replace(/\/\*.+\*\//g, ""));
            if(!(translations[key]) || translations[key]["message"] == ""){
                //Test if there is translation for this word
                try{
                    //If no, Use English
                    if(querylang != "en"){
                        text = i18n(key,"en");
                    }else{
                        text = "ERROR"
                    }
                }catch(err){
                    //English does not have this word also. (error)
                    text = "ERROR"
                }
            }else{
                text = translations[key]["message"]
            }
            return text;
        }
    };

    try{
        //Test if there is translation for this language
        xhr.send();

    }catch(err){
        if(err.code == 101){
            //If no, use English
            text = i18n(key,"en");
        }
        return text;
    }


}
i18n.lang = function(){
    return localStorage["language"];
}
