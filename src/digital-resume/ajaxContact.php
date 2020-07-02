<?php


/**
 * Redirect in function of the action wanted
 */
if (isset($_POST['action'])) {
    $action = $_POST['action'];
    if ($action == 'sendMail') {
        sendMail();
    }
}

/**
 * Send an email
 */
function sendMail() {
    $result = false;
    $message = "Error, please retry";

    if (isset($_POST['lastname']) && isset($_POST['firstname']) && isset($_POST['email']) && isset($_POST['message'])) {
        $to      = 'philippe.barre.57@gmail.com';
        $subject = '[DIGITAL_RESUME] '.$_POST['lastname'].' '.$_POST['firstname'];
        $messageToSend = $_POST['message'];
        $headers = 'From: ' . $_POST['email'] . "\r\n" .
            'Reply-To: ' . $_POST['email'] . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        $result = mail($to, $subject, $messageToSend, $headers);

        if ($result) {
            $message = 'Your message has been sent !';
        }
    }

    echo json_encode(
        array(
            'success' => $result,
            'message' => $message
        )
    );
}
