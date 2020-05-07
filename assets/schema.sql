SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM job_role;
-- "role" will cause errors in the future as it is likely to become a reserved keyword
-- therefore I changed it to job_role
USE open_employee_db;

UPDATE employee SET first_name = "Jim" WHERE id = 1;


-- definitely need an outer join
-- join role_id with job_role.title... and department_id with job_role.department_id


-- this should work for viewing employees
SELECT employee.first_name, employee.last_name, job_role.title, department.name AS department_name
FROM employee
LEFT JOIN job_role
ON employee.role_id = job_role.id
LEFT JOIN department
ON job_role.department_id = department.id;

-- view role
-- want to see the dept name in this

-- SELECT job_role.title, job_role.salary, department.name
-- FROM job_role
-- LEFT JOIN department.name
-- ON job_role.department_id = department.id;

-- role!
SELECT job_role.id, job_role.title, job_role.salary, department.name
FROM job_role
LEFT JOIN department
ON job_role.id = department.id;
-- this did something!

-- view department
-- I want to... see all the employes whose deptartment_id matches the dept's id
SELECT department.id, department.name AS department_name, employee.first_name, employee.last_name, job_role.title, job_role.salary
FROM department
LEFT JOIN job_role
ON department.id = job_role.department_id
LEFT JOIN employee
ON job_role.department_id = department.id
ORDER BY department.id;
-- this will return one result per employee, sorted by departments...alter
-- I'm not putting this in 






