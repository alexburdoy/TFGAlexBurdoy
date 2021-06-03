<?
header('Access-Control-Allow-Origin: *');
require_once("conexionPDO.php");

$db = new Conexion();
$dbTabla = 'TFGComments';

$idWork = $_GET["idWork"];
$comment = $_GET["comment"];
$user = $_GET["user"];
$date = date("Y-m-d");




$consulta = "INSERT INTO $dbTabla (idWork,user,comment,data) VALUES ($idWork,'$user','$comment','$date')";
$result = $db->prepare($consulta);
$result->execute();






//Cerramos conexión
$db = NULL;
?>