<?php

include '../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

use app\Register;

if(isset($_POST['username'])) {
    $register = new Register($_POST['username'], $_POST['email'], $_POST['passwd1'], $_POST['passwd2']);

    if($register -> validate() == true) {
        $register -> createAccount();
    }
    else {
        echo json_encode(['msg' => 'validate']);
    }
}