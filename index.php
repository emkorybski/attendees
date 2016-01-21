<?php

session_start();
 
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
//$app->contentType('application/json');

$app->get('/attendees', function () use ($app){

    header('Access-Control-Allow-Origin: http://localhost');

    $csv = array_map('str_getcsv', file('sample_data.csv'));

    unset($csv[0]);

    $_SESSION['attendees'] = $csv;

    echo json_encode($csv);
});

$app->get('/attendees/:id', function ($id) use ($app) {
    $cached_attendees = $_SESSION['attendees'];

    $max = sizeof($cached_attendees);
    for($i = 1; $i < $max; $i++)
    {
        if($cached_attendees[$i][0] == $id){
            echo json_encode($cached_attendees[$i]);
        }

    }
});

$app->run();
