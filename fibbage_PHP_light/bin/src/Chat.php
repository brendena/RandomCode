<?php

namespace Chat;


use Chat\HubClient\HubClientConnection;
use Chat\MySQLC\MySQLC;
use SplObjectStorage;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface
{

    
    private $HubClient;
    private $sql;
    
    /* Chat Constructor */
    public function __construct()
    {
        $this->HubClient = new SplObjectStorage;
        $this->sql = new MySQLC();
        
        
    }

    /**
     * Called when a connection is opened$client->getName()
     *
     * @param ConnectionInterface $conn
     * @return void
     */
    public function onOpen(ConnectionInterface $conn)
    {
        echo "Connected to a client\n";
    }

    /**
     * Called when a message is sent through the socket
     *
     * @param ConnectionInterface $conn
     * @param string              $msg
     * @return voidib game
     */
    public function onMessage(ConnectionInterface $conn, $msg)
    {
        
        // Parse the json
        $data = $this->parseMessage($msg);
        echo "\n\n onMessage action: " . $data ->action . "\n";

        
        
        
        //command for client
        if($data->action == 'questionAnswer' || $data->action == 'finalAnswer' || $data->action == 'setServer'){
            echo "client \n";
            $room = $this->findServer($data->id, $data->action, $conn);
            
            if(!is_null($room)){
                if($data->action == "setServer"){
                    $room->addClient($conn, $data->userName);
                } 
                else if($data->action == 'questionAnswer'){
                    $room->receiveQuestionAnswer($data->questionAnswer, $conn);
                }
                else if($data->action == 'finalAnswer'){
                    $room->receivedFinalAnswer($data->finalAnswer, $conn);
                }
            }

        }
        //command for server
        else{
            echo "ServerClient \n";
            
            if($data->action == "createServerGetroomkey"){
                $this->createServer($conn);
            }

            else if($data->action == 'startGame'){
                $questionAnswer = $this->sql->getQuestionAndAnswer();
                $room = $this->findServerHub($conn);
                $room->sendQuestionAndAnswer($questionAnswer[0], $questionAnswer[1]);
            }
        }
        
        


    
    }

    
    /**
     * Parse raw string data
     *
     * @param string $msg
   sendInitNames  * @return stdClass
     */
    private function parseMessage($msg)
    {
        return json_decode($msg);
    }

    /**
     * Called when a connection is closed
     *
     * @param ConnectionInterface $conn
     * @return void
     */
    
    /*need to fix - currently noCLose funciton*/
    public function onClose(ConnectionInterface $conn)
    {
        echo "somebody left";
        $serverHub = $this->findServerHub($conn);
        if(is_null($serverHub) == false){
            echo "Server Disconnected\n";
            $serverHub->destroyServer();
            $this->HubClient->detach($serverHub);
            /*
            foreach ($this->HubClinet as $hc)
            {
                if($hc == $serverHub){
                    echo "\nfound it\n";
                    $this->HubClient->detach($hc);
                }    
            }
            */
            
            
            
        }
        else{
            echo "Client Disconnected\n";
        }
        
        /*going to have to find all the hubs and do some fun stuff*/
        //$this->repository->removeClient($conn);
    }

    /**
    This function is called by the web hubClient user interface
     * Called when an error occurs on a connection
     *
     * @param ConnectionInterface $conn
     * @param Exception           $e
     * @return void
     */
    
    
    /*need to fix - currently no on error handling*/
    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "The following error occured: " . $e->getMessage();

        //$client = $this->repository->getClientByConnection($conn);

        // We want to fully close the connection
        /*
        if ($client !== null)
        {
            $client->getConnection()->close();
            $this->repository->removeClient($conn);
        }
        */
    }
    
    /*
    for: creates a server from a standard connection
    */
    private function createServer(ConnectionInterface $conn){
        $this->HubClient->attach(new HubClientConnection($conn));
    }
    
    /*
    for: find the your specific server by it room number
    */
    private function findServer($id, $action, ConnectionInterface $conn){
        
        foreach ($this->HubClient as $hc)
        {
            if($hc->getRoomNumber() == $id){
                return $hc;
            }
        }
        $conn->send(json_encode([
                        'action' => $action,
                        'success' => "false",
                        'response' => "Your room code is wrong"])
                    );
        
        return null;
    }
    
    
    /*
    for: find the your specific server by it connection
    */
    private function findServerHub(ConnectionInterface $conn){
        $connection = null;
        foreach ($this->HubClient as $hc)
        {
            if($conn == $hc->getConnection())
            {
                echo "\nfound the server\n";
                $connection = $hc;
            }
        }
        return $connection;
    }
}
