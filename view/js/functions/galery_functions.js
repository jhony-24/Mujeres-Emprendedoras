var Images = {
   element : () => document.querySelector(".main-content .content-galery"),
   modalPhotos : () => document.querySelector(".photo-screen"),
   CreateIcon : function(i){
      let icon = document.createElement("div");
      icon.classList.add("icon");
      icon.innerHTML = `<i class="${i} fa-3x" id="icon-draw"></i>`
      return icon;
   },
   CreateImage : function(src){
      var img = new Image();
      img.src = src;
      img.classList.add("img-view");
      return img;
   },
   AddImage : function(data){

      let arr = data.filter( (v,i) => i < 8 );

      arr.forEach( e => {

         let div_image = document.createElement("div");
         let img = this.CreateImage(e.link);

         img.onload = (ev)=>{

            let icon = this.CreateIcon("fa fa-camera");

            div_image.classList.add("image");

            div_image.appendChild(img);
            div_image.appendChild(icon);

            this.element().appendChild(div_image);

            icon.addEventListener("click",(ev) => { this.ViewImage(img.src); })
         }

      })

   },
   ViewImage : function(pathImage){

      let photo = this.modalPhotos();

      document.body.style.overflow = "hidden";
      photo.style.visibility = "visible";
      photo.style.opacity = "1";

      let content_image = this.modalPhotos().querySelector(".image-screen .img-view");
      content_image.src = pathImage;
      content_image.onload = function(ev){
         ev.target.style.opacity = 1;
      }

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
    
      fetch("ajaxImage")
         .then( r => r.json() )
         .then( v => this.AddImage(v))

      this.CloseImage();

   }
}