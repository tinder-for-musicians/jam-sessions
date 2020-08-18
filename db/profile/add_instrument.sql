INSERT INTO profile
(user_id, instrument_id, level_id, experience_id)
VALUES
(
    $1,
    (SELECT instrument_id FROM instrument WHERE instrument_name = $2),
    (SELECT level_id FROM levels WHERE level_name = $3),
    (SELECT experience_id FROM experience WHERE experience_years = $4)
)
;