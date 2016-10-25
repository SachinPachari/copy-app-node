var http = require('http'),
	hostname = '127.0.0.1',
	port = 3000,
	DELETE_FILE_EVENT = 'delete',
	CHANGE_FILE_EVENT = 'change';

var fs = require('fs-extra'),
	walk  = require('walk'),
	path = require('path');

var sourcePath,
	destPath,
	ignoreFiles,
	timer;

function initPathDetails () {
	var content = fs.readFileSync('settings.json');
	var jsonContent = JSON.parse(content);
	sourcePath = jsonContent.source;
	destPath = jsonContent.destinations;
	ignoreFiles = jsonContent.ignoreFiles;
}

function copySrcToDest (fileName, event) {
	if(fileName){
		// if single file
		var filePath = path.join(sourcePath, fileName);
		if(fs.statSync(filePath).isFile()){
			copyFileToAllDest(fileName, CHANGE_FILE_EVENT);
		}else{
			// we are assuming deleted
			copyFileToAllDest(fileName, DELETE_FILE_EVENT);
		}
    }else{
		// whole path copy
		var walker = walk.walk(sourcePath);
		walker.on('file', function (root, stat, next) {
			var filepath = path.join(root, stat.name);
			var src = path.join(sourcePath, '');
			var relPath = filepath.replace(src,'');
			if(isValidFile(relPath)){
				copyFileToAllDest(relPath, CHANGE_FILE_EVENT);
			}
			next();
		});
		walker.on('end', function() {
			console.log('\n Initialized Simple Copy Tool for below paths ');
			console.log('\n Src: \t' + [sourcePath], ' \n Dest: \t', destPath);
			console.log('\n Init Done... Dont close this window. ');
		});
	}
}

function copyFileToAllDest (fileName, event) {
    for(var i = 0, l = destPath.length; i < l; i++){
		var dest = path.join(destPath[i], fileName);
			destDir = path.dirname(dest);
		console.log('Event is: ' + event, ' \t FileName: ', fileName);
		if(event === DELETE_FILE_EVENT){
			// delete the file
			fs.removeSync(dest);
			return;
		}
		// copy the file into the dest
		var srcPath = path.join(sourcePath, fileName);
		fs.copySync(srcPath, dest, {clobber: true}); 
    }
}

function initalizeFileModListeners () {
	fs.watch(sourcePath,{recursive: true}, function (event, fileName) {
		if(isValidFile(fileName) === false){
			return;
		}
		clearTimeout(timer);
		timer = setTimeout(function () {
			copySrcToDest(fileName, event);
		}, 100);
	});
}

function isValidFile (fileName) {
	if(ignoreFiles === undefined || ignoreFiles.length === 0){
		return true;
	}
    
	for(var i = 0; i < ignoreFiles.length; i++){
		if(fileName.indexOf(ignoreFiles[i]) !== -1){
			return false;
		}
	}
	return true;
}

function cleanUpDest () {
	for(var i = 0, l = destPath.length; i < l; i++){
		fs.removeSync(destPath[i]);    
	}
}

http.createServer().listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	initPathDetails();
	cleanUpDest();
	copySrcToDest();
	initalizeFileModListeners();
});