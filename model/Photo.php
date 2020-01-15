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

      function deletePhoto($id) {
         $query = "DELETE FROM {$this->table} WHERE id_photo = :id";
         $stm = $this->con->prepare($query);
         $stm->bindParam(":id",$id);
         $stm->execute();

         return $stm->rowCount() > 0 ? "true" : "false";
      }

      function InsertPhoto($path_image) {
         try{
         $query = "INSERT {$this->table}(path_image) VALUES(:path_image)";
            $stm = $this->con->prepare($query);
            $stm->bindParam(":path_image",$path_image);
            $stm->execute();
   
            return $stm->rowCount() > 0 ? "true" : "false";
         }
         catch(PDOException $err){
            die($err->getMessage());
         }
      }

   }