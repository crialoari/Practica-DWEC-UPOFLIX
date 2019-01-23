var oUpoflix=new Upoflix();

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
		crearEnlaceMenuUsuario("Usuario: "+oUpoflix.oUsuarioActivo.sUser);
		crearEnlaceMenuUsuario("Mis datos");

		crearEnlaceMenuUsuario("Mis pelis");
		crearEnlaceMenuUsuario("Mis series");
		crearEnlaceMenuUsuario("Salir");
		var oEnlaceCerrarSesion=document.querySelector("#menuUsuario li:nth-child(5) a");
		oEnlaceCerrarSesion.addEventListener("click", cerrarSesion);

	}else{
		//usuario no registrado
		crearEnlaceMenuUsuario("Usuario: No registrado");
		crearEnlaceMenuUsuario("Crear cuenta");
		crearEnlaceMenuUsuario("Entrar");
	}
}

function cargarMenuNavegacion(){
	//comprobar si es administrador para añadir funciones
	if(oUpoflix.oUsuarioActivo.sRol=="admin"){
		//es un administrador
		/*
		<!-- Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id="navbardrop">
                        Añadir recursos
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">
                            Películas
                        </a>
                        <a class="dropdown-item" href="#">
                            Series
                        </a>
                        <a class="dropdown-item" href="#">
                            Temporadas
                        </a>
                        <a class="dropdown-item" href="#">
                            Capítulos
                        </a>
                        <a class="dropdown-item" href="#">
                            Puntuación
                        </a>
                    </div>
                </li>
		*/
	}
}

function cargarContenidoBienvenida(){
	var oCapaContenido=document.querySelector("#contenido");
	var oBienvenida = document.createElement("h3");
	oBienvenida.classList.add("text-warning");
	oBienvenida.textContent="Binevenido a Upoflix";
    oCapaContenido.appendChild(oBienvenida);
}

function cerrarSesion(oEvento){
	var oE = oEvento || window.event;
	oE.preventDefault();
	var bSalir = confirm("¿Quiere cerrar sesión?");
    if (bSalir){
		oUpoflix.oUsuarioActivo=null;
		oMenuUsuario.empty();
		cargarMenuUsuario();
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

HTMLElement.prototype.empty = function() {
    var that = this;
    while (that.hasChildNodes()) {
        that.removeChild(that.lastChild);
    }
};