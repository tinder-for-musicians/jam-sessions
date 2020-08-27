UPDATE matches
SET chatroom_id = $3
WHERE (user_id = $1 AND match_id = $2) OR (user_id = $2 AND match_id = $1)
;