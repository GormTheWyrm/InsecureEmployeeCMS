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
    //UPDATE FUNCTIONS - employee
    //
    {
        type: "checkbox",
        message: "What aspects of your employee do you want to change?",
        name: "employeeChoice",
        choices: [{Name: "First Name"}, {Name: "Last Name"}, {Name: "role"}, {Name: "manager"}],
      when: function (answers) {
            return answers.Update === "Employee";
        }
        //this will be used to input a lot of data to the update funciton...
    },
    {
        type: "input",
        name: "UpdateEmployeeFirst",
        message: "Enter a new First Name for this employee",
        when: function (answers) {
            return answers.Update === "Employee";
        }
    },
    {
        type: "input",
        name: "UpdateEmployeeRole",
        message: "Enter a new Role ID for this employee", 
        //would be great to have search for names functionality
        when: function (answers) {
            return answers.Update === "Employee";
        }
    },
    {
        type: "input",
        name: "UpdateEmployeeManager",
        message: "Enter a new Manager ID for this employee",
        when: function (answers) {
            return answers.Update === "Employee";
        }
    }
    //update dept

    //update role

]
//remember to parseInt !
//pass in specific questions depending on what last prompt pulled...
let addQuestions = [
    //ADD FUNCTION
    //do I want to do manager and role by id or name?
    //perhaps select an id would be best...
    //doing this as a separate function allows me to pull information by calling other functions... wait...

]


//action, add/delete/etc, 
//view function can be a single function that passes in table, and ID; id of 0 will list all

//add function passes in table, then all variables needed...
// would be easier if all variables were from same data source...
//could add a confirm for validation... at end!








//3 major tables in 1 database; department, role, employee
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
//SHOULD I MAKE APP A CLASS?


// Functions
//....if id = 0; select * ! (get all options!)
//add department
//add role (job title)
//add department
//view employees
//view department
//view roles
//update employee information

//update manager...
//view employee by manager
//delete role
//delete employee
//delete department
//view budget (of a specific department- option for total/all)

function mainMenu() {
    console.log("Welcome to the Open Employee Management Application.\n Main Menu");
    
    //inquirer prompt
    //add, view, or update... or delete
    //employee, department or role (job title)
    //employee has view single, view by department, view by manager or view all options
    //...view-> employee, department, role, budget
    //...add-> employee, department, role
    //...update-> role, employee, department
    //delete-> role, employee, department

    //main menu will have to call various finctions...
    inquirer.prompt(questions).then(function (answers) {
        console.log(answers);
        //I can use when to make this a single prompt instead of one prompt for each option

        if (answers.action === "Add") {
            //nested if figures out which function to call
            //pass in parameters from here
            //write function above
            console.log("you want to add...");
            if (answers.add === "Employee") {
                //addEmployee(...);
            }

            "Department", "Role"
        } else if (answers.action === "View") {


            console.log("this will view " + answers.view);

        } else if (answers.action === "Update") {


            console.log("you want to Update...");
        } else if (answers.action === "Delete") {


            console.log("you want to delete...");
        } else if (answers.action === "Exit") {


            console.log("you want to Exit...");
        }


    });
}

/* **** Main App Here **** */
mainMenu();




//call start
//might try making it a do while loop, ending function by turning a isOn variable to false
