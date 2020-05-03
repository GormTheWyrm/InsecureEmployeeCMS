//maybe this should be a json file that passes in questions... or a class?
//change name to "Open Employee CMS"
const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
/*
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

// prints
name  age
----  ---
foo   10
bar   20
*/
//console tabel?
// let questions = require("./assets/questions.js");
//this might not work...

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "123",
    //your database
    database: "open_employee_db"
});



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
        choices: ["Employee", "Department", "Role", "Budget"],
        when: function (answers) {
            return answers.action === "View";
        }
    },
    // VIEW FUNCTION INPUTS
    {
        type: "input",
        name: "viewId",
        message: "Enter the ID for the object you want to view. An ID of 0 will return the first 1000 options",
        //could update this to search by names but ID is easier for now
        //should search by employee id, department id, role
        //should department searc hby department id or plain id?
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
    //add; name and department id
    {
        type: "input",
        name: "addDeptName",
        message: "Add Name of New Department",
        when: function (answers) {
            return answers.add === "Department";
        }
    },
    {
        type: "input",
        name: "addDeptId",
        message: "Add Department ID of New Department",
        when: function (answers) {
            return answers.add === "Department";
        }
    },
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
        //this runs for any update!
        type: "input",
        name: "updateId",
        message: "Enter the ID for the object you want to update. An ID of 0 will cancel the operation.",
        when: function (answers) {
            return answers.action === "Update";
        }
    },
    //EMPLOYEE!
    {
        type: "checkbox",
        message: "What aspects of your employee do you want to change?",
        name: "employeeChoice",
        choices: [{ name: "First Name" }, { name: "Last Name" }, { name: "Role" }, { name: "Manager" }],
        when: function (answers) {
            return answers.update === "Employee";
        }
    },
    {
        type: "input",
        name: "updateEmployeeFirst",
        message: "Enter a new First Name for this employee",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Employee") {
                return answers.employeeChoice.includes("First Name");
            } else { return false; }
        }
    },
    {
        type: "input",
        name: "updateEmployeeLast",
        message: "Enter a new Last Name for this employee",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Employee") {
                return answers.employeeChoice.includes("Last Name");
            } else { return false; }
        }
    },
    {
        type: "input",
        name: "updateEmployeeRole",
        message: "Enter a new Role ID for this employee",
        //would be great to have search for names functionality
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Employee") {
                return answers.employeeChoice.includes("Role");
            } else { return false; }
        }
    },
    {
        type: "input",
        name: "updateEmployeeManager",
        message: "Enter a new Manager ID for this employee",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Employee") {
                return answers.employeeChoice.includes("Manager");
            } else { return false; }
        }
    },
    //  NEED ADD DEPT AND ADD ROLE!


    //update department
    {
        type: "checkbox",
        name: "deptChoice",
        message: "What aspects of your Department do you want to change?",
        choices: [{ name: "Dept Name" }, { name: "Dept ID" }],
        when: function (answers) {
            return answers.update === "Department";
        }
    },
    {
        type: "input",
        name: "updateDeptId",
        message: "Enter a new Dept ID for this department",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Department") {
                return answers.deptChoice.includes("Dept ID");
            } else { return false; }
        }
    },
    {
        type: "input",
        name: "updateDeptName",
        message: "Enter a new Dept Name for this Department",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Department") {
                return answers.deptChoice.includes("Dept Name");
            } else { return false; }
        }
    },
    //UPDATE ROLE
    {
        type: "checkbox",
        name: "roleChoice",
        message: "What aspects of your Role do you want to change?",
        choices: [{ name: "Title" }, { name: "Salary" }],
        when: function (answers) {
            return answers.update === "Role";
        }
    },
    {
        type: "input",
        name: "updateRoleTitle",
        message: "Enter a new Title for this Role",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Role") {
                return answers.roleChoice.includes("Title");
            } else { return false; }
        }
    },
    {
        type: "input",
        name: "updateRoleSalary",
        message: "Enter a new Salary for this Role",
        when: function (answers) {
            if (answers.action === "Update" && answers.update === "Role") {
                return answers.roleChoice.includes("Salary");
            } else { return false; }
        }
    },


    //delete      
    {
        type: "input",
        name: "deleteId",
        message: "Enter the ID for the object you want to delete. An ID of 0 will cancel the operation.",
        //could update this to search by names but ID is easier for now
        //should search by employee id, department id, role
        //should department searc hby department id or plain id?
        when: function (answers) {
            return answers.action === "Delete";
        }
    }
    //note that user chooses the action (delete) and the table in the first few questions
]






