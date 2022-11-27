<?php
require("./include/serverCode.php");
require("./include/redirectSession.php");

$query = sqliSelectQuestion($_SESSION['email']);
$result = mysqli_query($link,$query);




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
            <h1>Review Your Question</h1>
            <div>
                <?php
                    while($row = mysqli_fetch_array($result))
                    {
                        echo "<div class='pQuestions'> <p> question: ". $row['question']."</p> <p> answer:   " . $row['answer']   .   " </p></div>";
                    }
                ?>
            </div>
            <a class="btn" href="clientOptions.php"> return</a>
        </div>
    </div>
</body>
</html>
