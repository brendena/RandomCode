<?php
session_start();
// if not set then go to log in screen
if(!isset($_SESSION['email'])){ 
    header("Refresh:0; clientLogIn.php");
}
?>