/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// FUNCTIONS    
function addEmployeeData(first, last, role, manager) {  //these are undefined again... why?
    console.log("***" + first);
    //is now adding employees to database- but not displaying them to user
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
            // console.log(res + "added to database");
            console.log("employee added to database");

        });
}
function addDeptData(dName, deptId) {   //add dept
    connection.query(
        "INSERT INTO department SET ?",
        {
            name: dName,
            department_id: deptId
        },
        function (err, res) {
            if (err) throw err;
            // console.table(res); //sql is working, console.table is not
            // console.log(res);
            console.log("department added to database");
        });
}
function addRoleData(title, rSalary) {  //add role
    // console.log(title);
    // console.log(rSalary); //these show up
    //code just breaks... exits app...
    connection.query(
        "INSERT INTO job_role SET ?",
        {
            name: title,
            salary: rSalary
        },
        function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log("test");
        });
}
function viewData(table, column, inputId) {
    if (inputId == "0") {
        connection.query(`SELECT * FROM ${table}`, function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        //will need to be a join
    }
    else {
        connection.query(`SELECT * FROM ${table} WHERE ${column}=?`, [inputId], function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        //probably needs to be a join...
    }
}
function updateData(table, Column, id, inputData) {
    // update function could need 3 parameters; table and data being changed, and the actual data!
    // collumn is determined by ...choice
    //...could have a choice or list. Is there a way to perform this function multiple times? YES!
    //this function will be called under each if statement that matches- meaning user can choose what to change in prompt!
    //...just need to figure out how to get data fromchoice... easy!
    console.log(`table ${table} Column ${Column}, inputData ${inputData}`);
}
function deleteData(table, id) {
    //not implemented
}
//....if id = 0; select * ! (get all options!)

//update employee information

//update manager...
//view employee by manager
//delete role
//delete employee
//delete department
//view budget (of a specific department- option for total/all)

function mainMenu() {
    console.log("Welcome to the Open Employee Management Application.\n Main Menu");
    inquirer.prompt(questions).then(function (answers) {
        //ADD
        if (answers.action === "Add") {
            // console.log("===" + answers);
            if (answers.add === "Employee") {
                addEmployeeData(answers.addFirstName, answers.addLastName, answers.addRole, answers.addManager);
            } else if (answers.add === "Department") {
                addDeptData(answers.addDeptName, answers.addDeptId);
            } else if (answers.add === "Role") {
                addRoleData(answers.addRoleTitle, answers.addRoleSalary);
            }
            mainMenu();
        }
        //VIEW  pass in table, column, inputId

        else if (answers.action === "View") {
            if (answers.view === "Employee") {
                viewData("employee", "id", answers.viewId);
                //searched by employee's id (just called id)
            } else if (answers.view === "Department") {
                viewData("department", "department_id", answers.viewId);
                //Im passing in Dept ID
            } else if (answers.view === "Role") {
                viewData("job_role", "role_id", answers.viewId);
                //I'm passing in role ID
            } else if (answers.view === "Budget") {
                //viewBudget();
            }
            mainMenu();
        }
        //UPDATE    updateData(table, Column, inputData)        employeeChoice, updateemployeeFirst...last,role,manager
        else if (answers.action === "Update") {
            if (answers.update === "Employee") {
                for (i = 0; i < answers.employeeChoice.length; i++) {
                    if (answers.employeeChoice[i] === "First Name") {
                        updateData("employee", "first_name", answers.updateId, answers.updateEmployeeFirst);
                    } else if (answers.employeeChoice[i] === "Last Name") {
                        updateData("employee", "last_name", answers.updateId, answers.updateEmployeeLast);
                    } else if (answers.employeeChoice[i] === "Role") {
                        updateData("employee", "role_id", answers.updateId, answers.updateEmployeeRole);
                    } else if (answers.employeeChoice[i] === "Manager") {
                        updateData("employee", "manager_id", answers.updateId, answers.updateEmployeeManager);
                    }
                }

            } else if (answers.update === "Department") {
                //
                for (i = 0; i < answers.deptChoice.length; i++) {

                    if (answers.deptChoice[i] === "Dept ID") {
                        updateData("department", "dept_id", answers.updateId, answers.updateDeptId);
                    }
                    else
                        if (answers.deptChoice[i] === "Dept Name") {
                            updateData("department", "name", answers.updateId, answers.updateDeptName);
                            //current bug; first name caught even if nothing entered
                        }
                        else { console.log("error"); }
                }
                //this seems to be sending the name after the dept_id...
            } else if (answers.update === "Role") {
                //
                for (i = 0; i < answers.roleChoice.length; i++) {
                    if (answers.roleChoice[i] === "Title") {
                        updateData("role", "title", answers.updateId, answers.updateRoleTitle);
                        //current bug; first name caught even if nothing entered
                    } else if (answers.roleChoice[i] === "Salary") {
                        updateData("role", "salary", answers.updateId, answers.updateRoleSalary);
                    }
                }
            }
            console.log("you want to Update...");
            mainMenu();
            // });
        }
        //DELETE        not yet implemented
        else if (answers.action === "Delete") {


            console.log("you want to delete...");
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
mainMenu();





//consider where to put a "view by manager option"
//move questions into a new file
// write functions- and sql

//add add
//add update
//add delete
//will need to make view into a join function...
//will want to xx.trim() some values...

//maybe I should make it so that non number ids or some such will bring up entire table instead of id = 0 being show table...
//id = all
//might try changing role  to job_role... see if that helps... but only after I fix department adding function
//dynamic column names might be breaking the mysql code that returns the result... may need ot manually write out what is updated/added