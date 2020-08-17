SELECT email, username
FROM users
WHERE email = $1 OR username = $2
;