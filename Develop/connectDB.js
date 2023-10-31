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
    const { options, departmentName, roleName, roleSalary, roleDepartment, firstName, lastName, employeeRole, manager, managerName, employee, newRole } = userInput;

    switch (options) {
        case 'view all Departments':
            database.query('SELECT * FROM department', (err, response) => {
                if (err){
                    console.log(err);
                }
                console.table(response)
            })

            break

        case 'view all Roles':
            database.query('SELECT role.id, role.title AS role, role.salary, department.name FROM role JOIN department ON role.department_id = department.id', (err, response) => {
                if (err){
                    console.log(err);
                }
                console.table(response)
            })
            
            break

        case 'view all Employees':
            database.query('SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title AS role FROM employee JOIN role ON employee.role_id = role.id', (err, response) => {
                if (err){
                    console.log(err);
                }
                console.table(response)
            })

            break

        case 'add a Department':
            if (departmentName){
                database.query('INSERT INTO department (name) VALUES (?)', departmentName, (err, results) => {
                    if (err){
                        console.log(err)
                    }
                    return console.log(results)
                })
            }

            break

        case 'add a Role':
            if (roleName && roleSalary && roleDepartment){
                database.query('SELECT id FROM department WHERE name = ?', roleDepartment, (err, results) => {
                    if (err){
                        console.log('Your error: ' + err);
                    }

                    dptId = results[0].id

                    let myQuery1 = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)'
                    let params1 = [roleName, roleSalary, dptId]

                    database.query(myQuery1, params1, (err, results) => {
                        if (err){
                            console.log('The error: ' + err);
                        }
                        return console.log(results)
                    })
                })
            }

            break

        case 'add an Employee':
            if (firstName && lastName && employeeRole){
                database.query('SELECT id FROM role WHERE title = ?', employeeRole, (err, results) => {
                    if (err){
                        console.log(err)
                    }
                    empRole = results[0].id
                    console.log(empRole);               // Console logs the id for the role

                    if (manager === 'Yes') {
                        if (managerName){
                            let name = managerName.split(' ');
                            let first = name[0];
                            let last = name[1];
                            
                            let nameQuery = 'SELECT id FROM employee WHERE first_name = ? AND last_name = ?'
                            let nameParam = [first, last]
                            database.query(nameQuery, nameParam, (err, response) => {
                                if (err){
                                    console.log("my error: " + err);
                                }
                                mgmtId = response[0].id
                                console.log(mgmtId)                       // Console logs the id for the manager which is another employee in the database
    
                                let myQuery2 = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'
                                let param2 = [firstName, lastName, empRole, mgmtId]
    
                                database.query(myQuery2, param2, (err, data) => {
                                    if (err){
                                        console.log(err)
                                    }
                                    return console.log(data)
                                })  
                            })
                        }
                    }
                    else {
                        let myQuery2 = 'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)'
                        let param2 = [firstName, lastName, empRole]
    
                        database.query(myQuery2, param2, (err, results) => {
                            if (err){
                                console.log(err)
                            }
                            return console.log(results)
                        })
                    }                
                })
            }

            break

        case 'update an Employee Role':
            if (employee && newRole){
                let empName = employee.split(" ");
                let empFirst = empName[0];
                let empLast = empName[1];

                let idQuery = 'SELECT id FROM employee WHERE first_name = ? AND last_name = ?'
                let idParam = [empFirst, empLast]

                database.query(idQuery, idParam, (err, response) => {
                    if (err){
                        console.log(err)
                    }

                    let empId = response[0].id
                    console.log(empId)

                    database.query('SELECT id FROM role WHERE title = ?', newRole, (err, results) => {
                        if (err){
                            console.log(err);
                        }

                        roleId = results[0].id
                        console.log(roleId)

                        let myQuery3 = 'UPDATE employee SET role_id = ? WHERE id = ?'
                        let param3 = [roleId, empId]

                        database.query(myQuery3, param3, (err, data) => {
                            if (err){
                                console.log(err)
                            }
                            return console.log(data)
                        }) 
                    })
                })
            }
            break           
    }
}


module.exports = connectDB;             // Exports the connectDB function