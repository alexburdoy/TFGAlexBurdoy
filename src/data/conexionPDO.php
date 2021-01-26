<?php 
 class Conexion extends PDO { 
   private $tipo_de_base = 'mysql';
   private $host = 'localhost';
   private $nombre_de_base = 'alexbm1';
   private $usuario = 'alexbm1';
   private $contrasena = 'albumu98'; 
   public function __construct() {
      //Sobreescribo el metodo constructor de la clase PDO.
      try{
         parent::__construct($this->tipo_de_base.':host='.$this->host.';dbname='.$this->nombre_de_base, $this->usuario, $this->contrasena);
      }catch(PDOException $e){
         echo 'Hi ha un error i no es pot accedir a la Base de Dades :(. Detall: ' . $e->getMessage();
         exit;
      }
   } 
 } 
?>