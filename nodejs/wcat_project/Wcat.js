#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
// const process = require("process");
const { argv } = require("process");


let buffer = []; // storing file content
let fileArr = []; // stores file path/name
let cmdArr = []; // contains cmds 

// seperating cmds and files
for (let i =2; i < argv.length; i++) {
    if(argv[i].charAt(0) == '-') {
        cmdArr.push(argv[i]);
    }
    else {
        // checking for validity of given path
        if (fs.existsSync(argv[i]) == false) {
            console.log("\nenter a valid file path, this is not valid" + argv[i] + "\n");
            return;            
        }
        let temp = fs.lstatSync(argv[i])
        if(temp.isDirectory()) {
            console.log("\nEnter the file of path, this is a directory " + argv[i] + "\n");
            return;
        }

        fileArr.push(argv[i]);
    }    
}

if (cmdArr.includes("-b") && cmdArr.includes("-n")) {
    console.log("\nERROR:  -n & -b cannot be used together\n");
    return;
}


// reading contents of file and storing it all in buffer
for( let i =0; i < fileArr.length; i++) {
    let temp = fs.readFileSync(fileArr[i]);
    buffer += temp + "\r\n";
}


// 
if(cmdArr.includes('-s')) {
    buffer = buffer.split("\r\n");
    for (let i =1; i < buffer.length; i++) {
        if(buffer[i] == '' && (buffer[i - 1] =='' || buffer[i -1] == null)) {
            buffer[i] = null;
        }
    }
    let temp = [];

    let tempString = '';
    for (let i =0; i < buffer.length; i++) {
        if (buffer[i] != null) {
            // temp.push(buffer[i]);
            if (tempString == '') {
                tempString += buffer[i] ;
            }
            else {
                tempString += '\r\n' +buffer[i];
            }
        }
    }
    buffer = tempString;
    // buffer = buffer.join('\n');
}

if(cmdArr.includes('-n') == true && (cmdArr.includes('-b') == false)) {
    buffer = buffer.split("\r\n");
    
    for (let i =0; i < buffer.length; i++) {
        buffer[i] = `${i + 1} ${buffer[i]}`;
    }
    buffer = buffer.join('\r\n');    
}

if(cmdArr.includes('-b') == true && (cmdArr.includes('-n') == false)) {
    buffer = buffer.split("\r\n");
    
    let counter = 1;
    for (let i =0; i < buffer.length; i++) {
        if(buffer[i] != '') {
            buffer[i] = `${counter} ${buffer[i]}`;
            counter++;
        }
    }
    buffer = buffer.join('\r\n');    
}


console.log(buffer);

    