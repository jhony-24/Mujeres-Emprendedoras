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
