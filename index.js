const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer")

inquirer.prompt([
  {
    type: "input",
    message: "What is your gitHub username?",
    name: "githubUsername",
    default: "garrettmroberts"
    // Use this to find username and profile image via axios request
  },
  {
    type: "input",
    message: "What is the title of your project?",
    name: "projectTitle",
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
    name: "installationSpecs",
    default: "You can easily  install this program in a few simple steps: First, you need to fork this repo and save a clone to your computer. Then, open up the folder in your terminal and type **_node install_**.  This should save all of the necessary node modules to your system. In the same terminal, type node **_node index.js_** and this program will be run.  It will create a new file named 'README.md' that will hold all of your input."
  },
  {
    type: "text",
    message: "What is the recommended usage of your project?",
    name: "usage",
    default: "This application is designed for users who need a quick and efficient way to make READMEs for their repositories.Once you have the application running, it will give you a series of prompts within the terminal.  After answering all of these questions, a readme will be generated for your project based on the given input."
  }

]).then(function(res) {
  // Initializes parts to go into README
  var title = res.projectTitle;
  var username = res.githubUsername;
  var description = res.description;
  var installation = res.installationSpecs;
  var usage = res.usage;

  // Composes what is to be sent to the new README.md
  var testReadmeData = 
`
# ${title}
  
## Created by: ${username}

## Index

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contribuitng]("contributing)
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



`

  fs.writeFile("testReadMe.md", testReadmeData, function(err) {
    if (err) throw err;
    console.log("Success")
  })
})