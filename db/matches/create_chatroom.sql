INSERT INTO chatroom
(chatroom_id)
VALUES
((SELECT MAX(chatroom_id)+1 FROM chatroom))
RETURNING chatroom_id  AS new_chatroom_id;