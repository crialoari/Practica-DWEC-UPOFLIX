function mostrarPelisFavoritas(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	ocultarFormularios();
	
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col");

	var oTitulo=document.createElement("h3");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Películas favoritas";
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
    oCelda.textContent = "Puntuar";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Acciones";
    oFila.appendChild(oCelda);

    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
	var aPelisFav=oUpoflix.oUsuarioActivo.aFavoritos.filter(Produccion => Produccion instanceof Peliculas);
	for(var i=0; i<aPelisFav.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=2;
    	var oImagen=document.createElement("IMG");
    	oImagen.src="http://es.web.img3.acsta.net/c_215_290/medias/nmedia/18/67/61/84/20063810.jpg";
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelisFav[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelisFav[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	//oCelda.appendChild(crearPuntuar(aPelisFav[i].sTitulo));
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAccionesFav(aPelisFav[i].sTitulo));

    	//fila datos
    	oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=4;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaMasDatos(aPelisFav[i]));
	}
	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function mostrarSeriesFavoritas(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	ocultarFormularios();

	var aSeriesFav=oUpoflix.oUsuarioActivo.aFavoritos.filter(Produccion => Produccion instanceof Serie);
	for(var i=0; i<aSeriesFav.length;i++){
		alert(aSeriesFav[i].sTitulo);
	}
}

function crearPuntuar(sTitulo){
	var oFormulario=document.createElement("form");
    oFormulario.dataset.produccion=sTitulo;
}

function crearAccionesFav(sTitulo){
	var oFormulario=document.createElement("form");
    oFormulario.dataset.produccion=sTitulo.replace(" ", "-");

    var oBoton=document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-sm");
    oBoton.classList.add("btn-success");
    oBoton.classList.add("mr-1");
    oBoton.value="+";
    oBoton.addEventListener("click", mostrarMasDatos);
    oFormulario.appendChild(oBoton);

	oBoton=document.createElement("INPUT");
    oBoton.type="button";
    oBoton.classList.add("btn");
    oBoton.classList.add("btn-sm");
    oBoton.classList.add("btn-danger");
    oBoton.classList.add("mr-1");
    oBoton.value="❤";
    oBoton.addEventListener("click", eliminarPeliFavUsuario);
    oFormulario.appendChild(oBoton);
    return oFormulario;
}

function crearCapaMasDatos(oPelicula){
	var oCapaDatos=document.createElement("div");
    oCapaDatos.id=oPelicula.sTitulo.replace(" ", "-");
    oCapaDatos.classList.add("d-none");
    
    var oResumen=document.createElement("p");
    oResumen.textContent=oPelicula.sresumen;
   	oCapaDatos.appendChild(oResumen);
    
    var oLista=document.createElement("ul");
    for(var j=0; j<oPelicula.aActores.length;j++){
    	var actor=document.createElement("li");
    	actor.textContent=oPelicula.aActores[j];
    	oLista.appendChild(actor);
    }
	for(var j=0; j<oPelicula.aDirectores.length;j++){
    	var director=document.createElement("li");
    	director.textContent=oPelicula.aDirectores[j];
    	oLista.appendChild(director);
    }
    oCapaDatos.appendChild(oLista);

   	oLista=document.createElement("ul");
    oLista.classList.add("list-inline");
	for(var j=0; j<oPelicula.aPaises.length;j++){
    	var pais=document.createElement("li");
    	pais.classList.add("list-inline-item");
    	var sTexto=document.createElement("em");
    	sTexto.textContent=oPelicula.aPaises[j];
    	pais.appendChild(sTexto);
    	oLista.appendChild(pais);
    }
	oCapaDatos.appendChild(oLista);

	var oAnio=document.createElement("p");
	oAnio.textContent=oPelicula.iAñoEstreno;
	oCapaDatos.appendChild(oAnio);
	return oCapaDatos;
}

function mostrarMasDatos(oEvento){
	var oE = oEvento || window.event;
	var sPelicula=oE.target.parentElement.dataset.produccion;
	document.querySelector("div#"+sPelicula).classList.toggle("d-none");
}

function eliminarPeliFavUsuario(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	alert(oUpoflix.eliminarFavorito(sTitulo.replace("-", " ")));
	mostrarPelisFavoritas();
}

function eliminarSerieFavUsuario(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	alert(oUpoflix.eliminarFavorito(sTitulo.replace("-", " ")));
	mostrarSeriesFavoritas();
}