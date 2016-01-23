<?php

session_start();
 
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
//$app->contentType('application/json');

$app->get('/attendees', function () use ($app){

    header('Access-Control-Allow-Origin: http://localhost');

    $ccsv = array_map('str_getcsv', file('sample_data.csv'));

    $maxLines = 26;
    $scsv = fopen("sample_data.csv", "r");
    $lcsv = array();

    for ($c = 0; $c < $maxLines && !feof($scsv); $c++)
    {
        $row = fgetcsv($scsv, 4096);
        $lcsv[] = $row;
    }
    fclose($scsv);

    unset($lcsv[0]);

    $_SESSION['attendees'] = $ccsv;

    echo json_encode($lcsv);
});

$app->get('/attendees/pg/:no', function ($no) use ($app){

    header('Access-Control-Allow-Origin: http://localhost');

    $maxLines = 101;
    $csv = $_SESSION['attendees'];
    $pgcsv = array();


    switch ($no) {
        case 2:
            for($c = 0; $c < $maxLines; $c++)
            {
                if($c > 25 && $c < 51){
                    $pgcsv[] = $csv[$c];
                }
            }
            break;
        case 3:
            for ($c = 0; $c < $maxLines; $c++)
            {
                if($c > 50 && $c < 76){
                    $pgcsv[] = $csv[$c];
                }
            }
            break;
        case 4:
            for ($c = 0; $c < $maxLines; $c++)
            {
                if($c > 75 && $c < 101){
                    $pgcsv[] = $csv[$c];
                }
            }
            break;
    }

    echo json_encode($pgcsv);
    //print "<pre/>";
    //print_r($csv);
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
