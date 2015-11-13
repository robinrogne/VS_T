// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        console.log(cordova.file);
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener( 'resume', onResume.bind( this ), false );
        //document.getElementById('saveFile').addEventListener('click', saveFile, false);
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
    function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", { create: true, exclusive: false }, gotFileEntry, fail);
    }
    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }
    function gotFileWriter(writer) {
        writer.onwriteend = function (evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);
            writer.onwriteend = function (evt) {
                console.log("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function (evt) {
                    console.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    }
    function fail(error) {
        console.log(error.code);
    }
} )();