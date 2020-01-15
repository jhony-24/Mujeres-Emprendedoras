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

var Events = {
   events : () => document.querySelector(".container-events"),
   loadEvents : async function() {
      const request = await fetch(`index.php?url=RequestEvents`);
      const response = await request.json();
      const data = response;
      
      this.events().innerHTML = "";
      data.forEach((event,index)=>{
         this.events().innerHTML += `
         <div class="card">
            <div class="header">
               <img class="img-head" src="${event.path_image}" alt="">
            </div>
            <div class="body">
               <p class="title">${event.title_event}</p>
               <p class="message">${event.text_event}</p>
            </div>
         </div>
         `;
      });

   },
   init : function() {
      this.loadEvents();
   }
}

var Login = {
   form : () => document.querySelector("#form-login"),
   actionLogin : function(){
      const form = this.form();
      form.addEventListener("submit",async ev => {
         ev.preventDefault();

         let submit = form.querySelector("input[type='submit']");
         const data = new FormData(form);
         submit.disabled = true;

         const headers = {
            method : "POST",
            body : data
         }

         const request = await fetch("index.php?url=LoginRequest",headers);
         const response = await request.text();

         if(response == "true"){
            window.location = "admin";
         }else if(response == "false"){
            submit.disabled = false;
            alert("Usuario o Contraseña incorrecta");
         }

      });
   },
   init : function(){
      this.actionLogin();
   }
}

