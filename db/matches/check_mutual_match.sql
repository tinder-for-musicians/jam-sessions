SELECT DISTINCT COUNT(*) AS users_count
FROM matches
WHERE
    user_id = $1 AND match_id = $2 AND is_matched
    OR
    user_id = $2 AND match_id = $1 AND is_matched
;