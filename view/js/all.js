var Slider = {
   time : 6,
   element : () => document.querySelector(".slider"),
   animate : function(elements,origin = false) {
      //Remueve o agrega la animacion
      if(!origin){
         for(let i of elements){
            i.classList.add("animation-slider");
         }         
      }
      else
      {
         for(let i of elements){
            i.classList.remove("animation-slider");
         }          
      }
   },
   init : function(){
      let BtnSlider = this.element().querySelectorAll(".icons .circle");   //Circulos del slider
      let images = this.element().querySelectorAll(".image");  //Cantidad de items del slider
      let imgActual = 0;
      let longX = 100;     //Distancia de movimiento del slider
 
      BtnSlider[imgActual].classList.add("select");
      let animation_elements = images[imgActual++].querySelectorAll(".text *");
      this.animate(animation_elements);
 
      setInterval(() => {
 
         if(imgActual == 1 || imgActual == 2){
 
            //Mueve el slider y resetea los circulos.
            for(let img of [...images]) img.style.transform = `translateX(-${longX}%)`;
            for(let circle of [...BtnSlider]) circle.classList.remove("select");
 
            longX += 100;
 
            //Animacion del boton y el texto
            BtnSlider[imgActual].classList.add("select");
            this.animate(images[imgActual++].querySelectorAll(".text *"));
 
         }else{
            longX -= 100 * imgActual;
 
            //Reset de todo
            for(let circle of [...BtnSlider]) circle.classList.remove("select");
            for(let i of [...images]) this.animate(i.querySelectorAll(".text *"),true);
            for(let img of [...images]) img.style.transform = `translateX(-${longX}%)`;
 
            longX = 100;
 
            imgActual = 0;
            BtnSlider[imgActual].classList.add("select");
            this.animate(images[imgActual++].querySelectorAll(".text *"));
         }
 
      }, this.time * 1000);
   }
}

var Servicios = {
   draw : {
      canvas : () => document.querySelector("#effect-arc"),
      correction_size : function(){
         let styles = getComputedStyle(this.canvas());
         let w = styles.width.split("px")[0];
         let h = styles.height.split("px")[0];

         this.canvas().width = w;
         this.canvas().height = h;

         return this.canvas().getContext("2d");
      },
      size : function(){
         return { w : this.canvas().width , h : this.canvas().height }
      },
      draw_arc : function(){
         let ctx = this.correction_size();
         ctx.beginPath();
         ctx.moveTo(0,0);
         ctx.bezierCurveTo(this.size().w * 0.25,this.size().h,this.size().w * 0.75,this.size().h,this.size().w,0);
         ctx.lineTo(this.size().w,this.size().h);
         ctx.lineTo(0,this.size().h);
         ctx.lineTo(0,0);
         ctx.fillStyle = "#fff";
         ctx.fill();
      }
   }
}

var Images = {
   element : () => document.querySelector(".main-content .content-galery"),
   modalPhotos : () => document.querySelector(".photo-screen"),
   icons : () => document.querySelectorAll(".main-content .content-galery .image .icon"),
   images : () => document.querySelectorAll(".main-content .content-galery .image"),
   CreateIcon : function(i){
      let icon = document.createElement("div");
      icon.classList.add("icon");
      icon.innerHTML = `<i class="${i} fa-2x" id="icon-draw"></i>`
      return icon;
   },
   CreateImage : function(src){
      var img = new Image();
      img.src = src;
      img.classList.add("img-view");
      return img;
   },
   AddImage : async function(){
      const request = await fetch("getImages");
      const data = await request.json();

      for(let e of data){
         let div_image = document.createElement("div");
         let img = this.CreateImage(e.path_image);

         img.onload = (ev)=>{
            let icon = this.CreateIcon("fa fa-camera");

            div_image.classList.add("image");

            div_image.appendChild(img);
            div_image.appendChild(icon);

            this.element().appendChild(div_image);
         }
      }
   },
   ViewImage : function(){
      let images = this.images();
      let icons = this.icons();
      let photo = this.modalPhotos();

      [...icons].forEach( (v,i) => {
         v.addEventListener("click", ev => {
            console.log("hola");
            document.body.style.overflow = "hidden";
            photo.style.visibility = "visible";
            photo.style.opacity = "1";
      
            let content_image = this.modalPhotos().querySelector(".image-screen .img-view");
            let pathImage = images[i].querySelector("img");
            content_image.src = pathImage.src;
            content_image.onload = function(e){
               e.target.style.opacity = 1;
            }
         })
      })
   },
   CloseImage : function(){ 

      let photo = this.modalPhotos();   
      let close_image = this.modalPhotos().querySelector(".btn-close");
      
      close_image.addEventListener("click",()=>{
         document.body.style.overflow = "auto";
         photo.style.visibility = "hidden";
         photo.style.opacity = "0"; 
      })

   },
   init : function(){
      this.AddImage();
      this.ViewImage();
      this.CloseImage();
   }
}

var Franquicias = {
   items : () => document.getElementsByClassName("container-list"),
   header : () => document.getElementsByClassName("header"),
   body : () => document.getElementsByClassName("content-body"),
   icon : () => document.getElementsByClassName("icon"),
   hide : function(e,index) {
     e.style.display = "none";
     this.header()[index].style.color = "rgb(80,80,80)";
     //this.icon()[index].className = "fa fa-plus";
   },
   show : function(e,index) {
     e.style.display = "block";
     this.header()[index].style.color = "rgb(230,60,90)";
     //this.icon()[index].className = "fa fa-minus";
   },
   hideAll : function() {
     Array.from(this.items()).forEach( ( item , index) => this.hide(this.body()[index],index) );
   },
   showItem : function() {
     Array.from(this.header()).forEach( ( header , index ) => {
       var state = true;
       var body = this.body()[index - 1];
       header.onclick = () => {
         if(state) this.show(body,index);
         else  this.hide(body,index);
         state = !state;
       }
     });
   },
   init : function(){
     this.showItem();
     this.hideAll();
   }
}

