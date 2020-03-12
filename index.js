const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer")

inquirer.prompt([
  {
    type: "input",
    message: "What is your gitHub username?",
    name: "username",
    default: "garrettmroberts"
    // Use this to find username and profile image via axios request
  },
  {
    type: "input",
    message: "What is the title of your project?",
    name: "title",
    default: "Effing metal proj"
  },
  {
    type: "input",
    message: "What is a good description for your project?",
    name: "description",
    default: "This will literally blow your mind."
  }, 
  {
    type: "text",
    message: "How will your project be installed? (Please note, markdown is supported)",
    name: "installation",
    default: "You can easily  install this program in a few simple steps: First, you need to fork this repo and save a clone to your computer. Then, open up the folder in your terminal and type **_node install_**.  This should save all of the necessary node modules to your system. In the same terminal, type node **_node index.js_** and this program will be run.  It will create a new file named 'README.md' that will hold all of your input."
  },
  {
    type: "text",
    message: "What is the recommended usage of your project?",
    name: "usage",
    default: "This application is designed for users who need a quick and efficient way to make READMEs for their repositories.Once you have the application running, it will give you a series of prompts within the terminal.  After answering all of these questions, a readme will be generated for your project based on the given input."
  },
  {
    type: "list",
    choices: ["MIT", "GNU-GPLv3", "GNU AGPLv3", "GNU LGPLv3", "Unilicense", "Boost Software License 1.0", "Apache Lincense 2.0", "Mozilla Public License 2.0"],
    name: "license",
    default: "MIT",
  }, {
    type: "text",
    message: "How can other users best contribute to your project?",
    name: "contributing",
    default: "You can contribute by making a checking the 'issues' section of this repo.  If you find a problem you'd like to take on, make a pull request and name the branch after the name of the issue in question.  Later, push your solutions to the branch and make a pull request.  After two successful reviews, we will push your changes to the master branch."
  },
  {
    type: "text",
    message: "What tests would you like to include?",
    name: "tests",
    default: "Idk, whatever."
  },
  {
    type: "text",
    message: "What needs to be in your FAQ?",
    name: "questions",
    default: "Idk, whatever."
  }

]).then(function(res) {
  // Destructures data to go into README
  const { title, username, description, installation, usage, license, contributing, tests, questions } = res;
  var badge = "";
  var profileImg = "";

  axios
    .get(`https://api.github.com/users/${username}`)
    .then(function(res) {
    const { avatar_url, email } = res.data;
      if (email !== null) {
        badge += `[![Generic badge](https://img.shields.io/badge/Contact_at-${email}-<COLOR>.svg)](https://shields.io/)`
      } else {
        badge += `[![Generic badge](https://img.shields.io/badge/Contact_at-<user_has_no_public_email>-<COLOR>.svg)](https://shields.io/)`
      }

      profileImg += `<img src="${avatar_url}" height="150px" />`;

    }).then(function createHTML() {

  testReadmeData = 
`
# ${title}
  
## Created by: ${username}

${profileImg}

${badge}

## Index

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contribuitng](#contributing)
6. [Tests](#tests)
7. [FAQ](#questions)

<a name="description"></a>

### Description

${description}

<a name="installation"></a>

### Installation

${installation}

<a name="usage"></a>

### Usage

${usage}

<a name="license"></a>

### License

This repo is protected under ${license} licensing.

<a name="contributing"></a>

### Contributing

${contributing}

<a name="tests"></a>

### Tests

${tests}

<a name="questions"></a>

### FAQs

${questions}
`
}).then(function() {
  fs.writeFile("testReadMe.md", testReadmeData, function(err) {
    if (err) throw err;
    console.log("Success")
  })
})
})