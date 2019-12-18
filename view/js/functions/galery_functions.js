async function data_images(){
   var data = await fetch("ajaxImage");
   var json = await data.json();
   return json;
}

function add_images(js,name_category = "all"){
   var element = document.querySelector(".main-content .content-galery");
   var image_index = 0;
   element.innerHTML = "";

   js.forEach( (v,i) => {
      v.event.forEach( arr_event => {

         if(arr_event == name_category){
            var template = `<div class="image">
               <div class="loader"></div>
            </div>`;
            var image = new Image();
            image.src = v.link;
            image.classList.add("img-view");
            image.addEventListener("load",function(){
               var img = element.querySelectorAll(".image")[image_index];

               img.innerHTML = "";
               img.appendChild(image);
               img.innerHTML += `<div class="icon"><i class="fa fa-camera fa-2x"></i></div>`;

               var img_icon = element.querySelectorAll(".image");
               image_function(img_icon,image_index++);

            });

            element.innerHTML += template;
         }
      })

   });
}

function image_function(img,index)
{
   var view = img[index].querySelector(".img-view");
   img[index].addEventListener("click",()=>{
      let modal_image = document.querySelector(".photo-screen");
      let m_img = modal_image.querySelector("#img .img-view");

      m_img.src = view.src;
      modal_image.style.display = "flex";
      document.body.style.overflow = "hidden";
   })
}

function view_image_galery(type){
   var data = data_images();

   var images = [];

   data.then( v => {
      images = v;
      add_images(images,type);
   })

   let btn_close = document.querySelector("#btn-close");

   btn_close.addEventListener("click",()=>{
      let doc = document.querySelector(".photo-screen");
      document.body.style.overflow = "auto";
      doc.style.display = "none";
   })
}
