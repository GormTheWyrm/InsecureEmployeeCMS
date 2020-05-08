
//change name to "Open Employee CMS"
const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");


// let myPassword = "";
// let myUsername = "root";
let connection;


function init() {
    inquirer.prompt(
        // create a prompt to get username and password
        [
            {
                type: "input",
                name: "username",
                message: "Enter your username for mysql. If you do not remember setting one un, try 'root'",
            },
            {
                type: "input",
                name: "pw",
                message: "Enter your password for connecting to mySQL, if you do not remember setting one up, try leaving field blank"
            },
            {
                type: "input",
                name: "port",
                message: "Enter your port for connecting to mySQL, the standard port is 3306"
            }
            // other ports not implemented yet
        ]

    ).then(function (loginCred) {

        connection = mysql.createConnection({

            host: "localhost",

            // Your port; if not 3306
            port: loginCred.port,

            // Your username
            user: loginCred.username,

            // Your password
            password: loginCred.pw,
            //your database
            database: "open_employee_db"

        });
        connection.connect(function (err) {
            if (err) {
                console.error("error connecting: " + err.stack);
                return;
                //make this exit
            }
            console.log("connected as id " + connection.threadId);
        });
        mainMenu();
    });
}


// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//     connection = mysql.createConnection({

//         host: "localhost",

//         // Your port; if not 3306
//         port: 3306,

//         // Your username
//         user: myUsername,

//         // Your password
//         password: myPassword,
//         //your database
//         database: "open_employee_db"

//     });
// }
// connection.connect(function (err) {
//     if (err) {
//         console.error("error connecting: " + err.stack);
//         return;
//         //make this exit
//     }
//     console.log("connected as id " + connection.threadId);
// });
// mainMenu();




