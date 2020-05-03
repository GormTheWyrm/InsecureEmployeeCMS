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
            // console.table(res);
            // console.log(res + "added to database");
            console.log("employee added to database");

        }
    );
    // console.table(query.sql);
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
        }
    );

}
function addRoleData(title, salary) {  //add role     
    connection.query(   //query should not be grey... on any of these
        "INSERT INTO job_role SET ?",
        {
            title: title,  //fix me once done testing
            salary: salary
        },
        function (err, res) {
            if (err) throw err;
            // console.table(res);
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
        //will need to be a join
    }
    else {      //broken for all but employees... why?
            connection.query("SELECT * FROM department WHERE id = ?", [inputId], function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        //probably needs to be a join...
    }
}
// VIEW ROLE
function viewRoleData(inputId) {
    if (inputId == "0") {
        connection.query(`SELECT * FROM job_role`, function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        //will need to be a join
    }
    else {      
            connection.query(`SELECT * FROM job_role WHERE id = ?`, [inputId], function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        //probably needs to be a join...
    }
}
// VIEW EMPLOYEE DATA
function viewEmployeeData(inputId) {
    if (inputId == "0") {
        connection.query(`SELECT * FROM employee`, function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        //will need to be a join
    }
    else {   
            connection.query("SELECT * FROM employee WHERE id = ?", [inputId], function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        //probably needs to be a join...
    }
}
//  UPDATE
function updateData(table, column, idColumn, id, inputData) {       //BROKEN
    //              str     str     str        int  variable
    //inputData seems to be issue... all other variables worked!
    //...first_name is also a problem?  was able to set last name
    //with id hardcoded...
    //.....department name changed- but not id
    //.....all employee fields change- but if first name is run, app exits before rest run
    //..... role ran perfectly fine
    //idColumn is the search parameter
    console.log(typeof(table), typeof(column), typeof(idColumn), typeof(id), typeof(inputData));
    //ran employee-firstname and got all strings!
    //
    connection.query(
        // `UPDATE ${table} SET ${column} = ${inputData} WHERE ${idColumn} = ${id};` 
        `UPDATE ${table} SET ${column} = ? WHERE id = ${id};`
        , [
            {
                inputData
            }
        ]
        // `UPDATE employee SET first_name = "kevin" WHERE id = 1;`//works
        // `UPDATE ${table} SET ${column} WHERE ?`,
        // `UPDATE ${table} SET ${column} WHERE ?`
        // [{},{}]
        , function (err, res) {
            if (err) throw err;
            console.log(column + " changed");
            //tested- did not call above consol log
            //called it when I wrote it out...hardcoded...
            //and I think it console.logs the info correctly...
        }
    );

    /* need to try this instead...
    con.connect(function(err) {
      if (err) throw err;
      var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
    });
    */

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
    console.log("\nWelcome to the Open Employee Management Application.\n Main Menu");
    inquirer.prompt(questions).then(function (answers) {
        //ADD
        if (answers.action === "Add") {
            // console.log("===" + answers);
            if (answers.add === "Employee") {
                const myFirst = answers.addFirstName.trim();
                const myLast = answers.addLastName.trim();
                const myRole = answers.addRole.trim();
                const myManager = answers.addManager.trim();
                addEmployeeData(myFirst, myLast, myRole,myManager);
            } else if (answers.add === "Department") {
                const myName = answers.addDeptName.trim();
                const myDept = answers.addDeptId.trim();
                addDeptData(myName, myDept);
            } else if (answers.add === "Role") {
                const myTitle = answers.addRoleTitle.trim();
                const mySalary = parseFloat(answers.addRoleSalary.trim());
                addRoleData(myTitle, mySalary);
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
                //Im passing in Dept ID
            } else if (answers.view === "Role") {
                viewRoleData(viewId);
                //I'm passing in role ID
            } else if (answers.view === "Budget") {
                //viewBudget();
                // not implemented
            }
            mainMenu();
        }
        //UPDATE   (table, column, idColumn, id, inputData)
        else if (answers.action === "Update") {
            if (answers.update === "Employee") {
                console.log("trying to update employee");
                for (i = 0; i < answers.employeeChoice.length; i++) {
                    if (answers.employeeChoice[i] === "First Name") {
                        updateData("employee", "first_name", "id", ParseInt(answers.updateId), answers.updateEmployeeFirst);
                    } else if (answers.employeeChoice[i] === "Last Name") {
                        updateData("employee", "last_name", "id", answers.updateId, answers.updateEmployeeLast);
                    } else if (answers.employeeChoice[i] === "Role") {
                        updateData("employee", "role_id", "id", answers.updateId, parseInt(answers.updateEmployeeRole));
                    } else if (answers.employeeChoice[i] === "Manager") {
                        updateData("employee", "manager_id", "id", answers.updateId, parseInt(answers.updateEmployeeManager));
                    }
                }
            } else if (answers.update === "Department") {
                // do I want user to search by id or dept id? by dept id is easier for user... and id is easier for me
                //not going to let them update by dept id because ... they would simply have to update name before id...
                //something to think about...
                for (i = 0; i < answers.deptChoice.length; i++) {
                    if (answers.deptChoice[i] === "Dept Name") {
                        updateData("department", "name", "id", parseInt(answers.updateId), answers.updateDeptName);
                    }
                    else if (answers.deptChoice[i] === "Dept ID") {
                        updateData("department", "dept_id", "id", parseInt(answers.updateId), answers.updateDeptId);
                    } else { console.log("error"); }
                }
                //this seems to be sending the name after the dept_id...
            } else if (answers.update === "Role") {
                //
                for (i = 0; i < answers.roleChoice.length; i++) {
                    if (answers.roleChoice[i] === "Title") {
                        updateData("job_role", "title", "role_id", parseInt(answers.updateId), answers.updateRoleTitle);
                        //current bug; first name caught even if nothing entered
                    } else if (answers.roleChoice[i] === "Salary") {
                        updateData("job_role", "salary", "role_id", parseInt(answers.updateId), parseFloat(answers.updateRoleSalary));
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