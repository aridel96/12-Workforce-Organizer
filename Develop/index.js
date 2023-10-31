const inquirer = require('inquirer');
const connectDB = require('./connectDB');

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
        type: 'list',
        name: 'manager',
        message: "Who is this employee's manager:",
        choices: ['John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd'],
        when: (answers) => {
            return answers.employeeRole === 'Sales Lead' || answers.employeeRole === 'Sales Person' || answers.employeeRole === 'Lead Engineer' || answers.employeeRole === 'Software Engineer' || answers.employeeRole === 'Account Manager' || answers.employeeRole === 'Accountant' || answers.employeeRole === 'Legal Team Lead' || answers.employeeRole === 'Lawyer'
        }
    },
    {
        type: 'list',
        name: 'employee',
        message: "Which employee's role do you want to update?",
        choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen'],
        when: (answers) => {
            return answers.options === 'update an Employee Role'
        }
    },
    {
        type: 'list',
        name: 'newRole',
        message: 'Which role do you want to assign the selected employee?',
        choices: ['Sales Lead', 'Sales Person', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
        when: (answers) => {
            return answers.employee === 'John Doe' || answers.employee === 'Mike Chan' || answers.employee === 'Ashley Rodriguez' || answers.employee === 'Kevin Tupik' || answers.employee === 'Kunal Singh' || answers.employee === 'Malia Brown' || answers.employee === 'Sarah Lourd' || answers.employee === 'Tom Allen'
        }
    }
]

function start() {
    const prompts = inquirer.prompt(questions);
    prompts.then((data) => connectDB(data));
}

start()