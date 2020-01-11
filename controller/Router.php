<?php
   class Router{
      private $title_events = null;

      /*Pages*/
      function home(){
         $ruta = "view/html/home.html";
         require_once($ruta);
      }
      function error(){
         $ruta = "view/html/404.html";
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
            <html>
               <style>
                     *{ 
                           font-family: arial; 
                           margin: 0;
                           padding: 0;
                           box-sizing: border-box;
                     }
                     html,body {
                           height: 100%;
                           width: 100%;
                     }
                     body {
                           background: rgba(100,100,100,.06);
                     }
                     .root {
                           width: 80%;
                           height: 100%;
                           margin: auto;
                           background: white;
                     }
                     .message-title {
                           margin-bottom: 1em;
                           background: rgb(230,60,90);
                           color: white;
                           padding: 20px;
                     }
                     .message-title .body {
                           font-size: 1.5em;
                           font-weight: bold;
                           text-align: center;
                           margin: auto;
                           width: 50%;
                     }
                     .nombre-title {
                           font-style: oblique;
                     }
                     .row {
                           display: flex;
                           align-items: center;
                           padding: 10px 3em;
                     }
                     .row strong {
                           margin-right: 10px;
                     }
                     .row span {
                           color: rgb(80,80,80);
                     }
                     .message-content {
                           padding: 2em 3em;
                     }
                     .message-content .title-message {
                           font-size: 2em;
                     }
                     .text {
                           color: rgb(80,80,80);
                           font-size: .9em;
                           padding: 10px 0;
                           line-height: 20px;
                     }
               </style>
               <body>
                  <div class='root'>
                     <div class='message-title'>
                           <div class='body'>
                              Hola, tienes un nuevo mensaje de <span class='nombre-title'><q>$name</q></span>
                           </div>
                     </div>
                     <div class='message-content'>
                           <p class='title-message'>Nuevo mensaje...</p>
                           <p class='text'>$message</p>
                     </div>
                     <div class='row'><strong>Asunto:</strong><span>$asunto</span></div>
                     <div class='row'><strong>Nombre:</strong><span>$name</span></div>
                     <div class='row'><strong>Correo electrónico:</strong><span>$email</span></div>
                     <div class='row'><strong>Telefono:</strong><span>$phone</span></div>
                     <div class='row'><strong>Organización o empresa:</strong><span>$building</span></div>
                  </div>    
               </body>
            </html>
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
