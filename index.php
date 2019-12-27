<?php

   if(isset($_GET["url"]))
   {
      require_once("controller/Router.php");
      $router = new Router();

      $ruta = $_GET["url"];
      $rutas = explode("/",$ruta);

      if(method_exists($router,$rutas[0]) && count($rutas) == 1)
      {
         $router->{$rutas[0]}();
      }else{
         $router->error();
      }

   }else
   {
      header("Location:home");
   }
