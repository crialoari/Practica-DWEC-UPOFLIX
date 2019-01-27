function listarPelis(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	ocultarFormularios();
	
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col");

	var oTitulo=document.createElement("h3");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Películas";
	oColumnaDatos.appendChild(oTitulo);

	var oTabla=document.createElement("table");
	oTabla.classList.add("table");
    oTabla.classList.add("table-sm");

    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Cartel";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Título";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Puntuación";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Acciones";
    oFila.appendChild(oCelda);

    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
	var aPelis=oUpoflix.aProducciones.filter(Produccion => Produccion instanceof Peliculas);
	for(var i=0; i<aPelis.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=2;
    	var oImagen=document.createElement("IMG");
    	oImagen.src="http://es.web.img3.acsta.net/c_215_290/medias/nmedia/18/67/61/84/20063810.jpg";
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelis[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelis[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	//oCelda.appendChild(calcularPuntuacion(aPelis[i].sTitulo));
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAcciones(aPelis[i]));

    	//fila datos
    	oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=4;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaMasDatos(aPelis[i]));
	}
	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function crearAcciones(oProduccion){
	var oFormulario=document.createElement("form");
    oFormulario.dataset.produccion=oProduccion.sTitulo.replace(" ", "-");

    var oBoton=document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-sm");
    oBoton.classList.add("btn-success");
    oBoton.classList.add("mr-1");
    oBoton.value="+";
    oBoton.addEventListener("click", mostrarMasDatos);
    oFormulario.appendChild(oBoton);
    if(oUpoflix.oUsuarioActivo!=null){
		oBoton=document.createElement("INPUT");
	    oBoton.type="button";
	    oBoton.classList.add("btn");
	    oBoton.classList.add("btn-sm");
	    var aFavs=oUpoflix.oUsuarioActivo.aFavoritos.filter(Produccion => Produccion==oProduccion);
	    if(aFavs.length>0){
	    	oBoton.classList.add("btn-danger");
	    	if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", eliminarSerieFavNavegacion);
		    else
		    	oBoton.addEventListener("click", eliminarPeliFavNavegacion);
	    }else{
			oBoton.classList.add("btn-outline-danger");
	    	if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", agregarSerieFavNavegacion);
		    else
		    	oBoton.addEventListener("click", agregarPeliFavNavegacion);
	    }
	    oBoton.classList.add("mr-1");
	    oBoton.value="❤";
	    oFormulario.appendChild(oBoton);
	    if(oUpoflix.oUsuarioActivo.sRol=="admin"){
			oBoton=document.createElement("INPUT");
		    oBoton.type="button";
		    oBoton.classList.add("btn");
		    oBoton.classList.add("btn-sm");
		    oBoton.classList.add("btn-outline-dark");
		    oBoton.classList.add("mr-1");
		    oBoton.value="X";
		    if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", eliminarSerie);
		    else
		    	oBoton.addEventListener("click", eliminarPeli);
		    oFormulario.appendChild(oBoton);

			oBoton=document.createElement("INPUT");
		    oBoton.type="button";
		    oBoton.classList.add("btn");
		    oBoton.classList.add("btn-sm");
		    oBoton.classList.add("btn-outline-dark");
		    oBoton.value="edit";
		    /*if(oProduccion instanceof Serie)
		    	oBoton.addEventListener("click", editarSerie);
		    else
		    	oBoton.addEventListener("click", editarPeli);*/
		    oFormulario.appendChild(oBoton);
		}
	}
    return oFormulario;
}

function eliminarPeli(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	alert(oUpoflix.bajaProduccion(sTitulo.replace("-", " ")));
	listarPelis();
}

function eliminarPeliFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	alert(oUpoflix.eliminarFavorito(sTitulo.replace("-", " ")));
	listarPelis();
}

function agregarPeliFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	alert(oUpoflix.añadirFavorito(sTitulo.replace("-", " ")));
	listarPelis();
}

function listarSeries(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	ocultarFormularios();
	
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col");

	var oTitulo=document.createElement("h3");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Series";
	oColumnaDatos.appendChild(oTitulo);

	var oTabla=document.createElement("table");
	oTabla.classList.add("table");
    oTabla.classList.add("table-sm");

    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Cartel";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Título";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Puntuación";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Temporadas";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Acciones";
    oFila.appendChild(oCelda);

    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);

	var aSeriesFav=oUpoflix.aProducciones.filter(Produccion => Produccion instanceof Serie);
	for(var i=0; i<aSeriesFav.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=3;
    	var oImagen=document.createElement("IMG");
    	oImagen.src="http://es.web.img3.acsta.net/c_215_290/medias/nmedia/18/67/61/84/20063810.jpg";
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aSeriesFav[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aSeriesFav[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	//oCelda.appendChild(calcularPuntuacion(aSeriesFav[i].sTitulo));
    	oCelda = oFila.insertCell(-1);
    	var oBoton=document.createElement("INPUT");
   		oBoton.type="button";
    	oBoton.classList.add("btn");
    	oBoton.classList.add("btn-sm");
    	oBoton.classList.add("btn-outline-warning");
    	oBoton.classList.add("mr-1");
    	oBoton.dataset.produccion=aSeriesFav[i].sTitulo;
    	oBoton.value=aSeriesFav[i].aTemporadas.length;
    	oBoton.addEventListener("click", mostrarTemporadas);
    	oCelda.appendChild(oBoton);
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAcciones(aSeriesFav[i]));

    	//fila datos
    	oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=5;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaMasDatos(aSeriesFav[i]));

		//fila temporadas
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=5;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaTemporadas(aSeriesFav[i]));
	}

	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function eliminarSerie(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	alert(sTitulo);
	alert(oUpoflix.bajaProduccion(sTitulo.replace("-", " ")));
	listarSeries();
}

function eliminarSerieFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	alert(oUpoflix.eliminarFavorito(sTitulo.replace("-", " ")));
	listarSeries();
}

function agregarSerieFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	alert(oUpoflix.añadirFavorito(sTitulo.replace("-", " ")));
	listarSeries();
}

function buscar(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	alert("buscar buscar");
}