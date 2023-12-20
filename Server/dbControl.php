<?php
    if(session_status() === PHP_SESSION_NONE)
    {
        session_start();
    }
    function fail($message){
        return die(json_encode(array("status"=>"fail","message"=>$message)));
    }
    function success($message){
        echo(json_encode(array("status"=>"success","message"=>$message)));
    }
    function dbconnect($query){
        
        include "configuration.php";
        $dbc = mysqli_connect($hostName, $bdLogin, $bdPassword, $bdName) or fail("DB connection fail");
        return mysqli_query($dbc, $query);
    }
    function resetSession()
    {
        session_unset();
        session_destroy();
        session_start();
    }
    
?>