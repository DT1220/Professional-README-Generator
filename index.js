const fs = require("fs");
const inquirer = require("inquirer");
const { cwd } = require("process");
const generateMarkdown = require("./utils/markdown");

function getLicense(value){
    if (value === "MIT"){
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}

function validateInput (value)
{
    if (value != ""){
        return true;
    } else {
        return "Please provide an input. "
    }
}


const questions = [
    {
        type: "input",
        name: "title",
        message: "What do you want your title of your project to be?",
        validate: validateInput,

    },

    {
        type: "input",
        name: "description",
        message: "What is your description of this project?",
        validate: validateInput,
    },

    {
        type: "input",
        name: "installation",
        message: "Enter a guide on how to install your project, or any further instructions.",
        validate: validateInput,

    },
    {
        type: "input",
        name: "usage",
        message: "Describe how to use your project.",
        validate: validateInput,
    },

    {
        type: "list",
        name: "license",
        message: "Select a license for the project.",
        choise: [
            "MIT",
            "Apache 2.0",
            "Mozilla",
        ],
        validate: validateInput,
    },

    {
        type: "input",
        name: "credit",
        message: "How would users credit your project?",
        validate: validateInput,
    },

    {
        type: "input",
        name: "testing",
        message: "How would users test your project?",
        validate: validateInput,
    },


    {
        type: "input",
        name: "username",
        message: "Enter your github username",
        validate: validateInput,
    },

    {
        type: "input",
        name: "email",
        message: "Enter your email address",
        validate: function (value){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Try again";
            }
        },
    },
];


function write(name, data){
    fs.writeFile(name, Markdown(data), function(err){
        if (err) { 
            return console.log(err);
        }
    });
}

function init(){
    inquirer.createPromptModule(questions).then((data) => {
        console.log(JSON.stringify(data, null, " "));
        data.getLicense = getLicense(data.license);
        writeToFile("./ProReadmeExamples/README.md", data);
    });
}

init();