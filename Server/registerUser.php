<?php 
    require "loginUser.php";

    if
    (
        isset($_POST['name'], $_POST['phone'], $_POST['email'], $_POST['password'], $_POST['city'])
        &&
        !empty($_POST['name'])
        &&
        !empty($_POST['phone'])
        &&
        !empty($_POST['email'])
        &&
        !empty($_POST['password'])
        &&
        !empty($_POST['city'])
        &&
        $_POST['mode'] == "register-user"
        
    )
    {
        $passwordSha = hash("sha256", $_POST['password']);
        $query = "
            insert into user (name, email, phone, city, password)
            values (
                '{$_POST['name']}',
                '{$_POST['email']}',
                '{$_POST['phone']}',
                '{$_POST['city']}',
                '{$passwordSha}'
            )  
        ";
        $result = dbconnect($query);
        if(!$result)
        {
            fail("Register user query fail");
        }
        loginUser($_POST['phone'], '1', $_POST['password']);
        exit;
    }
    
?>