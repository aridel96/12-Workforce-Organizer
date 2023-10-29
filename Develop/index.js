const inquirer = require('inquirer');
// const connectDB = require('./connectDB');

// function enterDepartment() {
//     return     {
//         type: 'input',
//         name: 'departmentName',
//         message: 'Enter the name for this department:',
//     }
// }

const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
           'view all Departments', 'view all Roles', 'view all Employees', 
           'add a Department', 'add a Role', 'add an Employee',
           'update an Employee Role'
        ]
    },
    {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name for this department:',
        when: (answers) => answers.options === 'add a Department'
    },
    {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name for this role:',
        when: (answers) => answers.options === 'add a Role'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary for this role:',
        when: (answers) => {
            return answers.roleName && answers.roleName.trim() !== '';
        }
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'Select the department this role belongs to:',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
        when: (answers) => {
            return answers.roleSalary && answers.roleSalary.trim() !== '';
        }
    },
    {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
        when: (answers) => answers.options === 'add an Employee'
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
        when: (answers) => {
            return answers.firstName && answers.firstName.trim() !== '';
        }
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'Select the role of this employee:',
        choices: ['Sales Lead', 'Sales Person', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
        when: (answers) => {
            return answers.lastName && answers.lastName.trim() !== '';
        }
    },
    {
        type: 'input',
        name: 'manager',
        message: "Enter this employee's manager:",          // Change to list
        when: (answers) => {
            return answers.employeeRole && answers.employeeRole.trim() !== '';
        }
    }
]

function start() {
    const prompts = inquirer.prompt(questions);
    // prompts.then((data) => connectDB(data));
}

start()