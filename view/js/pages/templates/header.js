window.addEventListener("load", ()=> {
  const loader = document.querySelector(".fist-loading");
  setTimeout(() => {
    document.body.removeChild(loader);
  },1000);

  Link_Selected();

  const obj = Header_scroll();
  obj.responsive_menu();

  window.onscroll = () => obj.scroll();
  window.onresize = () => obj.resize_menu_responsive();

});
