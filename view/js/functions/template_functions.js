const Header_scroll = function(){
   var data = {
      main_app : () => document.querySelector(".main-app"),
      header : () => document.querySelector(".main-header"),
      option_i : function(){
         return this.header().querySelector(".internal-list");
      },
      scroll : function() {
         if(scrollY != 0){
            this.option_i().style.top = "70px";
            this.header().style.height = "70px";
            this.main_app().style.padding = "70px 0";
         }else{
            this.option_i().style.top = "90px";
            this.header().style.height = "90px";
            this.main_app().style.padding = "90px 0";
         }
      },
      active_menu : false,
      actions_responsive_menu : {
         create: function(){
            var menu = document.querySelector(".menu-responsive-header");
            menu.style.left = "0%";
            document.body.style.overflow = "hidden";
         },
         delete: function(){
            var menu = document.querySelector(".menu-responsive-header");
            menu.style.left = "-100%";
            var time = getComputedStyle(menu).transitionDuration.split("s")[0].split(".")[1];
            setTimeout( ()=>{
               document.body.style.overflow = "auto";
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
      }
   }

   return data;
}

const Aside = function(){
   var aside = {
      video : {
         arr_video : ["view/assets/video/wolf.mp4","view/assets/video/wolf.mp4"],
         base : () => document.querySelector(".container-video"),
         controls : function(){
            return this.base().querySelector(".controls");
         },
         video : function(){
            return this.base().querySelector("#video");
         },
         buttons : function(){
            return {
               play : this.base().querySelector("#play"),
               left : this.base().querySelector("#left"),
               right : this.base().querySelector("#right")
            }
         },
         play : false,
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
      },
      testimonial : {
         click : false,
         data : [
            {
               perfil : "https://cdn.pixabay.com/photo/2015/07/09/00/29/woman-837156_960_720.jpg",
               testimonio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quia odit illum voluptatibus eum, iusto sunt in ex laboriosam facilis accusantium a? Non, veniam mollitia!",
               nombre : "Micaela Del Sur",
            },
            {
               perfil : "https://cdn.pixabay.com/photo/2016/07/19/10/48/girl-1527959_960_720.jpg",
               testimonio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quia odit illum voluptatibus eum, iusto sunt in ex laboriosam facilis accusantium a? Non, veniam mollitia!",
               nombre : "Serena Malpartida",
            },{
               perfil : "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg",
               testimonio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quia odit illum voluptatibus eum, iusto sunt in ex laboriosam facilis accusantium a? Non, veniam mollitia!",
               nombre : "Michael Valencia",
            }
         ],
         base : () => document.querySelector(".testimonial"),
         information : function(){
            return this.base().querySelector(".content .information")
         },
         left : function() {
            return this.base().querySelector("#left-testimonial");
         },
         right : function(){
            return this.base().querySelector("#right-testimonial");
         },
         aparecer : function(reverse = false){
            let info = this.information();
            if(!reverse){
               info.style.opacity = "0";
               info.style.top = "30px";
            }else{
               info.style.opacity = "1";
               info.style.top = "0px";
            }
         },
         change_data : function(index = 0,time = 1) {
            setTimeout( () => {
               let data = this.information().querySelectorAll("*");
               let [image,description,testigo] = data;

               image.src = this.data[index].perfil;
               description.innerHTML = this.data[index].testimonio;
               testigo.innerHTML = this.data[index].nombre;

               this.aparecer(true);
               this.click = false;

            }, time * 100)
         },
         method : function(){
            let data = this.information();
            let timing = getComputedStyle(data).transitionDuration.split("s")[0].split(".")[1];
            let d_l = this.data.length - 1;
            let contador = 0;

            this.left().addEventListener("click", () => {
               if(!this.click){
                  if(contador > 0) contador -= 1;
                  else contador = d_l;

                  this.click = true;

                  this.aparecer();
                  this.change_data(contador,timing);
               }
            });

            this.right().addEventListener("click", () => {
               if(!this.click){
                  if(contador < d_l) contador += 1;
                  else contador = 0;

                  this.click = true;

                  this.aparecer();
                  this.change_data(contador,timing);
               }

            })
         }
      }
   }

   return aside;
}

const Link_Selected = function() {

    var data = {
      links : () => document.querySelectorAll('header ul.list > .option > a.link'),
      selected : function() {
        var link = location.href;
        if(link.indexOf("#") !== -1) linkSelected =  link.substring(0,link.indexOf("#") );
        else  linkSelected = link;
        Array.from(this.links()).forEach( function(link,index) {
          if ( linkSelected.indexOf( link.getAttribute("href") ) !== -1 )  {
            link.nextElementSibling.style.width = "100%";
          }
        });
      }
    }

    data.selected();

}
