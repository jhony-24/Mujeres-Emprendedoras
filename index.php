<?php


   if(isset($_GET["url"]))
   {
      require_once("controller/Router.php");
      $router = new Router();

      $ruta = $_GET["url"];
      $rutas = explode("/",$ruta);

      if(method_exists($router,$rutas[0]))
      {
        $uri = "http://".$_SERVER["HTTP_HOST"];
        $url="";
        $len = count($rutas);

        if($len==1) $router->{$rutas[0]}();
        else if($len==2)  {
          $path = $uri.$_SERVER["REQUEST_URI"];
          $url = substr($path,0,strlen($path)-1);
        }
        else {
          $url = $uri . "/Mujeres-Emprendedoras/404"; //prueba local
          //$url = $uri . "/404"; //para producción
        }

        if($url != "") header("Location:$url");
      }
      else{
        $router->error();
      }

   }else
   {
      header("Location:home");
   }
