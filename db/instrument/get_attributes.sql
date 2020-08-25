SELECT
    ARRAY(
        SELECT instrument_name
        FROM instrument
        ORDER BY 1) AS instruments -- in alphabetical order for easier search
    , ARRAY(
        SELECT experience_years
        FROM experience
        ORDER BY experience_id) AS experience_years
    , ARRAY(
        SELECT level_name
        FROM levels
        ORDER BY level_id) AS levels
    , ARRAY(
        SELECT distance_text
        FROM distance
        ORDER BY distance_mi) AS distances
;