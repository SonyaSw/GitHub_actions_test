<?php
require('configuration.php');
header("Access-Control-Allow-Origin: null");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $cityName = $_GET['cityName'];
    if (!$cityName) {
        echo json_encode(['error' => 'Please enter a city name.']);
        exit;
    }

    $apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q={$cityName}&appid={$apiKey}&units=metric&lang=uk";

    $response = file_get_contents($apiUrl);
    echo $response;
}
