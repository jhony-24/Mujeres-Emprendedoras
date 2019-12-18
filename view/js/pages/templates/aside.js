window.addEventListener("load",()=>{
   const url = window.location.href.split("/");
   const page = url[url.length-1];
   const aside = Aside();

   if(page == "home"){
      aside.testimonial.change_data(0);
      aside.testimonial.method();      
   }

   if(page == "home" || page == "galery" || page == "nosotros"){
      aside.video.action_play();
      aside.video.action_change_video();
   }
})