CREATE FUNCTION get_latitude(get_user_id INTEGER)
RETURNS DECIMAL
AS
$$
DECLARE
    latitude DECIMAL;
BEGIN
    SELECT loc_latitude INTO latitude FROM users WHERE user_id = get_user_id;
    RETURN latitude;
END
$$
LANGUAGE plpgsql;


CREATE FUNCTION get_longitude(get_user_id INTEGER)
RETURNS DECIMAL
AS
$$
DECLARE
    longitude DECIMAL;
BEGIN
    SELECT loc_longitude INTO longitude FROM users WHERE user_id = get_user_id;
    RETURN longitude;
END
$$
LANGUAGE plpgsql;


CREATE FUNCTION DEG_TO_MI()
RETURNS DECIMAL
AS
$$
BEGIN
    RETURN 58.679; -- empirical constant (conversion factor lat/long degrees to miles)
END
$$
LANGUAGE plpgsql;