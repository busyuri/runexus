-- db/init.sql
CREATE TABLE IF NOT EXISTS events (
                                      event_id SERIAL PRIMARY KEY,
                                      user_id BIGINT,
                                      title TEXT,
                                      description TEXT,
                                      participant_limit INTEGER,
                                      participant_count INTEGER,
                                      is_full BOOLEAN,
                                      event_date DATE,
                                      image_url TEXT
);

INSERT INTO events (user_id, title, description, participant_limit, participant_count, is_full, event_date, image_url)
VALUES
    (10, 'Berlin Run 5K', 'Join us for a fun 5K run in Berlin at 5 pm. Great for watching sunset ', 100, 23, false, '2025-08-15', 'https://unsplash.com/photos/a-woman-running-on-a-road-with-a-sky-background-RnWnBVWL5SM'),
    (10, 'City Sunset Run', 'Evening city run at golden hour.', 75, 42, false, '2025-08-20', 'https://images.unsplash.com/photo-1571008887538-3e7e63f2105d'),
    (10, 'Würzburg Vineyard Run Challenge', 'Conquer the trails with fellow runners. Meeting at 10 am in PSW.', 60, 19, false, '2025-08-25', 'https://images.unsplash.com/photo-1562072541-39f60b7b57b4'),
    (10, 'Early Bird Sprint: Randersacker', 'Morning sprint event to kickstart your day. Meeting at 8 am in Maingasse', 50, 34, false, '2025-08-18', 'https://images.unsplash.com/photo-1546483875-ad9014c88eba');

CREATE TABLE IF NOT EXISTS entries (
                                       id SERIAL PRIMARY KEY,
                                       user_id BIGINT NOT NULL,
                                       title TEXT NOT NULL,
                                       description TEXT,
                                       entry_date DATE DEFAULT CURRENT_DATE
);


INSERT INTO entries (user_id, title, description)
VALUES
    (1, 'My First Entry', 'Today I ran 5km and felt amazing!'),
    (2, 'Evening Thoughts', 'The sunset run gave me clarity.');

CREATE TABLE IF NOT EXISTS comments (
                                        id SERIAL PRIMARY KEY,
                                        user_id BIGINT NOT NULL,
                                        entry_id BIGINT NOT NULL,
                                        content TEXT NOT NULL,
                                        comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        like_count INTEGER DEFAULT 0
);

INSERT INTO comments (user_id, entry_id, content)
VALUES
    (3, 1, 'Great job! 5km is impressive!'),
    (4, 2, 'Sunset runs are the best.');
