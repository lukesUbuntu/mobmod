/**
 * loaded.js
 */
if (typeof chromeFileSystem === "undefined"){
    if (typeof chrome !== 'undefined') {
        console.log('chromeFileSystem not passed');
    }
    chromeFileSystem = false;
}
