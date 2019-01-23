function mostrarDatosUsuario(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	var oUsuario=oUpoflix.oUsuarioActivo;
	oFilaDatos=document.createElement("div");
	oFilaDatos.classList.add("row");
	//capa de datos
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col-5");
	
	//tabla
	var oTabla = document.createElement("table");
	oTabla.classList.add("table");
    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Datos de "+oUsuario.sUser;
    oCelda.colSpan=2;
    oFila.appendChild(oCelda);

    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);

    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = "Nombre";
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = oUsuario.sNombre;

    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = "Apellido";
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = oUsuario.sApellido;

    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = "E-mail";
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = oUsuario.sEmail;

    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
    oCelda.textContent = "Contraseña";
    oCelda = oFila.insertCell(-1);
    var oContraseña=document.createElement("INPUT");
    oContraseña.type="password";
    oContraseña.classList.add("form-control");
    oContraseña.value = oUsuario.sContraseña;
    oCelda.appendChild(oContraseña);
    var oBotonMostrar=document.createElement("INPUT");
    oBotonMostrar.type="button";
    oBotonMostrar.classList.add("btn");
    oBotonMostrar.classList.add("btn-sm");
    oBotonMostrar.classList.add("btn-outline-warning");
    oBotonMostrar.value="Mostrar";
    oBotonMostrar.addEventListener("click", mostrarContraseña);
    oCelda.appendChild(oBotonMostrar);

    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);
	var oEnlace = document.createElement("a");
	oEnlace.href="#";
    oEnlace.textContent = "Modificar";
    oEnlace.classList.add("text-warning");
    oEnlace.addEventListener("click", modificarDatosUsuario);
    oCelda.appendChild(oEnlace);
    oCelda = oFila.insertCell(-1);
    oEnlace = document.createElement("a");
	oEnlace.href="#";
    oEnlace.textContent = "Borrar";
    oEnlace.classList.add("text-warning");
    oEnlace.addEventListener("click", borrarCuentaUsuario);
    oCelda.appendChild(oEnlace);

    oColumnaDatos.appendChild(oTabla);
    oFilaDatos.appendChild(oColumnaDatos);
    oCapaContenido.appendChild(oFilaDatos);
}

function modificarDatosUsuario(){
	//capa de modificar
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col-7");
	var oTitulo = document.createElement("h3");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Modificar";
	oColumnaDatos.appendChild(oTitulo);
	oFilaDatos.appendChild(oColumnaDatos);
}

function borrarCuentaUsuario(oEvento){
	var oE = oEvento || window.event;
	oE.preventDefault();
	var bBorrar = confirm("¿Quiere la cuenta y todos sus datos para siempre?");
    if (bBorrar){
    	if(oUpoflix.bajaUsuario()){
    		alert("Usuario eliminado");
			resetear();
    	}else{
    		alert("Error: no se pudo eliminar el usuario, intentelo de nuevo.");
    	}
	}
}

function mostrarContraseña(){
	var bMostrar = confirm("¿Quiere mostrar la contraseña?");
    if (bMostrar){
    	document.querySelector("input[type=password").type="text";
	}
}

function mostrarPelisFavoritas(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	
}

function mostrarSeriesFavoritas(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	
}

function listarPelis(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	alert("buscar pelis");
}

function listarSeries(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	alert("buscar series");
}

function listarTodo(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	alert("buscar todo");
}

function buscar(oEvento){
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();
	alert("buscar buscar");
}

function crearCuenta(){

}

function iniciarSesion(){

}