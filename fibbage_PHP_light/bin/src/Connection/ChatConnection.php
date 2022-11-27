<?php

namespace Chat\Connection;

use Chat\Repository\ChatRepositoryInterface;
use Ratchet\ConnectionInterface;

class ChatConnection implements ChatConnectionInterface
{
    /**
     * The ConnectionInterface instance
     *
     * @var ConnectionInterface
     */
    private $connection;

    /**
     * The username of this connection
     *
     * @var string
     */
    private $name;

    /**
     * ChatConnection Constructor
     *
     * @param ConnectionInterface     $conn
     * @param ChatRepositoryInterface $repository
     * @param string                  $name
     */
    public function __construct(ConnectionInterface $conn, ChatRepositoryInterface $repository, $name = "")
    {
        $this->connection = $conn;
        $this->name = $name;
        $this->repository = $repository;
    }


    /**
     * Get the connection instance
     *
     * @return ConnectionInterface
     */
    public function getConnection()
    {
        return $this->connection;
    }


    
    /**
     * Get the username of the connection
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Send data through the socket
     *
     * @param  array  $data
     * @return void
     */
    
    
    
    private function send(array $data)
    {
        $this->connection->send(json_encode($data));
    }

    
    public function sendRequest($jsonRequest){
        $this->connection->send($jsonRequest);
    }
    
}
