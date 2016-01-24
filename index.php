<?php

session_start();
 
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->contentType('application/json');

// return 1st page of results
$app->get('/attendees', function () use ($app){

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

    // remove CSV table headings
    unset($lcsv[0]);

    // cache results in a 'Session' superglobal
    $_SESSION['attendees'] = $ccsv;

    echo json_encode($lcsv);
});

// return paginated results for page 2, 3 and 4
$app->get('/attendees/pg/:no', function ($no) use ($app){

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
});

// return individual record
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

// return list of interests
$app->get('/interests', function () use ($app) {
    $cached_attendees = $_SESSION['attendees'];
    $interests = array();

    for($i = 1; $i < 101; $i++)
    {
        $no_brackets = str_replace(array( '{', '}' ), '', $cached_attendees[$i][8]);
        $no_quotes = str_replace('"', '', $no_brackets);
        $interests_raw = explode(",", $no_quotes);
        foreach($interests_raw as $interest){
            if (!in_array($interest, $interests)) {
                $interests[] = $interest;
            }
        }

    }
    echo json_encode($interests);
});

$app->run();
