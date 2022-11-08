const fs = require('fs')
const inquirer = require('inquirer')

const generateHTML = require('./src/generateHTML');

const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")

const team = []

const addManager = () => {
    return inquirer.createPromptModule([
        {
            type: "input",
            name: "name",
            message: "What is the name of this manager?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the email of this manager?",
        }, 
        {
            type: "input",
            name: "id",
            message: "What is the id of this manager?",
        }, 
        {
            type: "input",
            name: "officeNumber",
            message: "What is the office number of this manager?",
        },
    ])
    .then(managerInput => {
        const { name, email, id, officeNumber } = managerInput;
        const manager = new Manager( name, email, id, officeNumber);
        team.push(manager);
        console.log(manager);
    }) 
};


const addEmployees = () => {
    return inquirer.createPromptModule([
        {
            type: "list",
            name: "role",
            message: "What is the role of this employee?",
            choices: ["Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is the name of this employee?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the email of this employee?",
        }, 
        {
            type: "input",
            name: "id",
            message: "What is the id of this employee?",
        }, 
        {
            type: "input",
            name: "school",
            message: "What is the school of this intern?",
            when: (input) => input.role === "Intern"
        }, 
        {
            type: "input",
            name: "github",
            message: "What is the github of this engineer?",
            when: (input) => input.role === "Engineer"
        }, 
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another employee?",
            default: false
        }
    ])
    .then(employeeData => {
        let {name, id, email, role, school, github, newEmployee} = employeeData;
        let employee;
        if(role === "Engineer") {
            employee = new Engineer(name, id, email, github)
            console.log(employee)
        } else if(role === "Intern") {
            employee = new Intern(name, id, email, school)
            console.log(employee)
        }
        team.push(employee);
        if(newEmployee) {
            return addEmployees(team)

        } else {
            return team
        }
    })
}
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        console.log(data),
            err ? console.log(err) : console.log("HTML with team data successfully created.")
    })
}

// Add input to as needed
 addManager
    .then(addEmployees).then(teamArray => {
        return generateHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });
    