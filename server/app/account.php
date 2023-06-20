<?php

include '../vendor/autoload.php';
use app\Login;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


session_start();

if(isset($_POST['username'])) {
    $login = new Login($_POST['username'], $_POST['password']);
    
    if($login -> log()) {
        echo json_encode(['msg' => 'success', "token" => session_id()]);
        $_SESSION['user'] = $_POST['username'];
    }
    else {
        echo json_encode(['msg' => 'failure']);
    }
}

?>