oUpoflix=new Upoflix();
cargarDatosPrueba();
cargarMenuUsuario();
cargarMenuNavegacion();
cargarContenidoBienvenida();

function loadXMLDoc(filename){
		if (window.XMLHttpRequest)
		  {
		  xhttp=new XMLHttpRequest();
		  }
		else // code for IE5 and IE6
		  {
		  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xhttp.open("GET",filename,false);
		
		xhttp.send();
		
		return xhttp.responseXML;
} 

function cargarDatosPrueba(){
	var oXML=loadXMLDoc("js/datos.xml");
	var oSeries=oXML.getElementsByTagName("serie");
	var oPeliculas=oXML.getElementsByTagName("pelicula");
	var oUsuarios=oXML.getElementsByTagName("usuario");
	var oPersonas=oXML.getElementsByTagName("persona");
	var oTemporadas=oXML.getElementsByTagName("temporada");
	var oCapitulos=oXML.getElementsByTagName("capitulo");
	
	for(var i=0;i<oUsuarios.length;i++){
		oUpoflix.altaUsuario(new Usuario(oUsuarios[i].querySelector("user").textContent,
							oUsuarios[i].querySelector("nombre").textContent,
							oUsuarios[i].querySelector("apellido").textContent,
							oUsuarios[i].querySelector("email").textContent,
							oUsuarios[i].querySelector("contraseña").textContent,
							new Date(oUsuarios[i].querySelector("fechaRegistro").textContent),
							oUsuarios[i].querySelector("rol").textContent));
	}
	
	for(var i=0;i<oSeries.length;i++){
		oUpoflix.añadirProduccion(new Serie(oSeries[i].querySelector("titulo").textContent,
								oSeries[i].querySelector("genero").textContent,
								[],
								[],
								oSeries[i].querySelector("resumen").textContent,
								oSeries[i].querySelector("urlImagen").textContent,
								new Date(oSeries[i].querySelector("fechaInicio").textContent),
								new Date(oSeries[i].querySelector("fechaFin").textContent)));
	}
	
	for(var i=0;i<oPeliculas.length;i++){
		oUpoflix.añadirProduccion(new Pelicula(oPeliculas[i].querySelector("titulo").textContent,
								oPeliculas[i].querySelector("genero").textContent,
								[],
								[],
								oPeliculas[i].querySelector("resumen").textContent,
								oPeliculas[i].querySelector("urlImagen").textContent,
								parseInt(oPeliculas[i].querySelector("añoEstreno").textContent),
								parseInt(oPeliculas[i].querySelector("duracion").textContent)));
	}
	
	for(var i=0;i<oPersonas.length;i++){
		oUpoflix.altaPersona(new Persona(oPersonas[i].querySelector("nombre").textContent,
							oPersonas[i].querySelector("apellido").textContent));
	}
	
	for(var i=0;i<oTemporadas.length;i++){
		oUpoflix.añadirTemporada(oTemporadas[i].querySelector("tituloSerie").textContent,
								oTemporadas[i].querySelector("numTemporada").textContent,
								oTemporadas[i].querySelector("resumen").textContent);
	}
	
	for(var i=0;i<oCapitulos.length;i++){
		oUpoflix.añadirCapitulo(oCapitulos[i].querySelector("tituloSerie").textContent,
								oCapitulos[i].querySelector("numTemporada").textContent,
								oCapitulos[i].querySelector("numCapitulo").textContent,
								oCapitulos[i].querySelector("resumen").textContent);
	}
	
	this.oUpoflix.iniciarSesion("admin","c123456C");
}

function cargarMenuUsuario(){
	//comprobar usuario activo
	oMenuUsuario=document.querySelector("#menuUsuario");
	if(oUpoflix.oUsuarioActivo!=null){
		//usuario registrado
		crearEnlaceMenuUsuario(oUpoflix.oUsuarioActivo.sUser);
		document.querySelector("#menuUsuario li:first-child a").addEventListener("click", mostrarDatosUsuario);
		crearEnlaceMenuUsuario("Mis pelis");
		document.querySelector("#menuUsuario li:nth-child(2) a").addEventListener("click", mostrarPelisFavoritas);
		crearEnlaceMenuUsuario("Mis series");
		document.querySelector("#menuUsuario li:nth-child(3) a").addEventListener("click", mostrarSeriesFavoritas);
		crearEnlaceMenuUsuario("Salir");
		document.querySelector("#menuUsuario li:nth-child(4) a").addEventListener("click", cerrarSesion);
	}else{
		//usuario no registrado
		crearEnlaceMenuUsuario("Usuario: No registrado");
		crearEnlaceMenuUsuario("Crear cuenta");
		document.querySelector("#menuUsuario li:nth-child(2) a").addEventListener("click", mostrarCrearCuenta);
		crearEnlaceMenuUsuario("Entrar");
		document.querySelector("#menuUsuario li:nth-child(3) a").addEventListener("click", mostrarIniciarSesion);
	}
}

function cargarMenuNavegacion(){
	oMenuNavegacion=document.querySelector("#menuNavegacion");
	crearEnlaceMenuNavegacion("Películas");
	document.querySelector("#menuNavegacion li:first-child a").addEventListener("click",listarPelis);
	crearEnlaceMenuNavegacion("Series");
	document.querySelector("#menuNavegacion li:nth-child(2) a").addEventListener("click",listarSeries);
	crearEnlaceMenuNavegacion("Listar todo");
	document.querySelector("#menuNavegacion li:nth-child(3) a").addEventListener("click",listarTodo);
	crearEnlaceMenuNavegacion("Buscar");
	document.querySelector("#menuNavegacion li:nth-child(4) a").addEventListener("click",mostrarBuscar);
	//comprobar si es administrador para añadir funciones
	if(oUpoflix.oUsuarioActivo!=null && oUpoflix.oUsuarioActivo.sRol=="admin"){
		crearEnlaceMenuNavegacion("Añadir recursos");
		document.querySelector("#menuNavegacion li:nth-child(5) a").addEventListener("click",mostrarAñadirRecurso);
		crearEnlaceMenuNavegacion("Editar temporadas");
		document.querySelector("#menuNavegacion li:nth-child(6) a").addEventListener("click",mostrarEditarTemporadas);
		crearEnlaceMenuNavegacion("Editar elenco");
		document.querySelector("#menuNavegacion li:nth-child(7) a").addEventListener("click",mostrarEditarElenco);
	}
}

function cargarContenidoBienvenida(){
	ocultarFormularios();
	oCapaContenido=document.querySelector("#contenido");
	var oColumna=document.createElement("div");
	oColumna.classList.add("col-4");
	var oImg=document.createElement("img");
	oImg.src="images/mando.jpg";
	oImg.classList.add("img-thumbnail");
	oImg.classList.add("d-none");
	oImg.classList.add("d-sm-block");
	oColumna.appendChild(oImg);
	oCapaContenido.appendChild(oColumna);
	oColumna=document.createElement("div");
	oColumna.classList.add("col-12");
	oColumna.classList.add("col-sm-5");
	var oBienvenida = document.createElement("h3");
	oBienvenida.classList.add("text-warning");
	oBienvenida.textContent="Bienvenido a Upoflix";
	oColumna.appendChild(oBienvenida);
	oBienvenida = document.createElement("p");
	oBienvenida.textContent="En esta aplicación puedes acceder a todo un archivo documental de películas y series. Consulta información, añádelas a favoritos y puntúalas si estás registrado. ¡El sueño de todo cinéfilo!";
	oColumna.appendChild(oBienvenida);
    oCapaContenido.appendChild(oColumna);
}

function mostrarIniciarSesion(){
    oCapaContenido.empty();
    ocultarFormularios();
    document.querySelector("#capaIniciarSesion>div").classList.remove("d-none");
    document.querySelector("#capaIniciarSesion input[type=button]").addEventListener("click", iniciarSesion);
}

function mostrarCrearCuenta(){
    oCapaContenido.empty();
    ocultarFormularios();
    document.querySelector("#capaCrearCuenta>div").classList.remove("d-none");
    document.querySelector("#capaCrearCuenta input[type=button]").addEventListener("click", crearCuenta);
}

function mostrarBuscar(){
    oCapaContenido.empty();
    ocultarFormularios();
    //preparar el select generos
    document.querySelector("#capaSelect").empty();
    var oLabel=document.createElement("label");
	oLabel.textContent="Por género:";
	document.querySelector("#capaSelect").appendChild(oLabel);
	document.querySelector("#capaSelect").appendChild(getSelectGenero());
	//preparar capa resultados
    document.querySelector("#capaResultado").empty();
    document.querySelector("#capaBusqueda #capaResultado").classList.remove("d-none");
	//mostrar capa
    document.querySelector("#capaBusqueda>div").classList.remove("d-none");
    document.querySelector("#capaBusqueda input[type=button]").addEventListener("click", buscar);
    document.querySelector("#txtPuntuacionMinima"),addEventListener("keypress", soloPuntuacion);
}

function mostrarAñadirRecurso(){
	oCapaContenido.empty();
    ocultarFormularios();
    añadirRecurso();
}

function mostrarEditarTemporadas(){
	oCapaContenido.empty();
    ocultarFormularios();
    editarTemporadas();
}

function mostrarEditarElenco(){
	oCapaContenido.empty();
    ocultarFormularios();
    editarElenco();
}

function ocultarFormularios(){
	document.querySelector("#capaIniciarSesion>div").classList.add("d-none");
    limpiarErroresInicioSesion();
	document.querySelector("#frmIniciarSesion").reset();

	document.querySelector("#capaCrearCuenta>div").classList.add("d-none");
	limpiarErroresCrearCuenta();
	document.querySelector("#frmCrearCuenta").reset();

	document.querySelector("#capaBusqueda>div").classList.add("d-none");
	document.querySelector("#capaBusqueda #capaResultado").classList.add("d-none");
	document.querySelector("#frmABuscador").reset();
	document.querySelector("#radioBusqTodo").checked=true;
}

function crearEnlaceMenuUsuario(sTexto){
	var oLista = document.createElement("li");
	oLista.classList.add("nav-item");
	var oEnlace = document.createElement("a");
	oEnlace.classList.add("nav-link");
	oEnlace.classList.add("text-warning");
	oEnlace.href="#";
	oEnlace.textContent=sTexto;
    oLista.appendChild(oEnlace);
    oMenuUsuario.appendChild(oLista);
}

function crearEnlaceMenuNavegacion(sTexto){
	var oLista = document.createElement("li");
	oLista.classList.add("nav-item");
	var oEnlace = document.createElement("a");
	oEnlace.classList.add("nav-link");
	oEnlace.href="#";
	oEnlace.textContent=sTexto;
    oLista.appendChild(oEnlace);
    oMenuNavegacion.appendChild(oLista);
}

function inicio(){
	oMenuUsuario.empty();
	cargarMenuUsuario();
	oMenuNavegacion.empty();
	cargarMenuNavegacion();
	oCapaContenido.empty();
	cargarContenidoBienvenida();
}

HTMLElement.prototype.empty = function() {
    var that = this;
    while (that.hasChildNodes()) {
        that.removeChild(that.lastChild);
    }
};

function soloPuntuacion(elEvento) {
    var oEvento = elEvento || window.event;
    var codigoChar = oEvento.charCode || oEvento.keyCode;
    var caracter = String.fromCharCode(codigoChar);
    // Cancelar comportamiento predeterminado si no es numero
    if (caracter == "0" || caracter == "1" || caracter == "2" || caracter == "3" || caracter == "4" || caracter == "5"){
    }else{
        oEvento.preventDefault();
    }
}