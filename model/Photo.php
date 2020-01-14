<?php
   class Photo extends Conection{
      function __construct(){
         parent::__construct();
         $this->table = "photo";
      }

      function getPhotos(){
         try{
            $query = "SELECT * FROM {$this->table}";
            $stm = $this->con->prepare($query);
            $stm->execute();

            return json_encode($stm->fetchAll());
         }catch(PDOException $err){
            die($err->getMessage());
         }
      }
   }