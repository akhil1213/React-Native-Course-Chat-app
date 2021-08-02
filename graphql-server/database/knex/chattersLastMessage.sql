-- get all chatters for a to user and the last message sent, these are basically notifications.
select
from
    users
    inner join (
        select
            body,
            message.from,
            message.time_sent,
            message.to
        from
            message
            inner join (
                select
                    max(message.time_sent) as max_msg_time_sent,
                    message.from
                from
                    message
                where
                    message.to = 3
                    or message.from = 3
                group by
                    message.to,
                    message.from
            ) as latest_time_from on max_msg_time_sent = message.time_sent
    ) as latest_messages on users.id = latest_messages.from;