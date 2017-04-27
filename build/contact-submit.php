<?php

class Message {
	var $name;
	var $email;
	var $message;

	function _construct($name, $email, $message) {
		$this->name = $name;
		$this->email = $email;
		$this->message = $message;
	}
}


$newMessage = new Message($_POST['contact-name'], $_POST['contact-email'], $_POST['contact-message']);


?>