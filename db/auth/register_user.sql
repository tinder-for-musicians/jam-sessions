INSERT INTO users
(first_name, last_name, username, email, password)
VALUES
($1, $2, $3, $4, $5)
;

SELECT first_name, last_name, username
FROM users
WHERE first_name = $1 AND last_name = $2 AND username = $3
;