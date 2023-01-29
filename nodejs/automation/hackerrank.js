const puppeteer = require('puppeteer');
const fs = require('fs');

const filePath = String.raw`C:\Users\shrey\Desktop\CODE_PRACTICE\nodejs\automation\selector.txt`; 
//  you can add any text file which contains the code for the particular question, any txt file path can be added based on the local machine

const code = fs.readFileSync(filePath, 'utf-8');
const id = 'xyz@gmail.com'; // add your own login id and password
const password = '123456';
hk()

async function hk() {
    try {

        // launching browser and entering the site
        const browser = await puppeteer.launch({headless: false, slowMo: 10});
        const pageArray = await browser.pages();
        let page = pageArray[0];
        await page.goto('https://www.hackerrank.com/auth/login');

        // entering ID and password
        await page.waitForSelector('input[type ="text"]');
        await page.type('input[type ="text"]', id);
        await page.waitForSelector('input[type ="password"]');
        await page.type('input[type ="password"]', password);
        await page.keyboard.press('Enter', {delay: 50});

        // selecting algorithm page
        await page.waitForSelector('div[data-automation="algorithms"]');
        await page.click(`div[data-automation="algorithms"]`, {delay: 200});
        await page.waitForSelector('div.challenge-submit-btn');
        await page.click('div.challenge-submit-btn');

        // writing code in the page
        await page.waitForSelector('span.text-link');
        page.hover('div.pmR.pmL.pmB.plT.run-code-wrapper');
        await page.mouse.wheel({deltaY: -500});
        await page.click('input.checkbox-input'); // selecting the custom input box to type the code in it
        await page.type('#input-1',code);
        await page.keyboard.down('ControlLeft');
        await page.keyboard.press('A');
        await page.keyboard.press('X');
        await page.keyboard.up('ControlLeft');

        // pasting into actual code editor
        await page.click('div.view-line');
        await page.keyboard.down('ControlLeft');
        await page.keyboard.press('A')
        await page.keyboard.press('Backspace');
        await page.keyboard.press('V');


        
    } catch (error) {
        
    }
}


// same program using promises

// browser.then(function (browser) {
//     const pageArray = browser.pages();
//     return pageArray;
// }).then(function (pageArray) {
//     page = pageArray[0];    
//     const site = page.goto('https://www.hackerrank.com/auth/login');
//     return site;
// })
// .then(function () {
//     const selectPromise = page.waitForSelector('input[type ="text"]');
//     return selectPromise;    
// })
// .then (function (selectPromise) {
//     const typePromise = page.type('input[type ="text"]', id); 
//     return typePromise;
// })
// .then(function () {
//     const selectPromise = page.waitForSelector('input[type ="password"]');
//     return selectPromise;    
// })
// .then (function (selectPromise) {
//     const typePromise = page.type('input[type ="password"]', password); 
//     return typePromise;
// })
// .then (function (typePromise) {
//     const pressPromise =  page.keyboard.press('Enter', {delay: 50});   
//     return pressPromise;
// })
// .then(function () {
//     const selectPromise = page.waitForSelector('div[data-automation="algorithms"]');
//     return selectPromise;    
// })
// .then(function (selectPromise) {
//     const algoclickPromise = page.click(`div[data-automation="algorithms"]`, {delay: 200});   
//     return algoclickPromise;
// })
// .then(function (algoclickPromise) {
//     const challengeButtonPromise = page.waitForSelector('div.challenge-submit-btn');
//     return challengeButtonPromise;
// })
// .then(function (challengeButtonPromise) {
//     const buttonClickPromise = page.click('div.challenge-submit-btn');
//     return buttonClickPromise;    
// })
// .then(function (buttonClickPromise) {
//     const checkboxPromise = page.waitForSelector('span.text-link');
    
//     return checkboxPromise;
// })
// .then(function (checkboxPromise) {
//     page.hover('div.pmR.pmL.pmB.plT.run-code-wrapper');
//     const mouseScrollprmoise = page.mouse.wheel({deltaY: -500}); 
//     return mouseScrollprmoise;
// })
// .then(function (checkboxPromise) {
//     const checkboxClickPromise = page.click('input.checkbox-input');
//     return checkboxClickPromise;    
// }).then(function (checkboxClickPromise) {
//     const typePromise = page.type('#input-1',code);
//     return typePromise;    
// })
// .then(function () {
//     page.keyboard.down('ControlLeft');
//     page.keyboard.press('A')
//     const pressPromise = page.keyboard.press('X')
//     page.keyboard.up('ControlLeft')

//     return pressPromise;
// })
// .then(function () {
//     const codeClickPromise = page.click('div.view-line');
//     return codeClickPromise;    
// })
// .then(function () {
//     page.keyboard.down('ControlLeft');
//     page.keyboard.press('A')
//     page.keyboard.press('Backspace');
//     const pressPromise = page.keyboard.press('V');
//     return pressPromise;    
// })
// .catch(function (err) {
//     console.log(err);
// })