var Admin = {
   title : () => document.querySelector('.title-dynamic'),
   btnAddPublication : () => document.getElementById('add-publication'),
   formButtonClose : () => document.getElementById("btn-cancel-publication"),
   formButtonImageClose : () => document.getElementById('btn-cancel-publication-image'),
   formPublication : () => document.getElementById('publication-upload'),
   formImage : () => document.getElementById('image-upload'),
   publications : () => document.querySelector('#content-publications'),
   inputSearch : () => document.querySelector('.input-search'),
   btnUploadImage : () => document.querySelector('.btn-upload-new-image'),
   buttonsChangeViewPublication : () => document.querySelectorAll(".btn-change-publication"),
   toggleForm : function() {
      
      var style = "toggle";

      function toggleFormInteractive({ form , childFormId , buttonOpen , buttonClose  }) {
         var f = form;
         let add = f.querySelector(childFormId);
         let preview = f.querySelector(".preview-image");
         buttonOpen.addEventListener('click', ev => {
              f.classList.remove(style);
              add.classList.remove(style);
              document.body.style.overflow = "hidden";
         });
         buttonClose.addEventListener("click", ev => {
             f.classList.add(style);
             add.classList.add(style);
             preview.innerHTML = "";
             document.body.style.overflow = "auto";
         });
      }
      
      toggleFormInteractive({
         form:this.formPublication(),
         childFormId: "#form-insert-publication",
         buttonOpen: this.btnAddPublication(),
         buttonClose: this.formButtonClose()
      });

      toggleFormInteractive({
         form:this.formImage(),
         childFormId: "#form-insert-image",
         buttonOpen: this.btnUploadImage(),
         buttonClose: this.formButtonImageClose()
      })

  },
  deleteImage : function() {
   const btn = document.querySelectorAll('.btn-delete-image');
   const self = this;
   btn.forEach(button => {
      button.addEventListener('click',ev => {
         var body = new FormData();
         body.append("id_photo",ev.currentTarget.id);
         var headers = {
            method : "POST",
            body : body
         }
         if(confirm("Deseas eliminar la imagen?")){
            fetch("index.php?url=DeleteImage",headers).then(r=>r.text()).then(request=>{
               if(request == "true") {
                  self.loadImages();
                  console.clear();
               }
               else {
                  alert("no se puede eliminar esta imagen");
               }
            });
         }
      });
   });
  },
  addImage : function() {
      let form = this.formImage().querySelector("#form-insert-image");
      let picture = this.formImage().querySelector("[name='image']");
   
      picture.addEventListener('change', ev => {
         var preview  = this.formImage().querySelector('.preview-image');
         var reader = new FileReader();
         reader.onload = e => {
            preview.innerHTML = `
                 <img src="${e.target.result}"/>
                 <p class="name-image">${ev.target.files[0].name}</p>
                 `;
         };
         reader.readAsDataURL(ev.target.files[0]);
      });

      form.addEventListener("submit", async ev => {
         ev.preventDefault();

         const dataForm = new FormData(form);
         const headers = {
            method : "POST",
            body : dataForm
         };

         let inputs = form.querySelectorAll(".text-field");
         let submit = form.querySelector("input[type='submit']");
         submit.disabled = true;

         const requestData = await fetch("index.php?url=AdminCreateImage",headers);
         const response = await requestData.text();
         
         switch(response){
            case "true":
               alert("Imagen Subida");
               window.location.reload();
               break;
            case "false":
            case "ErrorUpload":
               alert("Ocurrio un error al subir la imagen...");
               submit.disabled = false;
               break;
            case "NoImage":
               alert("El archivo ingresado no es una Imagen");
               submit.disabled = false;
               break;   
         }

      })

  },
  loadImages : async function() {

   const request = await fetch("index.php?url=RequestImages");
   const response = await request.json();
   const divPublications =  this.publications();

   divPublications.classList.add("grid-images");
   divPublications.innerHTML = "";
   response.forEach(image=>{
      divPublications.innerHTML += `
         <div class="image-published">
            <img class="image" src="${image.path_image}" alt=""/>
            <button class="btn-delete-image" id="${image.id_photo}">
               <i class="fa fa-trash-alt"></i>
               <span role="tooltip" class="delete-tooltip">eliminar</span>
            </button>
         </div>
      `;
   });
   this.title().innerHTML = "Imagenes subidas";
   this.btnUploadImage().classList.remove('hidden');
   this.deleteImage();

  },
   loadEvents : async function(title = null) {
      var pathRequest;
      if(title == null ) pathRequest = "index.php?url=RequestEvents";
      else pathRequest = "index.php?url=SearchByTitle&title=" + title;

      const request = await fetch(pathRequest);
      const response = await request.json();
      const divPublications = this.publications();

      divPublications.classList.remove('grid-images');
      divPublications.innerHTML = "";
      if(response.length > 0){

         response.forEach(v => {
            divPublications.innerHTML += `<div class="card-published">
               <div class="container-image">
                     <img src="${v.path_image}" alt="image" />
               </div>
               <div class="container-details">
                  <div class="text">
                     <p class="dark">${v.title_event}</p>
                     <p class="text-publication">${v.text_event}</p>
                  </div>
               </div>
               <div class="container-options">
                  <p class="date">${v.date_create}</p>
                  <button id="${v.id_event}" class="delete delete-event">Eliminar</button>
               </div>
            </div>`;
         });
         this.title().innerHTML = "Eventos publicados";
         this.btnUploadImage().classList.add('hidden');
         this.deleteEvent();
      }
   },
   searchByTitle : function() {
      this.inputSearch().addEventListener('keyup', ev => {
         this.loadEvents(this.inputSearch().value,true);
      });
   },
   renderViews : {
      events : () => Admin.loadEvents(),
      images : () => Admin.loadImages()
   },
   changeViewPublication : function() {
      this.buttonsChangeViewPublication().forEach( button => {
         button.addEventListener('click',ev => (
            this.renderViews[ev.target.getAttribute("data-name").toString()]()
            )
         );
      });
   },
   deleteEvent : function() {
      const deleteEvent = document.querySelectorAll(".delete-event");
      deleteEvent.forEach(btn=> {
         btn.addEventListener('click',async ev => {
            let body = new FormData();
            body.append("id_event", ev.target.id); 
            let headers = {
               method: 'POST',
               body: body
            }

            const awaitRequest = confirm("Estas seguro de quere borrar este evento?");
            if(awaitRequest){
               const request = await fetch("index.php?url=AdminDeleteEvent",headers);
               const response = await request.text();
               
               switch(response){
                  case "deleteOk":
                     alert("El evento se elimino con exito");
                     this.loadEvents();
                     console.clear();
                     break;
                  case "deleteFail":
                  default:
                     alert("Ocurrio un error");
                     break;
               }
            }
         });
      });
   },
   logout : () => {
      const btn = document.querySelector("#logout-button");
      btn.addEventListener("click",async ev => {
         const request = await fetch("index.php?url=logout");
         const response = await request.text();
         window.location = "index.php?url=login";
      })
   },
   createEvent : function(){
         let form = this.formPublication().querySelector("#form-insert-publication");
         let picture = this.formPublication().querySelector("[name='image']");
   
         picture.addEventListener('change', ev => {
            var preview  = document.querySelector('.preview-image');
            var reader = new FileReader();
            reader.onload = e => {
               preview.innerHTML = `
                 <img src="${e.target.result}"/>
                 <p class="name-image">${ev.target.files[0].name}</p>
                 `;
            };
            reader.readAsDataURL(ev.target.files[0]);
         });
   
         form.addEventListener("submit", async ev => {
            ev.preventDefault();
   
            const dataForm = new FormData(form);
            const headers = {
               method : "POST",
               body : dataForm
            };
   
            let inputs = form.querySelectorAll(".text-field");
            let submit = form.querySelector("input[type='submit']");
            submit.disabled = true;
   
            const requestData = await fetch("index.php?url=AdminCreateEvent",headers);
            const response = await requestData.text();
            
            switch(response){
               case "true":
                  alert("Publicacion Subida");
                  window.location.reload();
                  break;
               case "false":
               case "ErrorUpload":
                  alert("Ocurrio un error al subir la imagen...");
                  submit.disabled = false;
                  break;
               case "NoImage":
                  alert("El archivo ingresado no es una Imagen");
                  submit.disabled = false;
                  break;   
            }
   
         })
   },
   init: function() {
      this.loadEvents();
      this.logout();
      this.toggleForm();
      this.searchByTitle();
      this.createEvent();
      this.addImage();
      this.changeViewPublication();
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
      case "events":
         Events.init();
         break;
      case "login":
         Login.init();
         break;
      case "admin":
         Admin.init();
         break;
   }
})