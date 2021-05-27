<?
header('Access-Control-Allow-Origin: *');
require_once("conexionPDO.php");
$expresio=$_GET["query"];
$db = new Conexion();
$dbTabla='TFGWorks';
    
    $consulta = "SELECT COUNT(*) FROM $dbTabla";
    $consulta2 = "SELECT * FROM $dbTabla";
    
    if($_GET["query"]){
        $consulta = "SELECT COUNT(*) FROM $dbTabla WHERE MATCH(name, description) AGAINST ('$expresio')";
        $consulta2 = "SELECT * FROM $dbTabla WHERE MATCH(name, description) AGAINST ('$expresio')";
    }
    

    $result = $db->prepare($consulta2);
	$result->execute();
	
	if (!$result){ 
		print "<p> Error en la consulta. </p>\n";
	}else{ 
		$results = array();
		echo '{"results":';
		foreach($result as $valor){
				$arr = array('id' => $valor['id'], 'name' => $valor['name'], 'description' => $valor['description'], 'imgURL' => $valor['imgURL'], 'user' => $valor['user'], 'categoria' => $valor['categoria'], 'data' => $valor['data'] );
				//echo json_encode($arr).",\n"; 
				array_push($results, $arr);
		}
		echo json_encode($results,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
		echo '}'; 
	}
//Cerramos conexión
$db=NULL;
?>