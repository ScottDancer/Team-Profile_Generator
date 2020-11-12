const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []
const allIds = []

function mainPrompt() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the manager's name",
      validate: name => {
        if(name){
          return true;
        }
        return "Nothing was entered"
      }
    },
    {
      type: "input",
      name: "id",
      message: "What is the manager's id",
      validate: id => {
        if(allIds.includes(id)){
          return "Id already taken";
        } else if (id < 0){
          return "Id must be positive"
        } else {
          return true
        }
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is the manager's email",
      validate: email => {
        if(email){
          return true;
        }
        return "Nothing was entered"
      }
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the manager's office number",
      validate: number => {
        if(number){
          return true;
        }
        return "Nothing was entered"
      }
    }
  ]).then(res => {
    const manager = new Manager(res.name, res.id, res.email, res.officeNumber)
    teamMembers.push(manager)
    allIds.push(res.id)
    addNewMemebers()
  })
}

function addNewMemebers(){
  inquirer.prompt([
    {
    type: "list",
    name: "member",
    message: "Which team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "Finish"
    ]
    }
  ]).then(res => {
    if(res.member === "Engineer"){
      addEngineer()
    } else if (res.member === "Intern"){
      addIntern()
    } else if (res.member === "Finish"){
      createTeam()
    } else {
      console.log("something went wrong")
    }
  })
}

function addEngineer() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the engineer's name",
      validate: name => {
        if(name){
          return true;
        }
        return "Nothing was entered"
      }
    },
    {
      type: "input",
      name: "id",
      message: "What is the engineer's id",
      validate: id => {
        if(allIds.includes(id)){
          return "Id already taken";
        } else if (id < 0){
          return "Id must be positive"
        } else {
          return true
        }
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is the engineer's email",
      validate: email => {
        if(email){
          return true;
        }
        return "Nothing was entered"
      }
    },
    {
      type: "input",
      name: "github",
      message: "What is the engineer's github",
      validate: github => {
        if(github){
          return true;
        }
        return "Nothing was entered"
      }
    }
  ]).then(res => {
    const engineer = new Engineer(res.name, res.id, res.email, res.github)
    teamMembers.push(engineer)
    allIds.push(res.id)
    addNewMemebers()
  })
}

function addIntern() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the intern's name",
      validate: name => {
        if(name){
          return true;
        }
        return "Nothing was entered"
      }
    },
    {
      type: "input",
      name: "id",
      message: "What is the intern's id",
      validate: id => {
        if(allIds.includes(id)){
          return "Id already taken";
        } else if (id < 0){
          return "Id must be positive"
        } else {
          return true
        }
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is the intern's email",
      validate: email => {
        if(email){
          return true;
        }
        return "Nothing was entered"
      }
    },
    {
      type: "input",
      name: "school",
      message: "What is the intern's school",
      validate: school => {
        if(school){
          return true;
        }
        return "Nothing was entered"
      }
    }
  ]).then(res => {
    const intern = new Intern(res.name, res.id, res.email, res.school)
    teamMembers.push(intern)
    allIds.push(res.id)
    addNewMemebers()
  })
}

function createTeam(){
  if(!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(teamMembers), "utf8")
}



mainPrompt()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
