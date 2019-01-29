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
	var aPelis=oUpoflix.aProducciones.filter(Produccion => Produccion instanceof Pelicula);
	for(var i=0; i<aPelis.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=2;
    	var oImagen=document.createElement("IMG");
    	oImagen.src =(aPelis[i].sUrlImagen=="" ? "images/no-image.jpg" : aPelis[i].sUrlImagen);
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelis[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aPelis[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(calcularPuntuacion(aPelis[i]));
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
	if(oUpoflix.bajaProduccion(sTitulo.replace("-", " "))){
		alert("Película eliminada de recursos.");
		listarPelis();
	}else{
		alert("Error al eliminar, inténtelo de nuevo.");
	}
}

function eliminarPeliFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.eliminarFavorito(sTitulo.replace("-", " "))){
		alert("Película eliminada de favoritos");
		listarPelis();
	}else{
		alert("Error al eliminar, inténtelo de nuevo.");
	}
}

function agregarPeliFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.añadirFavorito(sTitulo.replace("-", " "))){
		alert("Película agregada a favoritos");
		listarPelis();
	}else{
		alert("Error al agregar, inténtelo de nuevo.");
	}
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

	var aSeries=oUpoflix.aProducciones.filter(Produccion => Produccion instanceof Serie);
	for(var i=0; i<aSeries.length;i++){
		//fila principal
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.rowSpan=3;
    	var oImagen=document.createElement("IMG");
    	oImagen.src =(aSeries[i].sUrlImagen=="" ? "images/no-image.jpg" : aSeries[i].sUrlImagen);
    	oImagen.style.width = "100px";
    	oCelda.appendChild(oImagen);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aSeries[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aSeries[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(calcularPuntuacion(aSeries[i]));
    	oCelda = oFila.insertCell(-1);
    	var oBoton=document.createElement("INPUT");
   		oBoton.type="button";
    	oBoton.classList.add("btn");
    	oBoton.classList.add("btn-sm");
    	oBoton.classList.add("btn-outline-warning");
    	oBoton.classList.add("mr-1");
    	oBoton.dataset.produccion=aSeries[i].sTitulo;
    	oBoton.value=aSeries[i].aTemporadas.length;
    	oBoton.addEventListener("click", mostrarTemporadas);
    	oCelda.appendChild(oBoton);
    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAcciones(aSeries[i]));

    	//fila datos
    	oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=5;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaMasDatos(aSeries[i]));

		//fila temporadas
		oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.colSpan=5;
    	oCelda.classList.add("col-12");
		oCelda.appendChild(crearCapaTemporadas(aSeries[i]));
	}

	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
}

function eliminarSerie(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.bajaProduccion(sTitulo.replace("-", " "))){
		alert("Serie eliminada de recursos.");
		listarSeries();
	}else{
		alert("Error al eliminar, inténtelo de nuevo.");
	}
}

function eliminarSerieFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.eliminarFavorito(sTitulo.replace("-", " "))){
		alert("Serie eliminada de favoritos");
		listarSeries();
	}else{
		alert("Error al eliminar, inténtelo de nuevo.");
	}
}

function agregarSerieFavNavegacion(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
	if(oUpoflix.añadirFavorito(sTitulo.replace("-", " "))){
		alert("Serie agregada a favoritos");
		listarSeries();
	}else{
		alert("Error al agregar, inténtelo de nuevo.");
	}
}

function calcularPuntuacion(oProduccion){
	var oCapaPuntuacion=document.createElement("div");
	var oPuntuacion=document.createElement("p");
	var iPuntuaciones=0;
	for(var i=0;i<oProduccion.aPuntuaciones.length;i++)
		iPuntuaciones+=oProduccion.aPuntuaciones[i].iNota;
	var fPuntuacion=(iPuntuaciones/oProduccion.aPuntuaciones.length).toPrecision(2);
	oPuntuacion.textContent=(oProduccion.aPuntuaciones.length==0 ? "Sin puntuaciones" : fPuntuacion);
	var oStar=document.createElement("span");
	oCapaPuntuacion.appendChild(oPuntuacion);
    oPuntuacion.appendChild(oStar);
	return oCapaPuntuacion;
}

