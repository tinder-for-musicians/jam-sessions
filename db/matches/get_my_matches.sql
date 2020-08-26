SELECT
    m.match_id
    , m.chatroom_id
    , u.username
    , u.profile_pic
    , u.location
    , u.bio
    , CASE
        WHEN EXISTS(SELECT * FROM profile WHERE user_id != $1)
            THEN ARRAY_AGG(
                ARRAY[i.instrument_name, e.experience_years, l.level_name]
            )
        ELSE NULL
    END AS user_instruments
    
FROM matches AS m
INNER JOIN users AS u
    ON m.match_id = u.user_id
LEFT JOIN profile AS p
    ON m.match_id = p.user_id
LEFT JOIN instrument AS i
    ON p.instrument_id = i.instrument_id
LEFT JOIN levels AS l
    ON p.level_id = l.level_id
LEFT JOIN experience AS e
    ON p.experience_id = e.experience_id

WHERE
    m.user_id = $1 AND m.is_matched AND (NOT m.is_rejected) AND (NOT m.is_blocked)
    AND 
    m.match_id IN (SELECT user_id FROM matches WHERE match_id = $1 AND is_matched)

GROUP BY m.user_id, m.match_id, m.chatroom_id, u.username, u.profile_pic, u.location, u.bio

ORDER BY m.user_id, m.match_id
;