/* Copyright Notice
 * #################
 */
var FileSystem = null;
var RequestFileSystem = window.webkitRequestFileSystem;
var BlobBuilder = BlobBuilder||window.WebKitBlobBuilder;
var REQ_PERSISTENT = window.PERSISTENT;
var REQ_TEMPORARY = window.TEMPORARY;
var debugmode = false;
//new blob update, some chromium browsers are not compat with this thos
var blob,blob_compat = false;

function errorHandler(e) {
    var msg = '';
	//console.log(e);
	if (debugmode){
    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR        : msg = 'QUOTA_EXCEEDED_ERR';       break;
        case FileError.NOT_FOUND_ERR	         : msg = 'NOT_FOUND_ERR';     	     break;
        case FileError.SECURITY_ERR              : msg = 'SECURITY_ERR';             break;
        case FileError.INVALID_MODIFICATION_ERR  : msg = 'INVALID_MODIFICATION_ERR'; break;
        case FileError.INVALID_STATE_ERR         : msg = 'INVALID_STATE_ERR';        break;
        default                                  : msg = 'UNKNOW_ERROR';             break;
    };
		console.log(e);
	}
}

function GetFile(e, create, success, error) {
    if (!FileSystem || typeof e !== 'string') {
      return;
    }
    FileSystem.root.getFile(e, {
        create: create===true
    }, success, error||errorHandler);
}

function SaveDataToFile(filename, data, callback) {
//console.log('SaveDataToFile')
//console.log('saving data chrome -> '+filename+' data -> '+data)
    if (!FileSystem) {
      return;
    }
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    }
    GetFile(filename, true, function(file) {
        file.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e){
                //var b = new BlobBuilder();
				//var blob = new Blob(['body { color: red; }'], {type: 'text/css'});'

				try{
					blob = new Blob([data], {type: 'text/json'});
					//console.log('Blob compatible = true');
					blob_compat = true
				}catch(e){
					//not updated
					//console.log('Blob compatible = false');
					blob = new BlobBuilder();
					compat = false
					blob.append(data);
				}


                fileWriter.onwriteend = function(e){

                    //console.log('SaveDataToFile completed: '+filename);
                    callback&&callback(true);
                };
                fileWriter.onerror = function(e){
                    console.log('Write failed: ' + e.toString());
                    callback&&callback(false);
                };

				if (blob_compat == true){
				fileWriter.write(blob);
				}else{
					fileWriter.write(blob.getBlob('text/json'));
				}


            };
            fileWriter.truncate(0);
        }, errorHandler);
    }, errorHandler);
}

function LoadDataFromFile(filename, success){

    if (!FileSystem) {
      return;
    }
    //alert('loading data')

    GetFile(filename, false, function(fileEntry) {

        fileEntry.file(function(file) {
           var reader = new FileReader();
           reader.onloadend = function(e) {

               success(this.result)


               //console.log('LoadDataFromFile completed: '+filename);
           };
           reader.readAsText(file);
        }, function(e) {
            errorHandler(e);
            success(false);
        });
    }, function(e) {
        errorHandler(e);
        success(false);
    });
}

function InitFileSystem() {
    var reqBytes = 4*1024*1024;
    function onLoad(fs) {
        FileSystem = fs;
    }
    RequestFileSystem(REQ_PERSISTENT, reqBytes, onLoad, function() {
        console.log('REQUESTING QUOTA: ' + reqBytes + ' bytes.');
        window.webkitStorageInfo.requestQuota(REQ_PERSISTENT, reqBytes, function(grantedBytes) {
    	    window.requestFileSystem(REQ_PERSISTENT, grantedBytes, onLoad, errorHandler);
        }, function(e) {
    	    console.log('Error', e);
        });
    });
}

if (RequestFileSystem) {
    InitFileSystem();
}
/**
 * @author Dakam
 * Cross-Domain GM_xmlhttpRequest API.
 */
function GM_xmlhttpRequest(args) {
    function setupEvent(xhr, url, eventName, callback) {
        xhr[eventName] = function () {
          var isComplete = xhr.readyState == 4;
          var responseState = {
            responseText: xhr.responseText,
            readyState: xhr.readyState,
            responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
            status: isComplete ? xhr.status : 0,
            statusText: isComplete ? xhr.statusText : "",
            finalUrl: isComplete ? url : ""
          };
          callback(responseState);
        };
      }

    var xhr = new XMLHttpRequest();
    var eventNames = ["onload", "onerror", "onreadystatechange"];
    for (var i = 0; i < eventNames.length; i++ ) {
        var eventName = eventNames[i];
        if (eventName in args) {
            setupEvent(xhr, args.url, eventName, args[eventName]);
        }
    }

    xhr.open((args.method || 'GET'), args.url, true);

    if (args.overrideMimeType) {
        xhr.overrideMimeType(args.overrideMimeType);
    }
    if (args.headers) {
        for (var header in args.headers) {
            xhr.setRequestHeader(header, args.headers[header]);
        }
    }
	/*
	if (args.method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
	*/
    xhr.send(args.data ? args.data : null);
}


    var ExtensionInfo = {
        name: 'Lucifers MOD Chrome Extension',
        version: '1.1.0'
    };
	function onRequest(args, sender, callback) {
        //console.log('received')

	var hasXmlhttp = (typeof GM_xmlhttpRequest !== 'undefined');
        if (typeof args !== 'object') {
            switch(args) {
                case 'getVersion':
                    callback&&callback(version);
                    break;
                case 'hasFileSystem':
                    callback&&callback(FileSystem !== null && typeof FileSystem === 'object');
                    break;
                case 'ping':
                    callback&&callback(true)
                     break;
            }
        }
        else {

			//console.log('Action -> '+args.action);
            switch(args.action) {
                case 'LoadData':
                    LoadDataFromFile(args.file, function(result){
                        //console.log(result)
                         callback(result)

                    });
                    break;
                case 'SaveData':
                    SaveDataToFile(args.file, args.data, callback);
                    break;
                case 'bookmark':
                    chrome.bookmarks.getTree(callback);
                    break;
                default:
                        if (typeof callback === 'function') {
                            args.onload = callback;
                        }
                        if (hasXmlhttp) {
                            GM_xmlhttpRequest(args);
                        } else {
                            callback&&callback(false);
                        }
                        break;
            }
        }
	}
        //onRequest
	//chrome.extension.onMessage.addListener(onRequest);


		
chrome.extension.onRequest.addListener(onRequest);

console.log('MOD Background,js initialized....');
console.log(ExtensionInfo.name+' v'+ExtensionInfo.version+' initialized.');
