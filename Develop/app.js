const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMemberArray = [];

function createManager() {

    inquirer.prompt([
        {
            name: "managerName",
            type: "input",
            message: "Enter the name for your team's manager: "
        }, 
        {
            name: "managerId",
            type: "input",
            message: "Enter an id for manager: "
        },
        {
            name: "managerEmail",
            type: "input",
            message: "Enter an email for manager: "
        },
        {
            name: "managerOfficeNumber",
            type: "input",
            message: "Enter an office number for manager: "
        },
        {
            name: "addAnotherEmployee",
            type: "list",
            message: "Choose another employee type: ",
            choices: ["Manager","Engineer","Intern","No more members to add"]
        }
    ]).then( response => {
        
        let manager = new Manager(response.managerName,response.managerId,response.managerEmail,response.managerOfficeNumber);

        teamMemberArray.push(manager);

        switch (response.addAnotherEmployee){
            case "Manager":
                createManager();
                break;
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                makeTemplate();
                break;    
        }
    })
}

createManager();

function createEngineer(){

    inquirer.prompt([
        {
            name: "engineerName",
            type: "input",
            message: "Enter a name for engineer: "
        },
        {
            name: "engineerId",
            type: "input",
            message: "Enter an id for engineer: "
        },
        {
            name: "engineerEmail",
            type: "input",
            message: "Enter an email for engineer: "
        },
        {
            name: "gitHub",
            type: "input",
            message: "Enter a github for engineer: "
        },
        {
            name: "addAnotherEmployee",
            type: "list",
            message: "Choose another employee type: ",
            choices: ["Manager","Engineer","Intern","No more members to add"]
        }
    ]).then( response => {
        
        let engineer = new Engineer(response.engineerName,response.engineerId,response.engineerEmail,response.gitHub);

        teamMemberArray.push(engineer);

        switch (response.addAnotherEmployee){
            case "Manager":
                createManager();
                break;
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                makeTemplate();
                break;    
        }
    })
}

function createIntern(){

    inquirer.prompt([
        {
            name: "internName",
            type: "input",
            message: "Enter a name for intern: "
        },
        {
            name: "internId",
            type: "input",
            message: "Enter an id for intern: "
        },
        {
            name: "internEmail",
            type: "input",
            message: "Enter an email for intern: "
        },
        {
            name: "school",
            type: "input",
            message: "Enter a school for intern: "
        },
        {
            name: "addAnotherEmployee",
            type: "list",
            message: "Choose another employee type: ",
            choices: ["Manager","Engineer","Intern","No more members to add"]
        }
    ]).then( response => {
        
        let intern = new Intern(response.internName,response.internId,response.internEmail,response.school);

        teamMemberArray.push(intern);

        switch (response.addAnotherEmployee){
            case "Manager":
                createManager();
                break;
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                makeTemplate();
                break;    
        }
    })
}

function makeTemplate(){

    fs.writeFileSync(outputPath,render(teamMemberArray),"utf-8")
 
}