function buscar(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();

	document.querySelector("#capaResultado").empty();

	var frmFormulario=document.querySelector("#frmABuscador");
	var sTipo=document.querySelector("#frmABuscador input:checked").value;
	//alert(sTipo);
	var sGenero=frmFormulario.selectGenero.value
	//alert(sGenero);
	var dFechaInicio=(frmFormulario.busqfechaInicio.value=="" ? null : new Date(frmFormulario.busqfechaInicio.value));
	//alert(dFechaInicio);
	var dFechaFin=(frmFormulario.busqfechaFin.value=="" ? null : new Date(frmFormulario.busqfechaFin.value));
	//alert(dFechaFin);
	var iPuntuacion=(frmFormulario.txtPuntuacionMinima.value=="" ? 0 : parseInt(frmFormulario.txtPuntuacionMinima.value, 10));
	//alert(iPuntuacion);

	switch (sTipo) {
		case "all":
			var aResultadoPelis=oUpoflix.buscarPelicula(sGenero,dFechaInicio,dFechaFin,iPuntuacion);
			var aResultadoSeries=oUpoflix.buscarSerie(sGenero,dFechaInicio,dFechaFin,iPuntuacion);
			var aResultado=aResultadoPelis.concat(aResultadoSeries);
			if(aResultado.length==0){
				document.querySelector("#capaResultado").textContent="La búsqueda no ha devuelto resultados";
			}else{
				document.querySelector("#capaResultado").appendChild(mostrarResultados(aResultado));
			}
			break;
		case "Pelicula":
			var aResultado=oUpoflix.buscarPelicula(sGenero,dFechaInicio,dFechaFin,iPuntuacion);
			if(aResultado.length==0){
				document.querySelector("#capaResultado").textContent="La búsqueda no ha devuelto resultados";
			}else{
				document.querySelector("#capaResultado").appendChild(mostrarResultados(aResultado));
			}
			break;
		case "Serie":
			var aResultado=oUpoflix.buscarSerie(sGenero,dFechaInicio,dFechaFin,iPuntuacion);
			if(aResultado.length==0){
				document.querySelector("#capaResultado").textContent="La búsqueda no ha devuelto resultados";
			}else{
				document.querySelector("#capaResultado").appendChild(mostrarResultados(aResultado));
			}
			break;
		default:
			alert("Error desconocido, vuelve a intentarlo");
			break;
	}
}

function mostrarResultados(aProducciones){
	var oTabla = document.createElement("table");
    oTabla.classList.add("table");
    oTabla.classList.add("table-sm");
    oTabla.classList.add("table-hover");
    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Título";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Tipo";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Actores";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Directores";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Puntuación";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Año";
    oFila.appendChild(oCelda);
    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
    
	for(var i=0; i<aProducciones.length;i++){
        oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aProducciones[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = (aProducciones[i] instanceof Serie ? "Serie" : "Película");
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = aProducciones[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	var lista=document.createElement("ul");
    	for(var j=0; j<aProducciones[i].aActores.length;j++){
    		var actor=document.createElement("li");
    		actor.textContent=aProducciones[i].aActores[j];
    		lista.appendChild(actor);
    	}
    	oCelda.appendChild(lista);
    	oCelda = oFila.insertCell(-1);
    	lista=document.createElement("ul");
    	for(var j=0; j<aProducciones[i].aDirectores.length;j++){
    		var director=document.createElement("li");
    		director.textContent=aProducciones[i].aDirectores[j];
    		lista.appendChild(director);
    	}
    	oCelda.appendChild(lista);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = (aProducciones[i] instanceof Serie ? aProducciones[i].dFechaInicio.getFullYear() : oUpoflix.aProducciones[i].iAñoEstreno);;

    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(calcularPuntuacion(aProducciones[i]));
    }

    // CAPTION
    var oCaption = oTabla.createCaption();
    oCaption.textContent = "Resultado de la búsqueda";

	return oTabla;
}

function getSelectGenero(){
	var aGeneros=["Acción","Aventuras","Comedia","Drama","Terror","Musical","Ciencia ficción","Bélica","Western","Thriller","Infantil"];
	aGeneros=aGeneros.sort();
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectGenero";
	var oOption=document.createElement("option");
	oOption.value="cualquiera";
	oOption.textContent="Todos los géneros";
	oSelect.appendChild(oOption);
	for(var i=0;i<aGeneros.length;i++){
		oOption=document.createElement("option");
		oOption.value=aGeneros[i];
		oOption.textContent=aGeneros[i];
		oSelect.appendChild(oOption);
	}
	return oSelect;
}