/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
questions = [
    {
        type: "list",
        name: "action",
        message: "Add, View, Update, Delete or Exit?",
        choices: ["Add", "View", "Update", "Delete", "Exit\n"]
    },
    {
        type: "list",
        name: "add",
        message: "Add an Employee, Department, or Role?",
        choices: ["Employee", "Department", "Role"],
        when: function (answers) {
            return answers.action === "Add";
        }
    },
    {
        type: "list",
        name: "update",
        message: "Update an Employee, Department, or Role?",
        choices: ["Employee", "Department", "Role"],
        when: function (answers) {
            return answers.action === "Update";
        }
    },
    {
        type: "list",
        name: "delete",
        message: "Remove an Employee, Department, or Role?",
        choices: ["Employee", "Department", "Role"],
        when: function (answers) {
            return answers.action === "Delete";
        }
    },
    {
        type: "list",
        name: "view",
        message: "View an Employee, Department, or Role?",
        choices: ["Employee", "Department", "Role"],
        //, "Budget"
        when: function (answers) {
            return answers.action === "View";
        }
    },
    // VIEW FUNCTION INPUTS
    {
        type: "input",
        name: "viewId",
        message: "Enter the ID for the object you want to view. An ID of 0 will return the first 1000 options",
        when: function (answers) {
            return answers.action === "View";
        }
    },
    // {
    //     type: "input",
    //     name: "viewBudget",
    //     message: "Enter the ID for the Department whose budget you want to view. An ID of 0 will return a sum of all departments",
    //     //could update this to search by names but ID is easier for now
    //     //should search by employee id, department id, role
    //     //should department searc hby department id or plain id?
    //     when: function (answers) {
    //         return answers.view === "Budget";
    //     }
    // },           //debating doing this for each view...
    //ADD FUNCTION INPUTS - EMPLOYEE
    //add; first,last,role,manager
    {
        type: "input",
        name: "addFirstName",
        message: "Enter New Employee First Name",
        when: function (answers) {
            return answers.add === "Employee";
        }
    },
    {
        type: "input",
        name: "addLastName",
        message: "Enter New Employee Last Name",
        when: function (answers) {
            return answers.add === "Employee";
        }
    },
    {
        type: "input",
        name: "addRole",
        message: "Enter New Employee's Role ID (job title ID)",
        when: function (answers) {
            return answers.add === "Employee";
        }
        //would be great to make this searchable or bring up a table... but that should be another option somewhere
    },
    {
        type: "input",
        name: "addManager",
        message: "Add Manager ID of supervisor",
        when: function (answers) {
            return answers.add === "Employee";
        }
    },
    //ADD FUNCTION INPUTS - Department
    {
        type: "input",
        name: "addDeptName",
        message: "Add Name of New Department",
        when: function (answers) {
            return answers.add === "Department";
        }
    },
    // {
    //     type: "input",
    //     name: "addDeptId",
    //     message: "Add Department ID of New Department",
    //     when: function (answers) {
    //         return answers.add === "Department";
    //     }
    // },
    //ADD FUNCTION INPUTS - Role
    {
        type: "input",
        name: "addRoleTitle",
        message: "Add new Role (Job Title)",
        when: function (answers) {
            return answers.add === "Role";
        }
    },
    {
        type: "input",
        name: "addRoleSalary",
        message: "Add a salary for this role (USD/hr)",
        when: function (answers) {
            return answers.add === "Role";
        }
    },
    {
        type: "input",
        name: "addRoleDepartment",
        message: "Add a department ID# for this role (should align with existing department",
        when: function (answers) {
            return answers.add === "Role";
        }
    },
    {
        //this runs for any update!
        type: "input",
        name: "updateId",
        message: "Enter the ID for the object you want to update",
        when: function (answers) {
            return answers.action === "Update";
        }
    },
    //EMPLOYEE!
    // {
    //     type: "checkbox",
    //     message: "What aspects of your employee do you want to change?",
    //     name: "employeeChoice",
    //     choices: [{ name: "First Name" }, { name: "Last Name" }, { name: "Role" }, { name: "Manager" }],
    //     when: function (answers) {
    //         return answers.update === "Employee";
    //     }
    // },
    {
        type: "input",
        name: "updateEmployeeFirst",
        message: "Enter a new First Name for this employee",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Employee") { return true }
        }
    },
    {
        type: "input",
        name: "updateEmployeeLast",
        message: "Enter a new Last Name for this employee",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Employee") { return true }
        }
    },
    {
        type: "input",
        name: "updateEmployeeRole",
        message: "Enter a new Role ID for this employee",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Employee") { return true }
        }
    },
    {
        type: "input",
        name: "updateEmployeeManager",
        message: "Enter a new Manager ID for this employee",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Employee") { return true }
        }
    },
    //  NEED ADD DEPT AND ADD ROLE!


    //update department
    // {
    //     type: "checkbox",
    //     name: "deptChoice",
    //     message: "What aspects of your Department do you want to change?",
    //     choices: [{ name: "Dept Name" }, { name: "Dept ID" }],
    //     when: function (answers) {
    //         return answers.update === "Department";
    //     }
    // },
    {
        type: "input",
        name: "updateDeptName",
        message: "Enter a new Dept Name for this Department",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Department") { return true }
        }
    },
    //UPDATE ROLE
    // {
    //     type: "checkbox",
    //     name: "roleChoice",
    //     message: "What aspects of your Role do you want to change?",
    //     choices: [{ name: "Title" }, { name: "Salary" }],
    //     when: function (answers) {
    //         return answers.update === "Role";
    //     }
    // },
    {
        type: "input",
        name: "updateRoleTitle",
        message: "Enter a new Title for this Role",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Role") { return true };
        }
    },
    {
        type: "input",
        name: "updateRoleSalary",
        message: "Enter a new Salary for this Role",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Role") { return true };
        }
    },
    {
        type: "input",
        name: "updateRoleDepartment",
        message: "Enter a new Department ID # for this Role",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Role") { return true };
        }
    },
    //delete      
    {
        type: "input",
        name: "deleteId",
        message: "Enter the ID for the object you want to delete",
        when: function (answers) {
            return answers.action === "Delete";
        }
    } //note that user chooses the action (delete) and the table in the first few questions
]


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// FUNCTIONS    
function addEmployeeData(first, last, role, manager) {
    connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: first,
            last_name: last,
            role_id: role,
            manager_id: manager
        },
        function (err, res) {
            if (err) throw err;
            console.log("employee added to database");

        }
    );
}
function addDeptData(dName, deptId) {   //add dept
    connection.query(
        "INSERT INTO department SET ?",
        {
            name: dName,
        },
        function (err, res) {
            if (err) throw err;
            console.log("department added to database");
        }
    );

}
function addRoleData(title, salary, myRoleDept) {  //add role     
    connection.query(
        "INSERT INTO job_role SET ?",
        {
            title: title,
            salary: salary,
            department_id: myRoleDept
        },
        function (err, res) {
            if (err) throw err;
            console.log("Added Role");
        }
    );

}
// VIEW DEPT
function viewDepartmentData(inputId) {
    if (inputId == "0") {
        connection.query("SELECT * FROM department", function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }
    else {
        connection.query("SELECT * FROM department WHERE ?", [{ id: inputId }], function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }
}
// VIEW ROLE
function viewRoleData(inputId) {
    if (inputId == "0") {
        connection.query(`
        SELECT job_role.id, job_role.title, job_role.salary, department.name AS department_name
        FROM job_role
        LEFT JOIN department
        ON job_role.id = department.id;
        `, function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }
    else {
        connection.query(
            `SELECT job_role.id, job_role.title, job_role.salary, department.name AS department_name
            FROM job_role
            LEFT JOIN department
            ON job_role.id = department.id WHERE job_role.id = ?;`
            , [inputId], function (err, res) {
                if (err) throw err;
                console.table(res);
            });
    }
}
// VIEW EMPLOYEE DATA
function viewEmployeeData(inputId) {

    if (inputId == "0") {
        connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, job_role.title, job_role.salary, department.name AS department_Name
            FROM employee
            LEFT JOIN job_role
            ON employee.role_id = job_role.id
            LEFT JOIN department
            ON job_role.department_id = department.id;`
            , function (err, res) {
                if (err) throw err;
                console.table(res);
            });
    }
    else {
        connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, job_role.title, job_role.salary, department.name AS department_Name
            FROM employee
            LEFT JOIN job_role
            ON employee.role_id = job_role.id
            LEFT JOIN department
            ON job_role.department_id = department.id WHERE employee.id = ?;`


            , [inputId], function (err, res) {
                if (err) throw err;
                console.table(res);
            });
    }
}
//  UPDATE
function updateEmployee(first, last, role, manager, searchId) {
    connection.query(
        //sql
        "UPDATE employee SET ? WHERE ?"
        ,
        [
            {
                first_name: first,
                last_name: last,
                role_id: role,
                manager_id: manager
            },
            {
                id: searchId
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " records changed");
        }
    )
}
function updateDepartment(name, searchId) {
    connection.query(
        //sql
        "UPDATE department SET ? WHERE ?"
        ,
        [
            {
                name: name,
            },
            {
                id: searchId
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " records changed");
        }
    );
}
function updateRole(myTitle, mySalary, myRoleDept, searchId) {
    connection.query(
        //sql
        "UPDATE job_role SET ? WHERE ?"
        ,
        [
            {
                title: myTitle,
                salary: mySalary,   //perhaps float is breaking this because of decimal points?
                department_id: myRoleDept
            },
            {
                role_id: searchId
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " records changed");
        }
    );
}



function deleteEmployee(searchId) {
    //DELETE FROM ? WHERE id = ?
    connection.query(
        //sql
        "DELETE FROM employee WHERE ?",
        [{ id: searchId }],

        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " records changed");
        }
    )
}
function deleteDepartment(searchId) {
    connection.query(
        //sql
        "DELETE FROM department WHERE ?",
        [{ id: searchId }],

        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " records changed");
        }
    )
}
function deleteRole(searchId) {
    connection.query(
        //sql
        "DELETE FROM role WHERE ?",
        [{ id: searchId }],

        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " records changed");
        }
    )
}




