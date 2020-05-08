# InsecureEmployeeCMS
Content Management System that allows a user to track employees salaries and group them by department. This program is not designed to contain sensitive data and as such does not have a Social Security number option.


## Dependencies and Setup
  
This application is dependent on the mysql, express and console-table modules for node, accesible via NPM.
To set up this app on your own computer:  
1. install mysql and mysql workbench
2. clone the repository at https://github.com/GormTheWyrm/InsecureEmployeeCMS onto your own computer
3. open the root directory in terminal with node.js. I use visual studio code but other programs may be used.
4. enter "npm i" to install all the node modules required to run the program.
5. open and run the seed.sql file (under the assets folder) with mysql. This should create an empty database and tables
6. run the application by typing "node app.js" in the terminal
![gif of opening file](/assets/openingDemo.gif)

## Using the Program
  
Use the arrows to navigate through the options, inputting text where prompted.  
ID values should be integers.  
Employee Salary can be a float and is designed for US dollars per hour.

Users can add, update and remove employees, departments and job roles.
Employee data includes first and last names, a job role ID a department ID, and the ID of their supervisor

There is currently minimal Error handling. inputing a bad answer will simply end the program. If that happens, just type "node app.js" to get back in. If the command line does not reappear you may need to click on the terminal and press "ctrl" & "c" to manually break out of the program.  
Otherwise, selecting "exit" should exit the application.

## Current bugs and needed improvements;

There are several other features I would have liked to have included if I had more time:  
+ managers are not yet implemented.
+ application needs more error handling
+ implement a budget option that displays a departments hourly budget
  


GIF of Full Application:  
![](/assets/FullDemo.gif)














