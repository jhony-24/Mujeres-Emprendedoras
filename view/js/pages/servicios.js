onload = function(){
   servicios.draw.draw_arc();
   this.window.addEventListener("resize", () => {
      servicios.draw.draw_arc();
   })
}