var Header_scroll = {
   main_app : () => document.querySelector(".main-app"),
   header : () => document.querySelector(".main-header"),
   option_i : () => document.querySelector(".main-header .internal-list"),
   scroll : function() {
      let option = this.option_i();
      let divHeader = this.header();
      let divMain = this.main_app();

      if(scrollY != 0){
         option.style.top = "70px";
         divHeader.style.height = "70px";
         divMain.style.padding = "70px 0 0 0";
      }else{
         option.style.top = "90px";
         divHeader.style.height = "90px";
         divMain.style.padding = "90px 0 0 0";
      }
   },
   active_menu : false,
   actions_responsive_menu : {
      create: function(){
         var men = document.querySelector(".menu-responsive");
         men.style.visibility = "visible";
         men.style.opacity = "1";
         var menu = men.querySelector(".menu-responsive-header");
         menu.style.left = "0%";
         document.body.style.overflow = "hidden";
      },
      delete: function(){
         var men = document.querySelector(".menu-responsive");
         var menu = men.querySelector(".menu-responsive-header");
         menu.style.left = "-100%";
         var time = getComputedStyle(menu).transitionDuration.split("s")[0].split(".")[1];
         setTimeout( ()=>{
            document.body.style.overflow = "auto";
            men.style.visibility = "hidden";
            men.style.opacity = "0";
         }, time * 100)
      }
   },
   responsive_menu : function(){
      let icon_menu = document.querySelector("#icon-header-menu");

      icon_menu.addEventListener("click", () => {
         if(!this.active_menu) this.actions_responsive_menu.create();
         else this.actions_responsive_menu.delete();

         this.active_menu = !this.active_menu;
      })
   },
   resize_menu_responsive : function(){
      var menu = document.querySelector(".menu-responsive-header");
      if(innerWidth >= 1000 && menu != undefined){
         this.actions_responsive_menu.delete();
         this.active_menu = !this.active_menu;
      }
   },
   init: function(){
      this.responsive_menu();
      window.onscroll = () => this.scroll();
      window.onresize = () => this.resize_menu_responsive();
   }
}

var Header_Link_Selected = {
   links : () => document.querySelectorAll('header ul.list > .option > a.link'),
   selected : function() {
      var link = location.href;
      if(link.indexOf("#") !== -1) linkSelected =  link.substring(0,link.indexOf("#") );
      else linkSelected = link;

      Array.from(this.links()).forEach( function(link,index) {
         if ( linkSelected.indexOf( link.getAttribute("href") ) !== -1 )  {
            link.nextElementSibling.style.width = "100%";
         }
      });
   },
   init : function(){
      this.selected();
   }
}

var Aside = {
   arr_video : ["view/assets/video/wolf.mp4","view/assets/video/wolf.mp4"],
   play : false,
   base : () => document.querySelector(".container-video"),
   controls : () => document.querySelector(".container-video .controls"),
   video : () => document.querySelector(".container-video #video"),
   buttons : function(){
      let base = this.base();
      return {
         play : base.querySelector("#play"),
         left : base.querySelector("#left"),
         right : base.querySelector("#right")
      }
   },
   action_play : function(){
      let video = this.video();
      let buttons = this.buttons();
      buttons.play.addEventListener("click",() => {
         if(!this.play){
            buttons.play.innerHTML = `<i class="fa fa-pause-circle fa-3x"></i>`;
            video.play();
         }else{
            buttons.play.innerHTML = `<i class="fa fa-play-circle fa-3x"></i>`;
            video.pause();
         }
         this.play = !this.play;
      })
   },
   action_change_video : function(){
      let buttons = this.buttons();
      let video = this.video();
      let change = this.base().querySelector("#video-change");
      let index_video = 0;
      buttons.left.addEventListener("click",() => {
         if(index_video > 0){
            buttons.play.innerHTML = `<i class="fa fa-play-circle fa-3x"></i>`;
            this.play = false;
            change.src = this.arr_video[--index_video];
            video.load();
         }
      });
      buttons.right.addEventListener("click",() => {
         if(index_video < this.arr_video.length - 1){
            buttons.play.innerHTML = `<i class="fa fa-play-circle fa-3x"></i>`;
            this.play = false;
            change.src = this.arr_video[++index_video];
            video.load();
         }
      });
   }
}

window.addEventListener("load", ev =>{
   const url = window.location.href.split("/");
   const page = url[url.length-1];

   const loader = document.querySelector(".fist-loading");
   setTimeout(() => document.body.removeChild(loader),500);

   if(page != "admin" && page != "login"){
      Header_Link_Selected.init();
      Header_scroll.init();
   }

   if(page == "home"){
      Aside.action_play();
      Aside.action_change_video();
   }

   switch(page){
      case "home":
         Slider.init();
         break;
      case "galery":
         Images.init();
         break;
      case "nosotros":
         break;
      case "profile":
         break;
      case "franquicias":
         Franquicias.init();
         break;
      case "servicios":
         Servicios.draw.draw_arc();
         this.window.addEventListener("resize", () => servicios.draw.draw_arc());
         break;
      case "contact":
         break;
   }
})