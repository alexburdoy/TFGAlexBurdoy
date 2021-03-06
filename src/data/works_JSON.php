<?

	header('Access-Control-Allow-Origin: *');
	require_once("conexionPDO.php");
	
	$db = new Conexion();

	$dbTabla='TFGWorks';
	$consulta = "SELECT * FROM $dbTabla ORDER BY data DESC";
	$result = $db->prepare($consulta);
	$result->execute();
	
	if (!$result){ 
		print "<p> Error en la consulta. </p>\n";
	}else{ 
		$works = array();
		echo '{"works":';
		foreach($result as $valor){
				$arr = array('id' => $valor['id'], 'name' => $valor['name'], 'description' => $valor['description'], 'imgURL' => $valor['imgURL'], 'user' => $valor['user'], 'categoria' => $valor['categoria'], 'data' => $valor['data'] );
				//echo json_encode($arr).",\n"; 
				array_push($works, $arr);
		}
		echo json_encode($works,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		echo '}'; 
	}
	
//Cerramos conexión
$db=NULL;
?>