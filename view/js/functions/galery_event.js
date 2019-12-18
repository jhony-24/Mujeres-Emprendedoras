const eventos = async function(){
   var data = await fetch("view/js/json/galery_events.json");
   var json = await data.json();
   return json;
}

var path = {
   element : () => document.querySelector(".central-content"),
   url : () => window.location.href.split("/"),
   name_event : function(){
      return this.url()[this.url().length - 1];
   },
   change_data : function(){
      eventos().then(event => {
         let image = this.element().querySelector(".image");
         let title = this.element().querySelector(".text .title .t");
         let description = this.element().querySelector(".text .title .tp");
         let subtitle = this.element().querySelector(".text .pre-title .sub");

         for(let ev of event){
            if(ev.name_link_url == this.name_event()){
               image.style.backgroundImage = `url("${ev.image_link_event}")`;
               title.innerHTML = ev.title_event;
               subtitle.innerHTML = ev.subtitle_event;
               description.innerHTML = ev.description_event;
               break;
            }
         }
      })
   }
}
