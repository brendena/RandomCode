<?php

namespace Chat\Repository;

use Ratchet\ConnectionInterface;

interface ChatRepositoryInterface
{
    public function getClientByName($name);

    public function getClientByConnection(ConnectionInterface $conn);

    public function addClient(ConnectionInterface $conn, $userName);

    public function removeClient(ConnectionInterface $conn);

    public function getClients();
    
    public function getNamesOfClients();
    
    public function getCount();
    
    public function sendAllClientsRequest($request);

}
