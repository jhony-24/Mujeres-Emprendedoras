<?php
   class Router{
      private $title_events = null;

      function __construct(){
         $this->title_events = json_decode(file_get_contents("view/js/json/galery_events.json"));
      }

      /*Control de galeria eventos*/
      function lunes(){
         $this->events("lunes");
      }
      function martes(){
         $this->events("martes");
      }
      function events($event){
         $eventos = $this->title_events;
         $error = false;
         foreach($eventos as $e){
            if($event == $e->name_link_url){
               $error = false;
               $ruta = "view/html/galery_event.html";
               require_once($ruta);
               break;
            }else{
               $error = true;
            }
         }

         if($error)
         {
            $ruta = "view/html/404.html";
            require_once($ruta);
         }
      }

      /*Pages*/
      function home(){
         $ruta = "view/html/home.html";
         require_once($ruta);
      }
      function galery(){
         $ruta = "view/html/galery_image.html";
         require_once($ruta);
      }
      function contact(){
         $ruta = "view/html/contact.html";
         require_once($ruta);
      }
      function profile(){
         $ruta = "view/html/profile.html";
         require_once($ruta);
      }
      function nosotros(){
         $ruta = "view/html/nosotros.html";
         require_once($ruta);
      }
      function franquicias(){
        $ruta = "view/html/franquicias.html";
        require_once($ruta);
      }
      function servicios(){
         $ruta = "view/html/servicios.html";
         require_once($ruta);
       }

      /*Ajax content*/
      function ajaxImage(){
         $ruta = "view/js/json/galery_images.json";
         echo file_get_contents($ruta);
      }

      function sendEmail() {
          $to = "jhonyvegacuya24@gmail.com";
          $email = $_POST["email"];
          $name = $_POST["name"];
          $phone = $_POST["phone"];
          $building =  $_POST["building"];
          $asunt =  $_POST["asunt"];
          $message = $_POST["message"];

          $headers ="MIME-Version: 1.0 ";
          $headers.="from: $from  $asunt";
          $headers.="Content-type: text/html;charset=utf-8 ";
          $headers.="X-Priority: 3";
          $headers.="X-Mailer: smail-PHP ".phpversion();

          $completeMessage = $message;
          if(mail($to,$asunt,$completeMessage,$headers)){
            header("Location:contact");
          }
          else{
            Header("Location:error");
          }
      }
   }