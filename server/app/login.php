<?php

namespace app;

class Login {
    public $username;
    public $password;
    private $sql;

    public function __construct($username,$password) {
        $this -> username = $username;
        $this -> password = $password;
        $this -> sql = '';
    }

    public function log() {
        require_once 'database.php';
        $this -> username = htmlentities($this -> username);
        $this -> password = htmlentities($this -> password);

        $sql = $connection -> prepare("SELECT username,password FROM accounts WHERE username LIKE :user");
        $sql -> bindValue(':user', $this -> username);

        if ($sql -> execute()) {
            if ($sql -> rowCount() > 0) {
                $row = $sql -> fetch();
                if (password_verify($this -> password, $row['password'])) {
                    return true;
                }
            }
        }
        return false;
    }
}