//view employee by manager

//view budget (of a specific department- option for total/all)

function mainMenu() {
    console.log("\nWelcome to the Open Employee Management Application.\n Main Menu");
    inquirer.prompt(questions).then(function (answers) {    //this just started 
        //ADD
        if (answers.action === "Add") {
            // console.log("===" + answers);
            if (answers.add === "Employee") {
                const myFirst = answers.addFirstName.trim();
                const myLast = answers.addLastName.trim();
                const myRole = answers.addRole.trim();
                const myManager = answers.addManager.trim();
                addEmployeeData(myFirst, myLast, myRole, myManager);
            } else if (answers.add === "Department") {
                const myName = answers.addDeptName.trim();
                addDeptData(myName);
            } else if (answers.add === "Role") {
                const myTitle = answers.addRoleTitle.trim();
                const mySalary = parseFloat(answers.addRoleSalary.trim());
                const myRoleDept = parseInt(answers.addRoleDepartment);
                addRoleData(myTitle, mySalary, myRoleDept);
            }

            mainMenu();
        }
        //VIEW  pass in table, column, inputId (assumes a number)

        else if (answers.action === "View") {
            const viewId = answers.viewId.trim();
            console.log(viewId);
            if (answers.view === "Employee") {
                viewEmployeeData(viewId);
                //searched by employee's id (just called id)
            } else if (answers.view === "Department") {
                viewDepartmentData(viewId);
                // searched by 
            } else if (answers.view === "Role") {
                viewRoleData(viewId);
            } else if (answers.view === "Budget") {
                //viewBudget();
                console.log("Bugdet overview not yet implemented");
            }
            mainMenu();
        }
        //UPDATE   (table, column, idColumn, id, inputData)
        else if (answers.action === "Update") {
            if (answers.update === "Employee") {

                updateEmployee(answers.updateEmployeeFirst, answers.updateEmployeeLast, parseInt(answers.updateEmployeeRole), parseInt(answers.updateEmployeeManager), parseInt(answers.updateId));

            } else if (answers.update === "Department") {
                updateDepartment(answers.updateDeptName, parseInt(answers.updateId));

            } else if (answers.update === "Role") {
                console.log(typeof parseFloat(answers.updateRoleSalary));
                console.log(answers.updateRoleTitle + parseFloat(answers.updateRoleSalary) + parseInt(answers.updateRoleDepartment) + parseInt(answers.updateId));
                updateRole(answers.updateRoleTitle, parseFloat(answers.updateRoleSalary).toFixed(2), parseInt(answers.updateRoleDepartment), parseInt(answers.updateId));
            }
            mainMenu();
            // });
        }
        //DELETE        not yet implemented - deleteId
        else if (answers.action === "Delete") {
            if (answers.delete === "Employee") {
                deleteEmployee(parseInt(answers.deleteId.trim()));
            } else if (answers.delete === "Department") {
                deleteDepartment(parseInt(answers.deleteId.trim()));
            } else if (answers.delete === "Role") {
                deleteRole(parseInt(answers.deleteId.trim()));
            }
            mainMenu();

        }
        //EXIT
        else if (answers.action.trim() === "Exit") {


            console.log("Exiting");
            connection.end();
            return 0;
        } else { mainMenu(); }


    });
}

/* **** Main App Here **** */
init();
// mainMenu();

//adding works for employee, department, role
//view works for all for employee, department, role
//not joined yet
/* ~~~~~~~~ */



//consider where to put a "view by manager option"
//move questions into a new file
// write functions- and sql


//add update
//add delete
//will need to make view into a join function...
//will want to xx.trim() some values...

//maybe I should make it so that non number ids or some such will bring up entire table instead of id = 0 being show table...
//id = all

//dynamic column names might be breaking the mysql code that returns the result... may need ot manually write out what is updated/added
//console logging or console tabling my "res" from the add queries are only giving me back the fields field, which is supposed to be optional
//view dept and role is not returning individual results, only thr select all table


//need to make app handle errors when people add departments with same dept numbers
//and roles with same role id...