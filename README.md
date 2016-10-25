# Simple Copy Tool

### Why this tool?

This is a command-line (CLI) based tool that helps do the following

* Keep one copy of Project and copy it into multiple destinations.
* Updates the copy instantly as soon as the file is changed.
* Supports Add/Edit/Delete operations in the Source path(Yes, its recursive so all sub folders).
* The Source and destination Path can be setup in the "settings.json" file. 

### Where can this be used?

Found it useful in situations where multiple deployments for the same source code is used. We have multiple environments set up for the same app, and we have the constant need to verify it on all of them. So before this app, we had to manually copy(or use xcopy cmd) the updated code into the respective builds, this was error prone and sometimes we forget to copy/update the code and end up wasting time.  

So I came up with this generalized App, which will keep coping the updated code for me. There are lot of build tools that can do the trick. But I preferred the nodejs cli, coz ever since learning nodejs, I couldn’t apply it anywhere. So used it here to test my abilities. Even though this may be a complex solution for a simple problem. i found it interesting to work on this.

So to out of some basic assumptions, this app was made.

* The files in the destinations are not access-locked by any other apps.
* The paths both source and destinations are valid paths.
* port 3000 is open(feel free to change the port in server.js if required).

Since its basic nodejs app, we can use this for any kind of file extensions. 

---

### Installation

You should already have the latest version of [NodeJS](http://nodejs.org)
Installed, preferably the latest stable version (or not).

Clone the tool's repository if you haven't done so already:
```
git clone http://13.198.103.62/sachin/copy-nodejs.git
```

Go to tool's directory:
```
cd copy-app-node
```

Install the tool's necessary dependencies.
```
npm install
```

---

### To get started:

Please ensure that the Source and Destination Path are setup in the settings.json file. After that use the below to start. 


```

node server.js


```

---

### Format of JSON configuration file

Note that all pathnames specified in the configuration file should be absolute pathnames.

#### Example configuration.

Assuming the source Path of is 'C:/Users/'UserName'/myProject/src'.

Destination Paths are 'C:/Users/'UserName'/buildServer/deployment/src', 'C:/Users/'UserName'/devServer/deployment/src' and 'C:/Users/'UserName'/testServer/deployment/src'

The "ignoreFiles" parameter can be given both folder path and file. in the below example the first is a folder and second is a file.

Note: Since this value is in the array you are allowed to provide multiple paths also.


```
{
     "source":"C:/Users/SachinP/Preview/preview",
     "destinations":[
         "C:/Users/'UserName'/buildServer/deployment/src", 
		 "C:/Users/'UserName'/devServer/deployment/src",
		 "C:/Users/'UserName'/testServer/deployment/src"
     ],
     "ignoreFiles": [
        ".git",
        ".gitignore"
    ]
}
```
