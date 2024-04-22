function load_about() {
    document.getElementById("page-wrapper").innerHTML = '<object type="text/html" data="About.aspx" onload="resizeIframe(this)"></object>';
}

  function resizeIframe(obj) {
      obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }
