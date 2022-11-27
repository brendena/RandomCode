#!/usr/bin/env php
<?php

require __DIR__ . '/../vendor/autoload.php';

use Chat\Chat;

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

echo "running \n";

$server = IoServer::factory(new HttpServer(new WsServer(new Chat)), 2000);
$server->run();


