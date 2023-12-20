<?php 
    require "dbControl.php";
    if
    (/*
        !empty($_POST['city'])
        &&
        !empty($_POST['time'])
        &&
        !empty($_POST['temperature'])
        &&
        !empty($_POST['description'])
        &&
        !empty($_POST['icon'])
        &&*/
        $_POST['mode'] == "log-reading"
    )
    {
        logReading($_POST['city'], $_POST['date'], $_POST['temperature'], $_POST['description'], $_POST['icon'], $_POST['windspeed'], $_POST['humidity']);
    }

    function logReading($city, $date, $temperature, $description, $icon, $windspeed, $humidity)
    {
        if(isset($_SESSION['login-user-id'])){
            $query = "
                insert into reading (user_id, city, date, temperature, description, icon, windspeed, humidity)
                values (
                    '{$_SESSION['login-user-id']}',
                    '{$city}',
                    str_to_date('{$date}', '%m/%d/%Y'),
                    '{$temperature}',
                    '{$description}',
                    '{$icon}',
                    '{$windspeed}',
                    '{$humidity}'
                )  
            ";
            fail($query);
            $result = dbconnect($query);
            if(!$result)
            {
                fail("Log reading query fail");
            }
            success('Reading logged successfully');
        }else
        {
            fail("Not logged in");
        }
        exit;
    }
?>