<?php
function isPorcaro($referer)
{
        $pattern = '/^http:\/\/(stage\.|www\.|)porcaro\.ca/';
        return 1 == preg_match($pattern, $referer, $matches);
}

if(! isPorcaro($_SERVER['HTTP_REFERER']) )
{
	echo 0;
}

$to = 'chad.lindstrom@gmail.com';

$subject = "You're the best!";
$name = $_REQUEST['congrats'];
$m = $_REQUEST['message'];
$from = $_REQUEST['from'];


if(!empty($name) && !empty($m) && !empty($from))
{
	$message = sprintf("Congratulations %s,  \nYou're the best at %s!\n\nYours truly,\n%s", $name, $m, $from);
	$headers = 'From: Website <website@porcaro.ca>' . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	mail ( $to , $subject ,$message, $headers );
	echo 1;
}