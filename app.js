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
        message: "Add, View, Update, or Delete?",
        choices: ["Add", "View", "Update", "Delete", "Exit"]
    },
    {
        type: "list",
        name: "add",
        message: "Add an Employee, Department, or Role?",
        choices: ["Employee", "Department", "Role"],
        when: function (answers) {
            return answers.action == "Add";
        }
    },
    {
        type: "list",
        name: "update",
        message: "Update an Employee, Department, or Role?",
        choices: ["Employee", "Department", "Role"],
        when: function (answers) {
            return answers.action == "Update";
        }
    },
    {
        type: "list",
        name: "delete",
        message: "Remove an Employee, Department, or Role?",
        choices: ["Employee", "Department", "Role"],
        when: function (answers) {
            return answers.action == "Delete";
        }
    },
    {
        type: "list",
        name: "view",
        message: "View an Employee, Department, or Role?",
        choices: ["Employee", "Department", "Role", "Budget"],
        when: function (answers) {
            return answers.action == "View";
        }
    }
    
]
//consider putting these choices in a separate file...


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
        //switch ... case for each answer.func... if i can do multiple answer.func
    });
}

/* **** Main App Here **** */
mainMenu();




//call start
//might try making it a do while loop, ending function by turning a isOn variable to false
