SELECT
    u.username
    , u.first_name
    , u.last_name
    , u.location
    , u.profile_pic
    , u.bio
    , CASE
        WHEN EXISTS(SELECT * FROM profile WHERE user_id = $1)
            THEN ARRAY_AGG(
                ARRAY[i.instrument_name, e.experience_years, l.level_name]
            )
        ELSE NULL
    END AS user_instruments
FROM users AS u
LEFT JOIN profile AS p
    ON u.user_id = p.user_id
LEFT JOIN instrument AS i
    ON i.instrument_id = p.instrument_id
LEFT JOIN experience AS e
    ON e.experience_id = p.experience_id
LEFT JOIN levels AS l
    ON l.level_id = p.level_id
WHERE u.user_id = $1
GROUP BY u.user_id
;
