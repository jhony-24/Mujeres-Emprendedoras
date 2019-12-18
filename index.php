<?php

   if(isset($_GET["url"]))
   {
      require_once("controller/Router.php");
      $router = new Router();

      $ruta = $_GET["url"];
      $rutas = explode("/",$ruta);

      if(method_exists($router,$rutas[0]) && count($rutas) < 2)
      {
        if($rutas[0] != "events") $router->{$rutas[0]}();
        else require_once("view/html/404.html");
      }
      else
      {
        require_once("view/html/404.html");
      }

   }else
   {
      header("Location:home");
   }
