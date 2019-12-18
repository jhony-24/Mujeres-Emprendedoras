var servicios = {
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