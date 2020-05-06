SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM job_role;
-- "role" will cause errors in the future as it is likely to become a reserved keyword
-- therefore I changed it to job_role

UPDATE employee SET first_name = "Jim" WHERE id = 1;


-- definitely need an outer join
-- join role_id with job_role.title... and department_id with job_role.department_id


-- this should work for viewing employees
SELECT employee.first_name, employee.last_name, job_role.title, department.name
FROM employee
LEFT JOIN job_role
ON employee.role_id = job_role.id
LEFT JOIN department
ON job_role.department_id = department.department_id;

-- view department


-- view role