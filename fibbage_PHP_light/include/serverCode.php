<?php
$host = "localhost";
$user = "brenden";
$pass = "password";
$db = "fibbage";


$link = mysqli_connect($host,$user,$pass,$db); 

if ($link->connect_errno > 0) {
    
    die('Could not connect: ' . $db->error ); 

}

$db_selected = mysqli_select_db($link, $db); 

if (!$db_selected) {
    die ('Can\'t use database $db : ' . $db->error); 
}

function sqliInsertUser($email, $pwd, $age, $fn, $ln){
    echo "Insert into UserDB values('". $pwd . "','" .$email  . "','"
                                        . $age  . "','" . $fn  . "','" 
                                        . $ln . "');";
    return "Insert into UserDB values('". $pwd. "','" . $email . "','"
                                        . $age  . "','" . $fn  . "','" 
                                        . $ln . "');";
} 

function sqliSelectUser($email, $pwd){
    //echo "select pwd, email from UserDB where email ='" . $email . "' and pwd ='" . $pwd  . "';";
    return "select pwd, email from UserDB where email ='" . $email . "' and pwd ='" . $pwd  . "';";
}

function sqliInsertQuestion($question, $answer, $email){
    $query = "Insert into Question (question, answer, userEmail)" .
              "value('" .$question ."','". $answer ."','". $email  ."' );";
    //echo $query;
    return $query;
}

function sqliSelectQuestion($email){
    $query = "Select * from Question where userEmail ='" . $email.  "';";
    //echo $query;
    return $query;
}

?>