SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM job_role;
-- "role" will cause errors in the future as it is likely to become a reserved keyword
-- therefore I changed it to job_role

UPDATE employee SET first_name = "Jim" WHERE id = 1;