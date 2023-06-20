<?php

namespace app;

class Register {
    public $user;
    public $email;
    public $passwd1;
    public $passwd2;

    private $result;
    private $free;

    public function __construct($user,$email,$passwd1,$passwd2) {
        $this -> user = $user;
        $this -> email = $email;
        $this -> passwd1 = $passwd1;
        $this -> passwd2 = $passwd2;
        $this -> result = true;
        $this -> free = true;
    }

    public function validate() {
        $this -> result = true;
        if($this -> passwd1 != $this -> passwd2) {
            $this -> result = false;
        }

        if(empty(filter_input(INPUT_POST,'email', FILTER_VALIDATE_EMAIL))) {
            $this -> result = false;
        }

        $this -> user = htmlentities($this -> user);
        $this -> passwd1 = htmlentities($this -> passwd1);
        $this -> passwd2 = htmlentities($this -> passwd2);

        return $this -> result;
    }

    public function createAccount() {
        require_once 'database.php';

        $userQuery = $connection -> prepare("SELECT username FROM accounts WHERE username = :username");
        $userQuery -> bindValue(':username', $this->user);
        $userQuery -> execute();

        $emailQuery = $connection -> prepare("SELECT email FROM accounts WHERE email = :email");
        $emailQuery -> bindValue(':email', $this -> email);
        $emailQuery -> execute();

        if($emailQuery -> rowCount() > 0 OR $userQuery -> rowCount() > 0) {
           $this -> free = false;
        }

        if($this -> free) {
            $this -> passwd1 = password_hash($this -> passwd1, PASSWORD_DEFAULT);
            $sql = $connection -> prepare("INSERT INTO accounts VALUES(NULL,:username,:email,:password)");
            $sql -> bindValue(':username',$this -> user);
            $sql -> bindValue(':email', $this -> email);
            $sql -> bindValue(':password', $this -> passwd1);
        
            if($sql -> execute()) 
                echo json_encode(['msg' => 'success']);
            else
                echo json_encode(['msg' => 'failure']);
        }
        else {
            echo json_encode(['msg' => 'free']);
        }
    }
}