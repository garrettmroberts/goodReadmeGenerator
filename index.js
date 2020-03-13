const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer")

// Collects user input
inquirer.prompt([
  {
    type: "input",
    message: "What is your gitHub username?",
    name: "username",
  },
  {
    type: "input",
    message: "What is the title of your project?",
    name: "title",
  },
  {
    type: "input",
    message: "What is a good description for your project?",
    name: "description",
  }, 
  {
    type: "text",
    message: "How will your project be installed? (Please note, markdown is supported)",
    name: "installation",
  },
  {
    type: "text",
    message: "What is the recommended usage of your project?",
    name: "usage",
  },
  {
    type: "list",
    choices: ["MIT", "GNU-GPLv3", "GNU AGPLv3", "GNU LGPLv3", "Unilicense", "Boost Software License 1.0", "Apache Lincense 2.0", "Mozilla Public License 2.0"],
    name: "license",
  }, {
    type: "text",
    message: "How can other users best contribute to your project?",
    name: "contributing",
  },
  {
    type: "text",
    message: "What tests would you like to include?",
    name: "tests",
  },
  {
    type: "text",
    message: "What needs to be in your FAQ?" ,
    name: "questions",
  }

]).then(function(res) {
  // Destructures data to go into README
  const { title, username, license, description, installation, usage, contributing, tests, questions } = res;
  var badge = "";
  var profileImg = "";

  // Gets information from Github to add to README
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

    // Fills out template once all processingis done
    }).then(function() {

  readmeData = 
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
  // Sends template to README.md
  }).then(function() {
    fs.writeFile("README.md", readmeData, function(err) {
      if (err) throw err;
      console.log("Success")
    })
  })
})