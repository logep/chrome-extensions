(function(){
  localStorage['first_run'] = localStorage['timeperiod'] == null;
  localStorage['timeperiod'] = localStorage['timeperiod'] || "last_hour";
  localStorage['data_to_remove'] = localStorage['data_to_remove'] || JSON.stringify({"cache":true,"localStorage":true});
  localStorage['cookie_settings'] = localStorage['cookie_settings']  || JSON.stringify({"inclusive":true,"filters":[]});
})();
// appcache
// cache
// cookies
// downloads
// fileSystems
// formData
// history
// indexedDB
// localStorage
// pluginData
// passwords
// WebSQL
