SELECT
    location
    , profile_pic
    , bio
    , ARRAY_AGG(
        ARRAY[i.instrument_name, e.experience_years, l.level_name]
    ) AS user_instruments
FROM users AS u
INNER JOIN profile AS p
    ON u.user_id = p.user_id
INNER JOIN instrument AS i
    ON i.instrument_id = p.instrument_id
INNER JOIN experience AS e
    ON e.experience_id = p.experience_id
INNER JOIN levels AS l
    ON l.level_id = p.level_id
WHERE u.user_id = $1
GROUP BY u.user_id
;
