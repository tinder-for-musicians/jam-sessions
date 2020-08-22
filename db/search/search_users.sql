SELECT DISTINCT -- N.B. DISTINCT omits duplicate rows in output if matching user(s) has/have multiple instruments in their profile
    u.user_id
    , u.username
    , u.profile_pic
    , u.bio
    , DEG_TO_MI() * SQRT(POWER(u.loc_latitude - get_latitude($1), 2) + POWER(u.loc_longitude - get_longitude($1), 2)) AS distance_away_mi

-- source tables
FROM users AS u
INNER JOIN profile AS p
    ON u.user_id = p.user_id

WHERE
    -- exclude user's own self from matches list
    u.user_id != $1

    -- 1) match on distance from user
    AND    
        CASE
            WHEN $2 IS NULL
            -- default to <= DEFAULT_SEARCH_DISTANCE(), if no distance indicated in user search
            THEN u.user_id IN (
                SELECT user_id
                FROM users as u
                WHERE DEG_TO_MI() * SQRT(POWER(get_latitude($1) - u.loc_latitude, 2) + POWER(get_longitude($1) - u.loc_longitude, 2))
                <= DEFAULT_SEARCH_DISTANCE()
                AND u.loc_latitude IS NOT NULL AND u.loc_longitude IS NOT NULL -- exclude profiles with no geolocation data populated
                )
            -- otherwise, search within indicated search distance
            WHEN $2 IS NOT NULL
            THEN u.user_id IN (
                SELECT user_id
                FROM users as u
                WHERE DEG_TO_MI() * SQRT(POWER(get_latitude($1) - u.loc_latitude, 2) + POWER(get_longitude($1) - u.loc_longitude, 2))
                <= $2
                AND u.loc_latitude IS NOT NULL AND u.loc_longitude IS NOT NULL -- exclude profiles with no geolocation data populated
                )
            END

    -- 2) match on instrument
    AND
        CASE
            -- by provided instrument, if specified
            WHEN $3 IS NOT NULL
            THEN p.instrument_id = (SELECT instrument_id FROM instrument WHERE instrument_name = $3)
            -- otherwise, all instruments
            WHEN $3 IS NULL 
            THEN 
            p.instrument_id IN (SELECT instrument_id FROM instrument)
        END

    -- 3) match level and/or experience conditionally on...
    AND
        CASE
            -- ...provided both level and experience
            WHEN $4 IS NOT NULL AND $5 IS NOT NULL
            THEN
                p.level_id = (SELECT level_id FROM levels WHERE level_name = $4)
                AND
                p.experience_id = (SELECT experience_id FROM experience WHERE experience_years = $5)
            -- ...provided level only
            WHEN $4 IS NOT NULL AND $5 IS NULL
            THEN
                p.level_id = (SELECT level_id FROM levels WHERE level_name = $4)
                AND
                p.experience_id IN (SELECT experience_id FROM experience)
            -- ...provided experience only
            WHEN $4 IS NULL AND $5 IS NOT NULL
            THEN 
                p.level_id IN (SELECT level_id FROM levels)
                AND
                p.experience_id = (SELECT experience_id FROM experience WHERE experience_years = $5)
            -- neither level nor experience (i.e., include ALL levels and ALL experience)
            WHEN $4 IS NULL AND $5 IS NULL
            THEN 
                p.level_id IN (SELECT level_id FROM levels)
                AND
                p.experience_id IN (SELECT experience_id FROM experience)
        END

ORDER BY distance_away_mi ASC -- sort by nearest-distance profile first
;