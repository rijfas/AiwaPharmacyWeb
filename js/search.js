function searchProduct(item){
  try{
    var offset = document.getElementsByClassName('navbar-fixed')[0].style.height;
    var searchElement = document.getElementById(item.replace(' ','_')); 
    window.scroll({ top: (searchElement.offsetTop - offset), left: 0, behavior: 'smooth' });
  }
  catch{

  }
}

