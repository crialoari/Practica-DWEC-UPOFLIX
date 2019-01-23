var oUpoflix=new Upoflix();

cargarDatosPrueba();

cargarMenuUsuario();

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

function cerrarSesion(oEvento){
	var oE = oEvento || window.event;
	oE.preventDefault();
	oUpoflix.oUsuarioActivo=null;
	oMenuUsuario.empty();
	cargarMenuUsuario();
	alert("hi");
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
/*
    oTH = document.createElement("TH");
    oTH.textContent = "Premio";
    oFila.appendChild(oTH);
*/

/*                     <a class="dropdown-item" href="#">
                            Mis datos
                        </a>
                        <a class="dropdown-item" href="#">
                            Mis películas
                        </a>
                        <a class="dropdown-item" href="#">
                            Mis series
                        </a>
                        <div class="dropdown-divider">
                        </div>
                        <a class="dropdown-item" href="#">
                            Cerrar sesión
                        </a>
                    </div>
*/