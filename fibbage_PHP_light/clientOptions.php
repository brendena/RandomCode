<?php
require("./include/redirectSession.php");
require("./include/serverCode.php");
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
            <h1>options</h1>
            <a class="btn" href="./client.html">play game</a>
            <a class="btn" href="./clientAddQuestion.php">add question</a>
            <a class="btn" href="./clientReviewQuestion.php">review your questions</a>
            <a class="btn" href="./clientLogIn.php">Log out</a>
        </div>
    </div>
</body>
</html>
