const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// function that creates the array of questions for user
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the name of your Project?",
      name: "title",
    },
    {
      type: "input",
      message: "Please enter a description of your Project.",
      name: "description",
    },
    {
      type: "input",
      message:
        "What are the installation instructions for this Project? Write NONE, if no instructions.",
      name: "installation",
    },
    {
      type: "input",
      message: "How would you like your application to be used?",
      name: "usage",
    },
    {
      type: "input",
      message: "Who contributed to this Project?",
      name: "contribution",
    },
    {
      type: "input",
      message: "What are the Test Instructions?",
      name: "test",
    },
    {
      type: "checkbox",
      message: "Please select a licence.",
      choices: ["Apache", "MIT", "ISC", "GNU GPLv3"],
      name: "licence",
    },
    {
      type: "input",
      message: "Whose Credit is it for this work?",
      name: "credit",
    },
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username",
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email",
    },
  ]);
}

function generateMarkdown(response) {
  return `
    # ${response.title}
    
    # Table of Contents
    
    - [Description](#description)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Contributing](#contributing)
    - [Test](#test)
    - [Credits](#credits)
    - [Licence](#licence)
    - [Questions](#questions)
    
    ## description:
    ![Licence](https://img.sheilds.io/badge/licence-${responce.licence}-blue.svg "Licence Badge")
    
    ${responce.description}
    ## Installation:
    ${responce.installation}
    ## Usage:
    ${responce.usage}
    ## Contributing:
    ${responce.contribution}
    ## Test:
    ${responce.test}
    ## Credits:
    ${responce.credit}
    ## Licence:
       For more information about the Licence, click on the link below.
       
       -[Licence](https://opensource.org/licence/${responce.licence})
       
       ## Questions:
       For questions about th Generator, you can go to my
       GitHub page at the following link:
       
       -[GitHub Profile](https://github.com/${responce.username})
       
       for any additional questions, please reach out to my email at: ${responce.email}.
       `;
}

// function to initialize program
async function init() {
  try {
    const responce = await promptUser();

    const readMe = generateMarkdown(response);

    await writeFileAsync("README.md", readMe);
    console.log("Success!");
  } catch (err) {
    console.log(err);
  }
}

// function all to initialize program
init();
