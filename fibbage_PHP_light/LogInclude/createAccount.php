<?php
function outputCreateAccountForm($email, $pwd, $age, $fn, $ln){
echo "
<form name='logIn' action='clientCreateAccount.php' method='post'>
    <table id='acct_form'>
        <tr>
            <td class='labels'>email:</td>
            <td><input pattern='[^$&+,:;=?#|<>*()%!]+' class='resizeInput' name='email' size='40' type='email' placeholder='Enter a valid email address'  required 
             value='" . $email . "' />
            </td>
        </tr>
        <tr>
            <td class='labels'>password:</td>
            <td><input class='resizeInput' name='pwd' size='25' type='password' pattern='.{5,}'  placeholder='must be 5 characters long' required
            value='" . $pwd . "'/>
            </td>
        </tr>
        <tr>
            <td class='labels'>age:</td>
            <td><input pattern='[^$&+,:;=?#|<>.*()%!]+' class='resizeInput' name='age' size='25' type='number' min='18' max='150' placeholder='must be 18 older' required
            value='" . $age . "'
            /></td>
        </tr>
        <tr>
            <td class='labels'>first name</td>
            <td><input pattern='[^$&+,:;=?#|<>*.()%!]+' class='resizeInput' name='fn' size='25' required 
            value='" . $fn  ."'/></td>
        </tr>
        <tr>
            <td class='labels'>last name</td>
            <td><input pattern='[^$&+,:;=?#|<>*.()%!]+' class='resizeInput' name='ln' size='25' required
            value='" . $ln . "'/></td>
        </tr>
        <tr>
           <td><a class='btn' href='./clientLogIn.php'>back</a></td>
           <td><input  class='btn' type='submit' value='create Account' name='s' /></td>
        </tr>
    </table>
</form>
";

    
}
?>


