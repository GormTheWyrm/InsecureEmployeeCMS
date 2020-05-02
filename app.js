//change name to "Open Employee CMS"
const fs = require("fs");
const inquirer = require("inquirer");
//mysql
//console tabel?

// variable declarations
questions = [
    {
        type: "list",
        name: "action",
        message: "Add, View, Update, Delete or Exit?",
        choices: ["Add", "View", "Update", "Delete", "Exit"]
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
        choices: ["Employee", "Department", "Role",],
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
    //add; title and salary
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
        message: "Enter the ID for the object you want to update. An ID of 0 will cacel the operation.",
        when: function (answers) {
            return answers.action === "Update";
        }
    },
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
        message: "Enter the ID for the object you want to delete. An ID of 0 will cacel the operation.",
        //could update this to search by names but ID is easier for now
        //should search by employee id, department id, role
        //should department searc hby department id or plain id?
        when: function (answers) {
            return answers.action === "Delete";
        }
    }
]



let updateQuestions = [
    // UPDATE FUNCTIONS - employee
    //update role
]
//remember to parseInt !
//pass in specific questions depending on what last prompt pulled...
let deleteQuestions = [
]

/*
  
Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

Bonus points if you're able to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

  */


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// FUNCTIONS    
function addRole() {

}
function addDept() {

}
function addEmployee() {

}
function viewData(table, inputId) {

}
function updateData(table, Column, id, inputData) {
    // update function could need 3 parameters; table and data being changed, and the actual data!
    // collumn is determined by ...choice
    //...could have a choice or list. Is there a way to perform this function multiple times? YES!
    //this function will be called under each if statement that matches- meaning user can choose what to change in prompt!
    //...just need to figure out how to get data fromchoice... easy!
    console.log(`table ${table} Column ${Column}, inputData ${inputData}`);
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
        // console.log(answers);
        //ADD
        if (answers.action === "Add") {
            //nested if figures out which function to call
            //pass in parameters from here
            //write function above

            if (answers.add === "Employee") {
                //addEmployee(...);
            } else if (answers.add = "Department") {
                //addDept();

            } else if (answers.add = "Role") {
                //addrole();
            }
            mainMenu();
        }
        //VIEW
        else if (answers.action === "View") {
            if (answers.view === "Employee") {
                //viewData(answers.)
            } else if (answers.view = "Department") {
                //addDept();

            } else if (answers.view = "Role") {
                //addrole();
            } else if (answers.view = "Budget") {
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
                        //current bug; first name caught even if nothing entered
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
        //DELETE
        else if (answers.action === "Delete") {


            console.log("you want to delete...");
            mainMenu();

        }
        //EXIT
        else if (answers.action === "Exit") {


            console.log("Exiting");
            return 0;
        } else { mainMenu(); } 


    });
}

/* **** Main App Here **** */
mainMenu();




//call start
//might try making it a do while loop, ending function by turning a isOn variable to false
