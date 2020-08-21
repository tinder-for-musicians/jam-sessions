INSERT INTO users
(first_name, last_name, username, email, password)
VALUES
($1, $2, $3, $4, $5)
;

SELECT user_id, first_name, last_name, username, profile_pic, loc_latitude, loc_longitude
FROM users
WHERE first_name = $1 AND last_name = $2 AND username = $3
;