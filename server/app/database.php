<?php

$config = require_once 'config.php';

try {
    $connection = new PDO(
    "mysql:host={$config['host']};dbname={$config['db']}", 
    $config['user'],
    $config['pass'],
    [
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]
    );
} catch(PDOException $e) {
    echo "Error: $e";
}

