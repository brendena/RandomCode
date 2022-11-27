<?php

namespace Chat\HubClient;

use Chat\Repository\ChatRepository;
use Ratchet\ConnectionInterface;

class HubClientConnection implements HubClientConnectionInterface
{
    protected $repository;
    private $connection;
    private $roomNumber;
    private $question; //officalQuestion
    private $answer; // officalAnswer
    private $answerList; //
    private $clientFinalAnswersList;
    private $pointsAwarded;
    private $roomSize;
    private $state;
    
    public function __construct(ConnectionInterface $conn)
    {
        $this->repository = new ChatRepository;
        $this->connection = $conn;
        $this->answer = [];
        $this->answerConn = [];
        $this->pointsAwarded = 200;
        $this->roomSize = 8;
        $this->state = 0;
        
        $this->setRoomNumber();
        echo $this->roomNumber;
        
        $this->connection->send($this->jEncode('roomcode', $this->roomNumber));
    }
    
     /**
     Add the client
     if(true)
        add the user to repository and send the hubServer a update list of all users
     else
        it log error and send a message to user to try again
    
     */
    
    public function addClient(ConnectionInterface $conn, $userName){
        echo "\n add client equals " . $this->state . "\n";
        if($this->state != 0){
            $conn->send($this->jEncode('responseAddClient', "can't join room game in session", false));
        }
        else if($this->repository->getCount() >= $this->roomSize){
            echo "Bad Info: The room is full \n";
            $conn->send($this->jEncode('responseAddClient', "the room is full", false));
        }
        else if($this->repository->addClient($conn,$userName) == true){
            //update 
            $conn->send($this->jEncode('responseAddClient', $userName));
            
            //updating the server with user names
            $this->connection->send($this->jEncode('listOfNames', 
                                                   $this->repository->getNamesOfClients()
                                                   )
                                   );
            

        }
        else{
            echo "Bad Info: the name has already been taken \n";
            $conn->send($this->jEncode('responseAddClient', "userName has been taken " .$userName, false));
        }
    }
    
     /**
     This starts and reset the game.
     So it set all variables back to default and gets a new question.
     It then send all the information to the client and hub
     
     This function is called by the web hubClient user interface
     */
    public function sendQuestionAndAnswer($question, $answer){
        if($this->state == 0){
            $this->state = 1;
            
            $this->resetVariables();

            $this->question = $question;
            $this->answer = $answer;


            $this->repository->sendAllClientsRequest($this->jEncode("sentQuestion", $question));

            $this->connection->send($this->jEncode('sentQuestion', $question));
        }
    }
    
     /**
    received all the answer from the clients
    
    if(receivedAllAnswer == true)
      send a list of possible options to guess from
      
    else
      wait until everbody submits
    
    */
    public function receiveQuestionAnswer($answer,ConnectionInterface $conn){
        if($this->state == 1){
            echo "recieved question \n\n";
            $i = 0;



            for($i; $i < count($this->answerList) &&  $i == -1; $i++){
                if($this->answerList[$i][1] == $conn){
                    echo "Bad Info: you've already submitted\n";
                    $i = -1;
                }
            }

            //if you havent submited a anwer yet
            if($i != -1){
                $this->answerList[] = [$answer, $conn];    
            }


            $conn->send( $this->jEncode('receivedQuestionAnswer', ""));


            if($this->checkEverbodyAnswered($this->answerList)){
                $justAnswers = [];
                $i = 0;
                for($i;  $i < count($this->answerList); $i++){
                    array_push($justAnswers, $this->answerList[$i][0]);
                }

                $justAnswers[] = $this->answer;

                shuffle($justAnswers);

                $this->repository->sendAllClientsRequest($this->jEncode('sentAnswer', $justAnswers));

                $this->connection->send($this->jEncode('sendAnswers', $justAnswers));
                $this->state = 2;
            }
        }
        else{
           $conn->send($this->jEncode('receivedQuestionAnswer', "not the time to submit your question's answer", false)); 
        }
    }
    
    public function receivedFinalAnswer($answer,ConnectionInterface $conn){
        if($this->state == 2){
            echo "recieved question \n\n\n";
            $i = 0;http://localhost/php/FinalTerm/fibbage_PHP_light/client.html

            for($i; $i < count($this->clientFinalAnswersList) &&  $i == -1; $i++){
                if($this->clientFinalAnswersList[$i][1] == $conn){
                    echo "Bad Info: you've already submitted\n";
                    $i = -1;
                }
            }

            if($i != -1){
                $this->clientFinalAnswersList[] = [$answer, $conn];
            }


            $conn->send($this->jEncode('receivedFinalAnswer', ""));

            if($this->checkEverbodyAnswered($this->clientFinalAnswersList)){
                $this->submitEndOfGameResults();
                
            }
        }
        else{
          $conn->send($this->jEncode('receivedFinalAnswer', "not the time to submit final quess", false));  
        }
        //i could do a return to bring the values back
    }
    
    
    public function getConnection(){
      
      echo "getConnection \n";   
      return $this->connection;
    }
    

    public function onMessage(ConnectionInterface $conn, $msg){
        echo "got message";
    }

    public function getRoomNumber(){
        return $this->roomNumber;
    }
    
    private function submitEndOfGameResults(){
        
        echo "\n submitting states \n";

        $this->state = 0;
        /*
        So i need to get all the name 


        [[Answer1,UserWhoSubmitedIt, jim asdf],[Answer2,UserWhoSubmitedIt, asdfasdf], [Answer3, "NONE"]]
        */
        $results = [];
        $returnEndResults = [];
        for($i = 0; $i < count($this->answerList); $i++){
            $results[] = $this->answerList[$i][0];
            $results[] = $this->repository->getClientByConnection($this->answerList[$i][1])->getName();
            for($j = 0; $j < count($this->clientFinalAnswersList); $j++){
                /*there was a problem where the answerList answer were one character less then  clientFinalAnswersList
                 but they look exactly the same when you ouputed them
                */
                if($this->answerList[$i][0] == substr($this->clientFinalAnswersList[$j][0],0, -1)){
                    $results[] = $this->repository->getClientByConnection($this->clientFinalAnswersList[$j][1])->getName();
                }
            }
            $returnEndResults[] = $results;
            $results= [];

        }

        $correctUser = [];
        for($j = 0; $j < count($this->clientFinalAnswersList); $j++){
            if($this->answer == substr($this->clientFinalAnswersList[$j][0],0, -1)){
                $correctUser[] = $this->repository->getClientByConnection($this->clientFinalAnswersList[$j][1])->getName();
            }
        }

        $response =['question' => $this->question,
                'answer' => $this->answer,
                'correctUsers' => $correctUser,
                'endResults' => $returnEndResults];

        $this->connection->send($this->jEncode('endOfGameResults', $response));
        
        
    }
    
    private function setRoomNumber(){
        $this->roomNumber = mt_rand();
    }
    
    private function checkEverbodyAnswered($list){
        $i = 0;
        if(count($list) == $this->repository->getCount()){
            $i = 1;
        }
        return $i;
    }
    

    private function resetVariables(){
        $this->answerList = [];
        $this->clientFinalAnswersList = [];
    }
    
    private function jEncode($action, $response, $success = true){
        $var = json_encode([
            'action' => $action,
            'success' => $success,
            'response' => $response
        ]);
        
        return $var;
        
    }
    
    public function destroyServer(){
        echo "\ndeleting all connections on hubClient\n";
        $this->repository->sendAllClientsRequest($this->jEncode("serverClosed",""));
        
    }
    
}
