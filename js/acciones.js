oUpoflix=new Upoflix();
cargarDatosPrueba();
cargarMenuUsuario();
cargarMenuNavegacion();
cargarContenidoBienvenida();

function cargarDatosPrueba(){
	var oUsuario=new Usuario("crialoari","Cristina","Alonso","crisaloari@gmail.com","c123456C",new Date(),"user");
	var oAdmin=new Usuario("admin","Administrador","Administrador","admin@gmail.com","c123456C",new Date(),"admin");

	oUpoflix.altaUsuario(oUsuario);
	oUpoflix.altaUsuario(oAdmin);
	
	oUpoflix.oUsuarioActivo=oAdmin;

	var peli=new Peliculas("múltiple","accion",["Ted","Barney"],[],[],"hohohafo",2013,150);
	oUpoflix.añadirProduccion(peli);
	oUsuario.aFavoritos.push(peli);
	oAdmin.aFavoritos.push(peli);
	
	peli=new Peliculas("glass","accion",[],[],[],"hohohafo",2013,150);
	oUpoflix.añadirProduccion(peli);
	
	peli=new Peliculas("el protegido","accion",[],[],[],"hohosdgsdghafo",2014,150);
	oUpoflix.añadirProduccion(peli);
	oUsuario.aFavoritos.push(peli);
	oAdmin.aFavoritos.push(peli);

	var serie=new Serie("ccavm","comedia",["Ted","Barney"],[],["EEUU"],"kjsdnfds",new Date(),new Date(2020));
	oUpoflix.añadirProduccion(serie);
	oUsuario.aFavoritos.push(serie);
	oAdmin.aFavoritos.push(serie);
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
	crearEnlaceMenuNavegacion("Todo");
	document.querySelector("#menuNavegacion li:nth-child(3) a").addEventListener("click",listarTodo);
	crearEnlaceMenuNavegacion("Buscar");
	document.querySelector("#menuNavegacion li:nth-child(4) a").addEventListener("click",buscar);
	//comprobar si es administrador para añadir funciones
	if(oUpoflix.oUsuarioActivo!=null && oUpoflix.oUsuarioActivo.sRol=="admin"){
		//funciones de añadir
		crearEnlaceMenuNavegacion("Añadir recursos");
		
		//funciones de borrar
		crearEnlaceMenuNavegacion("Borrar recursos");

		//funciones de modificar
		crearEnlaceMenuNavegacion("Modificar recursos");
	}
}

function cargarContenidoBienvenida(){
	ocultarFormularios();
	oCapaContenido=document.querySelector("#contenido");
	var oColumna=document.createElement("div");
	oColumna.classList.add("col-6");
	var oBienvenida = document.createElement("h3");
	oBienvenida.classList.add("text-warning");
	oBienvenida.textContent="Bienvenido a Upoflix";
	oColumna.appendChild(oBienvenida);
	oBienvenida = document.createElement("p");
	oBienvenida.textContent="Párrafo explicativo";
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

function ocultarFormularios(){
	document.querySelector("#capaIniciarSesion>div").classList.add("d-none");
    limpiarErroresInicioSesion();
	resetFrmInicioSesion();

	document.querySelector("#capaCrearCuenta>div").classList.add("d-none");
	limpiarErroresCrearCuenta();
	resetFrmCrearCuenta();
}

function resetFrmInicioSesion(){
	var frmFormulario=document.querySelector("#frmIniciarSesion");
    frmFormulario.txtUser.value="";
    frmFormulario.txtPass.value="";
}

function resetFrmCrearCuenta(){
	var oInputs=document.querySelectorAll("#capaCrearCuenta input[type=text]");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].value="";
    }
    oInputs=document.querySelectorAll("#capaCrearCuenta input[type=password]");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].value="";
    }
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