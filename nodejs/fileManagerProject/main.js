const process = require("process");
const path = require("path");
const fs = require("fs");


// using process.argv we can take input from cmd line argv[0] and argv[1] will always contain node and file name
let input = process.argv;
// console.log(input);

let command = input[2];
let dirPath = input[3];

const types = {
    media: ['mp4', 'mkv'],
    archives: ['zip', '7z', 'rar', 'tar', 'iso'],
    documents: ['pdf', 'doc', 'docx', 'txt', 'xlsx'],
    images: ['jpeg', 'jpg', 'png'],
    apps: ['exe', 'dmg']
}
switch(command) {
    case "help":
        console.log(`The available commands are
                1. organize: organize the files in your directory
                2. help: the one you just used
        `);         
        break;
    
    case "organize":
        console.log("organize executed");
        organizeDirectory(dirPath);
        break;
    
    case "tree":
        console.log("tree executed");
        break;

    default:
        console.log("Enter a valid command");
        break;
}



function organizeDirectory(dirPath) {
    // checking if a path is given and is valid or not
    if (dirPath == undefined) {
        console.log("Please enter a path");
        return;
    }
    else {
        let exists = fs.existsSync(dirPath);
        if((!exists) ) {
            console.log("Enter an existing directory path");
            return;
        }
        else {
            let isfile = fs.lstatSync(dirPath).isFile();  
            if(isfile) {
                console.log("Enter an existing directory path not file");
                return;
            }  
            
            let destinationDirPath = path.join(dirPath, "organizedFiles");
            if(!(fs.existsSync(destinationDirPath))) {
                // when we pass a path (with last term being the dir name) to mkdir it creates the directory at the end of the path
                fs.mkdirSync(destinationDirPath);
            }
            
            // reading contents of directory    
            let dirContent  = fs.readdirSync(dirPath);

            // segragating the files based on extension and excuting the copy paste 
            for (let i = 0; i < dirContent.length; i++) {

                // only excute the following commands for files and leave directories alone
                let filePath = path.join(dirPath, dirContent[i]);
                isfile = fs.lstatSync(filePath).isFile();

                if(isfile) {
                    // getting the category of the file                    
                    let category = getCategory(filePath);
                    sendFiles(filePath, destinationDirPath, category);
                }       

            }            
        }
    }
}

function sendFiles(src, dest, category) {
    let categoryDirPath = path.join(dest, category);
    let fileName = path.basename(src);
                    
                    
    // checking if the required category folder exists and create it if not
    exists = fs.existsSync(categoryDirPath);
    if((exists) == false) {
        fs.mkdirSync(categoryDirPath);
    }
    let destinationPAth = path.join(categoryDirPath, fileName);
    fs.copyFileSync(src, destinationPAth);
    fs.unlinkSync(src);
                    
                    

}

function getCategory(filePath) {
    let ext = path.extname(filePath);
    // in the object the etensions are without '.' so we need to remove it from th extname return value using slice
    ext = ext.slice(1);
    
    for (const key in types) {
        let categoryArray = types[key];

        for (let i =0; i < categoryArray.length; i++) {
            if (ext == categoryArray[i]) {
                return key;
            }
        }
        
    }
    return "others"
    
}

