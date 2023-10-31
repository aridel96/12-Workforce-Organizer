const mysql = require('mysql2');

const database = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: ' ',
    database: 'emp_tracker_db'
    },

    console.log('Successfully connected to database')
);

function connectDB(userInput) {
    const { options, departmentName, roleName, roleSalary, roleDepartment, firstName, lastName, employeeRole, manager, employee, newRole } = userInput;

    switch (options) {
        case 'add a Department':
            if (departmentName){
                database.query('INSERT INTO department (name) VALUES (?)', departmentName, (err, results) => {
                    if (err){
                        console.log(err)
                    }
                    return console.log(results)
                })
            }

        case 'add a Role':
            if (roleName && roleSalary && roleDepartment){
                database.query('SELECT id FROM department WHERE name = ?', roleDepartment, (err, results) => {
                    if (err){
                        console.log('Your error: ' + err);
                    }

                    dptId = results[0].id

                    database.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', roleName, roleSalary, dptId, (err, results) => {
                        if (err){
                            console.log('The error: ' + err);
                        }
                        return console.log(results)
                    })
                })
            }

        case 'add a Employee':
            if (firstName && lastName && employeeRole){
                database.query('SELECT id FROM role WHERE title = ?', employeeRole, (err, results) => {
                    if (err){
                        console.log(err)
                    }
                    console.log(results);

                    if (manager){
                        let name = manager.split(' ');
                        let first = name[0];
                        let last = name[1];

                        database.query('SELECT id FROM employee WHERE first_name = ? AND last = ?', first, last, (err, response) => {
                            if (err){
                                console.log
                            }

                            database.query('INSERT INTO department (firstName, lastName, role_id, manager_id) VALUES (?)', firstName, lastName, results, response, (err, data) => {
                                if (err){
                                    console.log(err)
                                }
                                return console.log(data)
                            })  
                        })
                    }

                    let manager = NULL;

                    database.query('INSERT INTO department (firstName, lastName, role_id, manager_id) VALUES (?)', firstName, lastName, results, manager, (err, results) => {
                        if (err){
                            console.log(err)
                        }
                        return console.log(results)
                    })                
                })
            }

        case 'update an Employee Role':
            if (employee && newRole){

                database.query('SELECT id FROM employee WHERE first_name = ? AND last = ?', first, last, (err, response) => {
                    if (err){
                        console.log
                    }

                    database.query('INSERT INTO department (firstName, lastName, role_id, manager_id) VALUES (?)', firstName, lastName, results, response, (err, data) => {
                        if (err){
                            console.log(err)
                        }
                        return console.log(data)
                    })  
                })
            }            
    }
}


module.exports = connectDB;             // Exports the connectDB function