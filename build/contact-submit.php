<?php

// Recieve form data
//-----------------------------
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$error = '';

if ($name === '') {
	$error = 'Name is required';
} elseif ($email === '') {
	$error = 'Email is required';
} elseif ($message === '') {
	$error = 'Message is required';
}

if ($error != '') {
	$response = array('error'=>$error);
} else {
	$response = array(
		'success'=>'Form data recieved',
		'name'=>$name,
		'email'=>$email,
		'message'=>$message
	);
}

echo json_encode($response);



// Create message class
//----------------------------
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

$newMessage = new Message($name, $email, $message);



// Check if message came from existing customer
//----------------------------------------------
class Customer {
	var $name;
	var $email;
	var $lastContactDate;
	var $purchaseHistory;
	//...
}

$customer0 = new Customer();
$customer1 = new Customer();

// Array of Customers
$customers = [$customer0, $customer1];


// Check if new message is coming from current customer
function checkMessage($newMessage) {
	global $customers;
	$count = count($customers);
	$customerIndex = false;

	for ($i = 0; $i < $count; $i++) {
		$currentCustomer = $customers[$i];
		$sameEmail = $currentCustomer->email === $newMessage->email;

		if ($sameEmail) {
			// Do something...
			$customerIndex = $i;
			break;
		}
	}

	// If not from current customer, add information
	if (!$customerIndex || $customerIndex == 0) {
		$newCustomer = new Customer($newMessage);
		array_push($customers, $newCustomer);
	}
}

checkMessage($newMessage);
	
?>