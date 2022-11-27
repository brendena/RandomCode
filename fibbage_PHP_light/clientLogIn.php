<?php
    session_start();
    require('./include/serverCode.php');
    
    //log out user and reset session
    if(isset($_GET['logout']) ){
        echo "yaaaaa";
        session_destroy();
        header("Refresh:0; clientLogIn.php");
    }

    /*
    loggin in stage
    
    if(see if uses has a acount and info matches)

    else create a account
    */
    $error = "";
    if(isset($_POST["email"]) && isset($_POST["pwd"]) )
    {
        $query = sqliSelectUser($_POST["email"], $_POST["pwd"]);
        $results = mysqli_query($link, $query);
        $num_rows = mysqli_num_rows($results);
        echo "number of row ". $num_rows . "  ";
        if($num_rows == 1){
            $_SESSION['email'] = $_POST["email"];
        } 
    }

    
        
    //logout Function go to basically do a redirect to the login page
    // and use a session_destroy() function;
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React Chat</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="container">
       <div id="center">
            <h1>Log In, Pleeease! </h1>
            
        
            <?php
           
                if(isset($_SESSION['email']) == true){
                    
                    $form = file_get_contents("LogInclude/loggedIn.html");
                    echo $form; 
                    echo "you have a session started";
                    echo "logged in email:   " . $_SESSION['email'];
                }
                //tried to log in but had problem
                else if(isset($_POST["email"]) == true){
                    $form = file_get_contents("LogInclude/form.html");
                    echo "<p>try again your password was wrong</p>";
                    echo $form; 
                    
                     
                }
                //normal 
                else
                {
                    $form = file_get_contents("LogInclude/form.html");
                    echo $form;    
                }

            ?>
        </div>
    </div>
</body>
</html>
