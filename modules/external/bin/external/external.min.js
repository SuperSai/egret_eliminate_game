window["version"] = "2018-0409"
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var resourceUrl;
var rankUrl = null;
var serverListUrl = false;
var gamePre = false;
var isDebug = false;
var platform = null;
var isShowAdv = false;

function loadServerConfig(callBack) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', './serverConfig.json?v=' + window["version"], true);
	function loadComplete() {
		xhr.removeEventListener("load", loadComplete);
		var serverConfigData = JSON.parse(xhr.response);
		var serverInfo = serverConfigData.serverConfig.configs;
		if (serverInfo != null) {
			platform = serverInfo.platform;
			serverListUrl = serverInfo.serverListUrl;
			gamePre = serverInfo.gamePre;
			resourceUrl = serverInfo.resourceUrl;
			rankUrl = serverInfo.rankUrl;
			isDebug = serverInfo.isDebug;
			isShowAdv = serverInfo.isShowAdv;
		}
		console.log("服务器数据为" + JSON.stringify(serverInfo) + "`````````````````````````````````````````````````````````````````");
		console.log("服务器" + JSON.stringify(serverInfo) + "`````````````````````````````````````````````````````````````````");
		console.log("platform:" + platform);
		callBack();
	}
	xhr.addEventListener("load", loadComplete);
	xhr.send(null);
}

function xmlHttpRequest(url, callback, cache) {
	var r = Date.now() + "" + (Math.floor(Math.random() * 100000));
	var xhrReq = new XMLHttpRequest();
	if (cache) {
		xhrReq.open("GET", url, true);
	} else {
		xhrReq.open("GET", url + "&vr=" + r, true);
	}
	xhrReq.addEventListener("load", function (oEvent) {
		callback(xhrReq.response);
	});
	xhrReq.send(null);
}

var ext = (function () {
	var external = {};
	external.getPlatform = function () { return platform };
	external.getIsShowAdv = function () { return isShowAdv };
	external.getServerListUrl = function () { return serverListUrl };
	external.getGamePre = function () { return gamePre };
	external.getIsDebug = function () { return isDebug };
	external.getRankUrl = function () { return rankUrl };
	external.getResourceUrl = function () { return resourceUrl };
	external.xmlHttpRequest = xmlHttpRequest;
	external.loadServerConfig = loadServerConfig;
	return external;
})();
window.ext = ext;
