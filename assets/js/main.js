(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;
    const logo = document.querySelector(".navbar-brand img");

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    // === logo change
    if (ud_header.classList.contains("sticky")) {
      logo.src = "assets/images/logo/logo.png"; //logo-2.svg
    } else {
      logo.src = "assets/images/logo/logo.png"; //logo.svg
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  //===== close navbar-collapse when a  clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".ud-menu-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("show");
  });

  // ===== submenu
  const submenuButton = document.querySelectorAll(".nav-item-has-children");
  submenuButton.forEach((elem) => {
    elem.querySelector("a").addEventListener("click", () => {
      elem.querySelector(".ud-submenu").classList.toggle("show");
    });
  });

  // ===== wow js
  new WOW().init();

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };

  /**********************************/

  window.saveDraft = function(){
    var myForm = document.getElementById("myForm");
    var vals = myForm.querySelectorAll('input, textarea');
    
    var items = {};
    for(var v of vals) {
      if(v.value !== ''){
        items[v.id] = v.value;
      }
    }

    localStorage.setItem('savedDraft', JSON.stringify(items));
    console.log("Draft saved");
  }
  
  function validateNodes(inputs){
	  
	  for(var i of inputs){
		  if(i.value.trim() === ''){
			return false;  
			alert("Falta llenar campos")
		  }
	  }
	  
	  alert("OK!")
	  return true;
  }
  
  window.validateForm = function(e){
	var myForm = document.getElementById("myForm");
	var vals = myForm.querySelectorAll('input, textarea');
	
	for(var v of vals) {
      if(v.value === ''){
        alert(`Falta completar el campo ${v.name}`);
		    return false;
      }
    }
	  
	  return true;
  }
	
  //Saved Draft	
  window.addEventListener('DOMContentLoaded', function () {
    var saved = localStorage.getItem('savedDraft');
    if(saved){
      var myForm = document.getElementById("myForm");
      var obj = JSON.parse(saved);

      for(var v in obj){
        var element = myForm.querySelector(`#${v}`);
        element.value = obj[v];
      }
    }    
    });

  //Provincias & Localidades Select  
  const urlApi = "https://apis.datos.gob.ar/georef/api";			// const urlApi = "https://localhost:5001";  	const urlApi = "C:\Users\Yo\OneDrive\Escritorio\play-bootstrap\ProvAndLocal.sql";  

// Opciones para las peticiones fetch a la API
const opt = {
    method: 'GET', // Método de la petición (GET)
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
        Authorization: '' // Bearer apikey    
    }
};	
	
 const urlProvincias = `${urlApi}/provincias`, opt;						//	const urlProvincias = `${urlApi}/api`;
 // const urlLocalidades = `${urlApi}/provincias/id/localidades`; 	 const urlLocalidades = `${urlApi}/api/characters`;
	
  window.addEventListener('DOMContentLoaded', function (){

		var select = document.querySelector("#provincias-select");
		
			fetch(urlProvincias).then(r => r.json()).then(result => {	//	fetch(urlapi).then(r => r.json()).then(result => {	

			for(var kv of result){			
				var option = document.createElement("option");
				option.text = kv.provincias;
				option.value = kv.id;		
				select.appendChild(option);
			}
		});
		
		/*
		select.addEventListener("change", (event) => {
			var valueSelected = select.value;
			var localidadesSelect = document.querySelector("#localidades-select");

			if(valueSelected)
			{	
				//Remove all values
				for (const option of document.querySelectorAll('#localidades-select > option')) {
					option.remove();
				}
				
				//Fetch localidades
				var urlLocalidad= urlLocalidades.replace("id", valueSelected);
				fetch(urlLocalidad).then(r => r.json()).then(result => { 
				
					var option = document.createElement("option");
					option.text = "Seleccione una opción";
					option.value = "";	
					localidadesSelect.appendChild(option);
					
					for(var kv of result){
						var option = document.createElement("option");
						option.text = kv.localidad;
						option.value = kv.id;		
						localidadesSelect.appendChild(option);
					}
				})
			}
			else
			{
				//Remove all values
				for (const option of document.querySelectorAll('#localidades-select > option')) {
					option.remove();
				}
				
				var option = document.createElement("option");
				option.text = "Seleccione una opción";
				option.value = "";	
				localidadesSelect.appendChild(option);
			}
		}); */
	});
})();
