<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $number = isset($_POST['number']) ? strip_tags(trim($_POST['number'])) : '';
    $service = isset($_POST['service']) ? strip_tags(trim($_POST['service'])) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

    // Validate required fields
    if ($name && $email && $number && $service && $message) {
        $to = 'achusarchana05@gmail.com';
        $subject = "New Appointment Request from $name";
        $body = "Name: $name\nEmail: $email\nPhone: $number\nService: $service\nMessage: $message";
        $headers = "From: $email\r\nReply-To: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            echo 'success';
        } else {
            echo 'error';
        }
    } else {
        echo 'error';
    }
} else {
    echo 'error';
} 