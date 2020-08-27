SELECT user_id, 
first_name, 
last_name, 
username, 
password, 
profile_pic, 
loc_latitude, 
loc_longitude
FROM users
WHERE email = $1
;