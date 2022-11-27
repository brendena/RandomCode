<?php
    require('./include/serverCode.php');
    require('./LogInclude/createAccount.php');
    $email ="";
    $pwd  =  "";
    $age =  "";
    $fn = "";
    $ln = "";
    


    $error = "";
    if(isset($_POST["email"]) && isset($_POST["pwd"]) && 
       isset($_POST["age"]) && isset($_POST["fn"]) && 
       isset($_POST["ln"])  
      )
    {
        $email = $_POST["email"];
        $pwd  = $_POST["pwd"];
        $age =  $_POST["age"];
        $fn = $_POST["fn"];
        $ln = $_POST["ln"];
        
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
           $error =  $error. "<p>Email Error</p>";
            $email = "";
        }
        if(strlen($pwd) < 5){
            $error =  $error. "<p>password must be 5 characters long</p>";
        }
        if($age > 150 && $error == ""){
           $error =  $error. "<p>please submit a real age </p>";
            $age = "";
        }
        if($age < 18 && $error == ""){
           $error = $error . "<p>must be 18 older to play </p>";
            $age = "";
        }
        if(!preg_match("/^[a-zA-Z ]/",$fn) && $error == ""){
           $error = $error . "<p>First Name can only have letters and spaces </p>";
           $fn = "";

        }
        if(!preg_match("/^[a-zA-Z ]/",$ln) && $error == "" ){
           $error = $error . "<p>Last Name can only have letters and spaces </p>";
           $ln = "";
        }
        

        
                                                      
       
            
        
        if($error == ""){
            $query = sqliInsertUser($email, $pwd, $age, $fn, $ln);
            $results = mysqli_query($link, $query);

            /*
            $query = sqliSelectUser($_POST["email"], $_POST["pwd"]);
            $results = mysqli_query($link, $query);
            $num_rows = mysqli_num_rows($results);
            echo "<p> number of rows ". $num_rows . " </p>";



            if($num_rows == 1){
                echo "yaya";
                $_SESSION['email'] = $_POST["email"];
            }


            else{
                //check to see if there's a email already taken
                echo "fuck";
            }
            */
        }
    }
    else{
        $error = $error . "Please resubmit the form";
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
            <h1>Create Account, Pleeease! </h1>
            
        
            <?php
           

                //tried to log in but had problem
                
                if($error == "2"){

                    
                    echo "<p>ready to log in</p>";
                    //echo $form; 
                    
                     
                }
                //normal 
                else
                {
                    outputCreateAccountForm($email, $pwd, $age, $fn, $ln);
                    if(count($_POST) != 0){
                       echo $error;
                    }
                    
                     
                }

            ?>
        </div>
    </div>
</body>
</html>
