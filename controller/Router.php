<?php
   class Router{
      private $title_events = null;

      function __construct(){
         $this->title_events = json_decode(file_get_contents("view/js/json/galery_events.json"));
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
         if(isset($_POST["submit"])){
            $to = "brunella.benavente@emcforwoman.com";
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

            $completeMessage = "
            Nombre: $name 
            Telefono: $phone
            Empresa u Organizacion: $building 
            Asunto: $asunt 
            Mensaje: $message
            ";
            if(mail($to,$asunt,$completeMessage,$headers)){
               header("Location:contact");
            }
            else{
               Header("Location:error");
            }
         }else{
            header("Location:contact");
         }
      }
   }
