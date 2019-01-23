oUpoflix=new Upoflix();

cargarDatosPrueba();

cargarMenuUsuario();

cargarMenuNavegacion();

cargarContenidoBienvenida();

function cargarDatosPrueba(){
	var oUsuario=new Usuario("crialoari","Cristina","Alonso","crisaloari@gmail.com","123456",new Date(),"user");
	var oAdmin=new Usuario("admin","Administrador","Administrador","admin@gmail.com","123456",new Date(),"admin");
	oUpoflix.oUsuarioActivo=oUsuario;
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
		document.querySelector("#menuUsuario li:nth-child(2) a").addEventListener("click", crearCuenta);
		crearEnlaceMenuUsuario("Entrar");
		document.querySelector("#menuUsuario li:nth-child(3) a").addEventListener("click", iniciarSesion);
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
	oCapaContenido=document.querySelector("#contenido");
	var oBienvenida = document.createElement("h3");
	oBienvenida.classList.add("text-warning");
	oBienvenida.textContent="Bienvenido a Upoflix";
    oCapaContenido.appendChild(oBienvenida);
}

function cerrarSesion(oEvento){
	var oE = oEvento || window.event;
	oE.preventDefault();
	var bSalir = confirm("¿Quiere cerrar sesión?");
    if (bSalir){
		resetear();
	}
}

function resetear(){
	oUpoflix.oUsuarioActivo=null;
	oMenuUsuario.empty();
	cargarMenuUsuario();
	oMenuNavegacion.empty();
	cargarMenuNavegacion();
	oCapaContenido.empty();
	cargarContenidoBienvenida();
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

HTMLElement.prototype.empty = function() {
    var that = this;
    while (that.hasChildNodes()) {
        that.removeChild(that.lastChild);
    }
};