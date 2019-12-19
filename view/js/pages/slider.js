/*window.onload = function() {

  var views = document.querySelectorAll('#view-slider > div');
  var contentBullet = document.getElementById('bullets-slider');
  var contentSlider = document.getElementById('view-slider');
  var lenViews = views.length;
  var maxScrollWidth = contentSlider.scrollWidth;

  var slider = {
      click : function( nameBtn , callable ){
        document.getElementById(nameBtn).addEventListener('click' , callable);
      },
      moveLeft : function(callable) {
        this.click('btn-slider-to-left',callable);
      },
      moveRight: function(callable) {
        this.click('btn-slider-to-right',callable);
      },
      createBullets : function() {
        bullets  = [];
        for (let i = 0; i < lenViews ; i++ )  bullets[i] = '<li class="bullet"></li>';
        contentBullet.innerHTML = bullets.join('');
      },
      viewActive : function(activeView,notActive) {
        views.forEach(function(view,index) {
          view = view.classList;
          if(slider.stepView == index) {
            view.add('active-view','transition-check');
            activeView();
          } else {
            view.remove('active-view','transition-check');
            notActive();
          }
        });
      },
      bulletActive : function () {
        var allBullets = contentBullet.getElementsByClassName('bullet');
        var active = 'active-bullet';
        [...views].forEach(function(view,index) {
            bullet = allBullets[index];
            (view.getAttribute('class').includes('active-view')) ? bullet .classList.add(active) : bullet.classList.remove(active);
        });
      },
      move : function (type,callable) {
          var interval = setInterval(run,1);
          function run() {
            var widthDefault = slider.size.widthView * slider.stepView;
            var c;
            if (type=="right") c = contentSlider.scrollLeft >= widthDefault;
            else if (type=="left") c = contentSlider.scrollLeft <= widthDefault;

            if (c) {
              clearInterval(interval);
              contentSlider.scrollLeft = widthDefault;
              slider.viewActive(function(){},function(){});
              slider.bulletActive();
            }
            else {
              contentSlider.scrollLeft = (slider.position += ( type == "right" ? 1 : -1 ) * slider.step);
            }
          }
          if(type=="right") slider.stepView++;
          else if(type=="left") slider.stepView--;
          if(typeof callable != "undefined") callable();
      }
  };

  slider.position = 0;
  slider.step = 10;
  slider.stepView = 0;

  slider.size = {
    scrollWidth : maxScrollWidth,
    widthView : maxScrollWidth / views.length
  };



  slider.createBullets();
  slider.bulletActive();


  if(window.innerWidth < 800) {
    views.forEach( function( view , index) {
      view.classList.add("active-view","transition-check");
    });

    var bullets = document.getElementsByClassName("bullet");

    Array.from(bullets).forEach(function( bullet , index) {
      bullet.onclick = function() {
        var maximun = index * slider.size.widthView;
        contentSlider.scrollLeft = maximun;
        for(var i = 0 ; i < bullets.length; i++) {
          if(i == index) {
            this.classList.add("active-bullet");
          }else{
            bullets[i].classList.remove("active-bullet");
          }
        }
      };
    });
    contentSlider.onscroll = function() {
      Array.from(bullets).forEach(function( bullet , index) {
        var maximun = index * slider.size.widthView;
          if(contentSlider.scrollLeft == maximun) {
            bullet.classList.add("active-bullet");
            for(var i = 0 ; i < bullets.length ; i++) {
              if(i != index ){
                bullets[i].classList.remove("active-bullet");
              }
            }
          }
      });
    };

  }

  slider.moveLeft(function(){
    if(slider.stepView == 0 ) return;
    slider.move("left");
  });

  slider.moveRight(function(){
    if(slider.stepView == views.length - 1 ) return;
    slider.move("right");
  });
};
*/

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