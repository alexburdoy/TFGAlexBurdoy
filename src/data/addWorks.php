<?
header('Access-Control-Allow-Origin: *');
require_once("conexionPDO.php");

$db = new Conexion();
$dbTabla = 'TFGWorks';

$title = $_GET["name"];
$description = $_GET["description"];
$imgurl = $_GET["imgUrl"];
$user = $_GET["user"];
$category = $_GET["categoria"];
$date = date("Y-m-d");




$consulta = "INSERT INTO $dbTabla (name,description,imgURL,user,categoria,data) VALUES ('$title','$description','$imgurl','$user',$category,'$date')";
$result = $db->prepare($consulta);
$result->execute();


$consulta2 = "SELECT * FROM $dbTabla WHERE name='$title' AND description='$description'";
$result2 = $db->prepare($consulta2);
$result2->execute();

if (!$result2) {
    print "<p> Error en la consulta. </p>\n";
} else {
    $results = array();
    echo '{"results":';
    foreach ($result2 as $valor) {
        $arr = array('id' => $valor['id'], 'name' => $valor['name'], 'description' => $valor['description'], 'imgURL' => $valor['imgURL'], 'user' => $valor['user'], 'categoria' => $valor['categoria'], 'data' => $valor['data']);
        //echo json_encode($arr).",\n"; 
        array_push($results, $arr);
    }
    echo json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo '}';
}



//Cerramos conexión
$db = NULL;
?>