//Node
const fs = require('fs')
const inquirer = require('inquirer')
// For HTML creation
const generateHTML = require('./src/generateHTML');
// Team profile generation
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
//questions prompted in terminal
const team = []
// Manager input
const addManager = () => {
    return inquirer.prompt([
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

// Add employee data
const addEmployee = () => {
    return inquirer.prompt([
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
            name: "confirmNewEmployee",
            message: "Would you like to add another employee?",
            default: false
        }
    ])
    .then(employeeData => {
        let {name, email, id, role, school, github, confirmNewEmployee} = employeeData;
        let employee;
        if(role === "Engineer") {
            employee = new Engineer(name, email, id, github)
            console.log(employee)
        } else if(role === "Intern") {
            employee = new Intern(name, email, id, school)
            console.log(employee)
        }
        team.push(employee);
        if(confirmNewEmployee) {
            return addEmployee(team);

        } else {
            return team;
        }
    })
}
//briskly generates an HTML
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        console.log(data),
            err ? console.log(err) : console.log("HTML with team data successfully created.")
    })
}

// Added input
 addManager()
    .then(addEmployee).then(team => {
        return generateHTML(team);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });
    