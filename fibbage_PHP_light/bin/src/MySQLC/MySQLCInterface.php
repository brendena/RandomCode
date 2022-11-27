<?php
/*
chat is going to be handling all the calls
because the circle loggic is that servers going to ask for everthing

*/
namespace Chat\MySQLC;

interface MySQLInterface
{
    
    public function getQuestionAndAnswer($topic);

}

