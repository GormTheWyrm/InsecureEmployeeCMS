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
SELECT employee.first_name, employee.last_name, job_role.title, department.name
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
-- skipping any joins for department