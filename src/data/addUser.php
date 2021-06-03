<?

	header('Access-Control-Allow-Origin: *');
	require_once("conexionPDO.php");
	
	$db = new Conexion();

	$email = $_GET["email"];

	$dbTabla='TFGUsers';
	$consulta = "INSERT INTO $dbTabla (email) VALUES ('$email')";
$result = $db->prepare($consulta);
$result->execute();
	
//Cerramos conexión
$db=NULL;
?>