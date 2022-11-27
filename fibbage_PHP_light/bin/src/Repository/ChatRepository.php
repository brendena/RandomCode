<?php

namespace Chat\Repository;

use SplObjectStorage;
use Chat\Connection\ChatConnection;
use Ratchet\ConnectionInterface;

class ChatRepository implements ChatRepositoryInterface
{
    /**
     * All the connected clients
     *
     * @var SplObjectStorage
     */
    
    
    /*
    all elements are clients
    */
    private $clients;
    


    /**
     * ChatRepository Constructor
     */
    public function __construct()
    {
        $this->clients = new SplObjectStorage;
        $this->roomNumber = -1;
    }

    /**
     * Get a client by their name
     *
     * @param string $name
     * @return ChatConnectionInterface
     */
    public function getClientByName($name)
    {
        foreach ($this->clients as $client)
        {
            if ($client->getName() === $name)
                return $client;
        }

        return null;
    }

    /**
     * Get a client by their connection
     *
     * @param ConnectionInterface $conn
     * @return ChatConnectionInterface
     */
    public function getClientByConnection(ConnectionInterface $conn)
    {
        foreach ($this->clients as $client)
        {
            if ($client->getConnection() === $conn)
            return $client;
        }

        return null;
    }

    /**
     * Add a client to the list
     *
     * @param ConnectionInterface $conn
     * @return void
     */
    public function addClient(ConnectionInterface $conn, $userName)
    {
        if($this->getClientByName($userName) == null){
            echo "1 \n";
            $this->clients->attach(new ChatConnection($conn, $this, $userName));
            return true;
        }
        echo "0\n";
        return null;
    }

    /**
     * Remove a client from the list
     *
     * @param ConnectionInterface $conn
     * @return void
     */
    public function removeClient(ConnectionInterface $conn)
    {
        $client = $this->getClientByConnection($conn);

        if ($client !== null)
            $this->clients->detach($client);
    }

    /**
     * Get all the connected clients
     *
     * @return SplObjectS$serverClienttorage
     */
    public function getClients()
    {
        return $this->clients;
    }
    
    
    
    public function getNamesOfClients()
    {
        $listPeople = '';
        foreach ($this->clients as $client)
        {
            $listPeople = $listPeople . $client->getName() . " ";
            
        }
        echo "\n list of people \n ";
        echo $listPeople;
        echo "\n";
        
        return $listPeople;
    }
    /*
    public function sendRequest($jsonObject)
    {
        
    }
    */
    
    public function sendAllClientsRequest($request)
    {
        foreach ($this->clients as $client)
        {
            $client->sendRequest($request);
            
        }
    }

    
    public function getCount(){
        return $this->clients->count();
    }
}
