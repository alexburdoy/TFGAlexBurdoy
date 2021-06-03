<?
	header('Access-Control-Allow-Origin: *');
	require_once("conexionPDO.php");
	
	$db = new Conexion();

	$idWorkComment = $_GET["idWorkComment"];

	$dbTabla='TFGComments';
	$consulta = "SELECT * FROM $dbTabla WHERE idWork=$idWorkComment ORDER BY data ASC";
	$result = $db->prepare($consulta);
	$result->execute();
	
	if (!$result){ 
		print "<p> Error en la consulta. </p>\n";
	}else{ 
		$comments = array();
		echo '{"comments":';
		foreach($result as $valor){
				$arr = array('id' => $valor['id'], 'idWork'=> $valor['idWork'], 'user' => $valor['user'], 'comment' => $valor['comment'], 'data' => $valor['data'] );
				//echo json_encode($arr).",\n"; 
				array_push($comments, $arr);
		}
		echo json_encode($comments);
		echo '}'; 
	}
	
//Cerramos conexión
$db=NULL;
?>