<?php 
    require "dbControl.php";
    if(isset($_GET['mode']) && $_GET['mode'] == 'show-history')
    {
        getReadingHistory();
        exit;
    }
    if(
        isset($_POST['mode'], $_POST['id']) 
        &&
        !empty($_POST['id'])
        &&
        $_POST['mode'] == 'delete-reading'
    ){
        deleteReading($_POST['id']);
    }

    function getReadingHistory(){
        if(isset($_SESSION['login-user-id'])){
            $query = "
                select
                    id,
                    city,
                    date,
                    temperature,
                    description,
                    icon,
                    windspeed,
                    humidity
                from reading
                where user_id = '{$_SESSION['login-user-id']}'; 
            ";
            $result = dbconnect($query);
            if(!$result)
            {
                fail("Show history query fail");
            }
            if(mysqli_num_rows($result) > 0)
            {
                $readings = [];
                while($row = mysqli_fetch_array($result))
                {
                    $readings[] = array(
                        "id"=>$row['id'],
                        "city"=>$row['city'],
                        "date"=>$row["date"],
                        "temperature"=>$row["temperature"],
                        "description"=>$row['description'],
                        "icon"=>$row['icon'],
                        "windspeed"=>$row['windspeed'],
                        "humidity"=>$row['humidity']
                    );
                }
            }
            echo(json_encode(array("readings"=>$readings)));
        }else{
            fail("Not logged in");
        }
        exit;
    }
    function deleteReading($id){
        if(isset($_SESSION['login-user-id'])){
            $query = "
                delete from reading where id = '{$id}'
            ";
            $result = dbconnect($query);
            if(!$result)
            {
                fail("Delete reading query fail");
            }
            success("Reading ".$id." deleted");
        }else{
            fail("Not logged in");
        }
        exit;
    }
?>

