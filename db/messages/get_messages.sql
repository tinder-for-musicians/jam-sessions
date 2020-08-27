SELECT message_body
FROM message
WHERE message_sender = $1 AND chatroom_id = $2
ORDER BY message_id ASC
;