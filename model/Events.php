<?php
   class Events extends Conection{
      private $table;

      function __construct(){
         parent::__construct();
         $this->table = "events";
      }
 
      function SelectEvents($filter = "all", $paramFilter = null) {
         try{
            switch($filter){
               case "all":
                  $query = "select * from {$this->table} order by id_event desc";
                  $stm = $this->con->prepare($query);
                  $stm->execute();
                  $data = $stm->fetchAll();
                  break;
               case "like" :
                  $query = "select * from {$this->table} where title_event LIKE CONCAT('%',:title,'%') order by id_event desc";
                  $stm = $this->con->prepare($query);
                  $stm->bindValue(":title",$paramFilter);
                  $stm->execute();
                  $data = $stm->fetchAll();
                  break;
            }
            return json_encode($data);
         }catch(PDOException $err){
            die($err->getMessage());
         }
      }

      function InsertEvent($keys) {
        try{
           $query = "CALL InsertEvent(:image,:title,:text)"; 
           $stm = $this->con->prepare($query);

           foreach($keys as $key => $value) {
              $stm->bindValue($key,$value,PDO::PARAM_STR);
           }
           
           $stm->execute();

           return $stm->rowCount() > 0 ? "true" : "false";
           
        }catch(PDOException $err){
           die($err->getMessage());
        }
     }

      function deleteEvent($id) {
        try{
           $query = "DELETE FROM $this->table WHERE id_event = :id";
           $stm = $this->con->prepare($query);
           $stm->bindValue(":id",$id,PDO::PARAM_INT);
           $stm->execute();

           return $stm->rowCount() > 0 ;
        }catch(PDOException $err){
           die($err->getMessage());
        }
     }


    }