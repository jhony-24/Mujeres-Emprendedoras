var slider = {
  time : 8,
  element : () => document.querySelector(".slider"),
  animate : function(elements,origin = false) {
     //Remueve o agrega la animacion
     if(!origin){
        for(let i of elements){
           i.classList.add("animate");
        }         
     }
     else
     {
        for(let i of elements){
           i.classList.remove("animate");
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

window.onload = () =>{
  slider.init();
}