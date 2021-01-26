<?
	require_once("conexionPDO.php");
	
	$db = new Conexion();

	$dbTabla='TFGUsers';
	$consulta = "SELECT * FROM $dbTabla";
	$result = $db->prepare($consulta);
	$result->execute();
	
	if (!$result){ 
		print "<p> Error en la consulta. </p>\n";
	}else{ 
		$users = array();
		echo '{"users":';
		foreach($result as $valor){
				$arr = array('name' => $valor['name'], 'username' => $valor['username'], 'email'=> $valor['email'], 'password' => $valor['password']);
				//echo json_encode($arr).",\n"; 
				array_push($users, $arr);
		}
		echo json_encode($users);
		echo '}'; 
	}
	
//Cerramos conexión
$db=NULL;
?>