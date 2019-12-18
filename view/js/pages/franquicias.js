var franquicias = function() {

  var data = {
    items : () => document.getElementsByClassName("container-list"),
    header : () => document.getElementsByClassName("header"),
    body : () => document.getElementsByClassName("content-body"),
    hide : function(e) {
      e.style.display = "none";
    },
    show : function(e) {
      e.style.display = "block";
    },

    hideAll : function() {
      Array.from(this.items()).forEach( ( item , index) => {
        this.hide(this.body()[index]);
      });
    },

    showItem : function() {
      Array.from(this.header()).forEach( ( header , index ) => {
          var state = true;
          var body = this.body()[index - 1];
          header.onclick = () =>  {
            if(state) this.show(body);
            else  this.hide(body);
            state = !state;
          }
      });
    }
   }

   data.showItem();

   return data;

}


franquicias().hideAll();