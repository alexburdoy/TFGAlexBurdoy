<?
	header('Access-Control-Allow-Origin: *');
	require_once("conexionPDO.php");
	
	$db = new Conexion();

	$name = $_GET["name"];

	$dbTabla='TFGCategories';
	$consulta = "SELECT * FROM $dbTabla WHERE id=$name";
	$result = $db->prepare($consulta);
	$result->execute();
	
	if (!$result){ 
		print "<p> Error en la consulta. </p>\n";
	}else{ 
		$categories = array();
		echo '{"categories":';
		foreach($result as $valor){
				$arr = array('id' => $valor['id'], 'name' => $valor['name'] );
				//echo json_encode($arr).",\n"; 
				array_push($categories, $arr);
		}
		echo json_encode($categories);
		echo '}'; 
	}
	
//Cerramos conexión
$db=NULL;
?>