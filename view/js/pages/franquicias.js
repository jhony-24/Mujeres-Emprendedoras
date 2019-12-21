var franquicias = function() {

  var data = {

    items : () => document.getElementsByClassName("container-list"),
    header : () => document.getElementsByClassName("header"),
    body : () => document.getElementsByClassName("content-body"),
    icon : () => document.getElementsByClassName("icon"),

    hide : function(e,index) {
      e.style.display = "none";
      this.header()[index].style.color = "rgb(80,80,80)";
      //this.icon()[index].className = "fa fa-plus";
    },
    show : function(e,index) {
      e.style.display = "block";
      this.header()[index].style.color = "rgb(230,60,90)";
      //this.icon()[index].className = "fa fa-minus";
    },

    hideAll : function() {
      Array.from(this.items()).forEach( ( item , index) => {
        this.hide(this.body()[index],index);
      });
    },

    showItem : function() {
      Array.from(this.header()).forEach( ( header , index ) => {
          var state = true;
          var body = this.body()[index - 1];
          header.onclick = () => {
            if(state) this.show(body,index);
            else  this.hide(body,index);
            state = !state;
          }
      });
    }
   }

   data.showItem();

   return data;

}


franquicias().hideAll();
