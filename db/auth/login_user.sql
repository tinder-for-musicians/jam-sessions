SELECT user_id, first_name, last_name, username, password
FROM users
WHERE email = $1
;