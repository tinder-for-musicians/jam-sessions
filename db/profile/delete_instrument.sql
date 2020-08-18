DELETE FROM profile
WHERE user_id = $1
    AND instrument_id = (SELECT instrument_id FROM instrument WHERE instrument_name = $2)
;