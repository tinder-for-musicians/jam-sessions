INSERT INTO instrument
(instrument_name)
VALUES
('vocals'),
('electric guitar'),
('acoustic guitar'),
('classical guitar'),
('lead guitar'),
('rhythm guitar'),
('bass guitar'),
('drum set'),
('percussion'),
('piano/keyboard')
;

INSERT INTO levels
(level_name)
VALUES
('student'),
('hobbyist'),
('amateur'),
('professional')
;

INSERT INTO experience
(experience_years)
VALUES
('0-1 years'),
('1-3 years'),
('3-5 years'),
('5-10 years'),
('10+ years')
;

INSERT INTO distance
(distance_mi, distance_text)
VALUES
(3.0, '3 miles'),
(5.0, '5 miles'),
(10.0, '10 miles'),
(15.0, '15 miles'),
(20.0, '20 miles'),
(25.0, '25 miles'),
(9999.0, '30+ miles') -- all distances away
;