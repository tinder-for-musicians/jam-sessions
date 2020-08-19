UPDATE profile
SET
    level_id = (SELECT level_id FROM levels WHERE level_name = $3)
    , experience_id = (SELECT experience_id FROM experience WHERE experience_years = $4)
WHERE 
    user_id = $1 
    AND instrument_id = (SELECT instrument_id FROM instrument WHERE instrument_name = $2);
;
