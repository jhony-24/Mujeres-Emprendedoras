<?php
   class Router{
      private $title_events = null;
      private $routerBase = "view/html/";

      /*Pages*/
      function home(){
         $ruta = $this->routerBase."home.html";
         require_once($ruta);
      }
      function error(){
         $ruta = $this->routerBase."404.html";
         require_once($ruta);
      }
      function galery(){
         $ruta = $this->routerBase."galery_image.html";
         require_once($ruta);
      }
      function events(){
         $ruta = $this->routerBase."galery_event.html";
         require_once($ruta);         
      }
      function contact(){
         $ruta = $this->routerBase."contact.html";
         require_once($ruta);
      }
      function profile(){
         $ruta = $this->routerBase."profile.html";
         require_once($ruta);
      }
      function nosotros(){
         $ruta = $this->routerBase."nosotros.html";
         require_once($ruta);
      }
      function franquicias(){
        $ruta = $this->routerBase."franquicias.html";
        require_once($ruta);
      }
      function servicios(){
         $ruta = $this->routerBase."servicios.html";
         require_once($ruta);
       }
      function login() {
         $rute = $this->routerBase."login.html";
         require_once($rute);
      }

      //---------------------------------ALTERAR POR DISEÑO---------------------------------------
      function admin(){
         session_start();
         if(isset($_SESSION["user"])){
            $url = $this->routerBase . "admin.html";
            require_once($url);
         }else{
            header("location: index.php?url=login");
         }
      }

      function logout(){
         session_start();
         session_destroy();
         echo "true";
      }

      function AdminDeleteEvent(){
         if(isset($_POST["id_event"])){
            require_once("model/Conection.php");
            require_once("model/Events.php");

            $id = intval($_POST["id_event"]);
            $publications = new Events();
            $response = $publications->deleteEvent($id);
            echo ($response == "true" ? "deleteOk" : "deleteFail");
         }else{
            echo "deleteFail";
         }
      }


      //Ajax
      function RequestEvents(){
         require_once("model/Conection.php");
         require_once("model/Events.php");

         $publications = new Events();
         $event = $publications->SelectEvents();
         echo $event;
      }

      function RequestImages(){
         require_once("model/Conection.php");
         require_once("model/Photo.php");

         $photo = new Photo();
         $data = $photo->getPhotos();
         echo $data;
      }

      function DeleteImage(){         
         require_once("model/Conection.php");
         require_once("model/Photo.php");

         $id = intval($_POST["id_photo"]);
         $photo = new Photo();
         $data = $photo->deletePhoto($id);
         echo $data;

      }


      function SearchByTitle() {
         require_once("model/Conection.php");
         require_once("model/Events.php");
         $publications = new Events();
         if(isset($_GET["title"])) {
            echo $publications->SelectEvents("like",$_GET["title"]);
         }
         else {
            echo "error";
         }
      }


      function getImages(){
         require_once("model/Conection.php");
         require_once("model/Photo.php");

         $photos = new Photo();
         echo $photos->getPhotos();
      }

      function LoginRequest(){
         if(isset($_POST["user"])){
            require_once("model/Conection.php");
            require_once("model/User.php");
            
            $user = new User();
            $response = $user->Login($_POST["user"],$_POST["pass"]);

            if($response == "true"){
               session_start();
               $_SESSION["user"] = true;
               session_write_close();
            }

            echo $response;
         }else{
            echo "false";
         }
      }

      function AdminCreateEvent(){
         if(isset($_FILES["image"])) {
            require_once("model/Conection.php");
            require_once("model/Events.php");
   
            $path = "public/event_publications/" . $_FILES["image"]["name"];
            $type = explode("/",$_FILES["image"]["type"]);
   
            if ($type[1] == "png" || $type[1] == "jpeg" || $type[1] == "jpg") {
               $event = new Events();
               
               $values = [
                  ":image" => $path,
                  ":title" => $_POST["title"],
                  ":text" => $_POST["text"] 
               ];  
               
               $response = $event->InsertEvent($values);
               if ($response == "true") {
                  if (move_uploaded_file($_FILES["image"]["tmp_name"],$path)) {
                     echo $response;
                  }
               }else if ($response == "false") {
                  echo "ErrorUpdload";
               }
            }else {
               echo "NoImage";
            }
         }else {
            echo "false";
         }
      }

      function AdminCreateImage() {
         if(isset($_FILES["image"])) {
            require_once("model/Conection.php");
            require_once("model/Photo.php");
            
            $path = "view/assets/image/" . $_FILES["image"]["name"];
            $type = explode("/",$_FILES["image"]["type"]);
   
            if ($type[1] == "png" || $type[1] == "jpeg" || $type[1] == "jpg") {
               $photo = new Photo();
               $response = $photo->InsertPhoto($path);
               if ($response == "true") {
                  if (move_uploaded_file($_FILES["image"]["tmp_name"],$path)) {
                     echo $response;
                  }
               }else if ($response == "false") {
                  echo "ErrorUpdload";
               }
            } else{
               echo "NoImage";
            }
         }
         else {
            echo "false";
         }
      }

      function sendEmail() {
         if(isset($_POST["submit"])){
            $to = "brunella.benavente@emcforwoman.com";
            $email = $_POST["email"];
            $name = $_POST["name"];
            $phone = $_POST["phone"];
            $building =  $_POST["building"];
            $asunt =  $_POST["asunt"];
            $message = $_POST["message"];

            $headers ="MIME-Version: 1.0 \r\n";
            $headers.="from: $email \r\n";
            $headers.="Reply-To:$email \r\n";
            $headers.="X-Priority: 3\r\n";
            $headers.="Content-type: text/html;charset=utf-8\r\n";
            $headers.="X-Mailer: smail-PHP ".phpversion();
            $completeMessage = require_once("__template__.php");
            if(mail($to,$asunt,$completeMessage,$headers)){
               header("Location:contact");
            }
            else{
               header("Location:error");
            }
         }else{
            header("Location:contact");
         }
      }
   }
