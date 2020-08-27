update users
set loc_latitude = $2, loc_longitude = $3
where user_id = $1
returning loc_latitude, loc_longitude
;