function añadirRecurso(){
alert("recursos");
}

function editarTemporadas(){
alert("temporadas");
}

function editarElenco(){
	var aElenco=oUpoflix.aPersonas;
	var oTabla = document.createElement("table");
    oTabla.classList.add("table");
    oTabla.classList.add("table-sm");
    oTabla.classList.add("table-hover");
    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Nombre";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Apellido";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Fecha";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Acciones";
    oFila.appendChild(oCelda);

    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
    
	for(var i=0; i<aElenco.length;i++){
	//formulario
	    var oFormulario=document.createElement("form");
    	oFormulario.id="frmDatosPersona";
    	oFormulario.dataset.nombre=aElenco[i].sNombre.replace(" ", "-");
		oFormulario.dataset.apellido=aElenco[i].sApellido.replace(" ", "-");
        oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	var oInput=document.createElement("INPUT");
	    oInput.type="text";
	    oInput.classList.add("form-control");
	    oInput.name="txtNombre";
	    oInput.maxLength=15;
	    oInput.value = aElenco[i].sNombre;
	    oInput.readOnly=true;
	    oCelda.appendChild(oInput);

    	oCelda = oFila.insertCell(-1);
    	oInput=document.createElement("INPUT");
	    oInput.type="text";
	    oInput.classList.add("form-control");
	    oInput.name="txtApellido";
	    oInput.maxLength=20;
	    oInput.value = aElenco[i].sApellido;
	    oInput.readOnly=true;
	    oCelda.appendChild(oInput);

    	oCelda = oFila.insertCell(-1);
    	oInput=document.createElement("INPUT");
	    oInput.type="date";
	    oInput.classList.add("form-control");
	    oInput.name="txtApellido";
	    alert(aElenco[i].dNacimiento.toString());
	    oInput.setAttribute("value", aElenco[i].dNacimiento.toString())
	    oInput.readOnly=true;
	    oCelda.appendChild(oInput);

    	oCelda = oFila.insertCell(-1);
    	oCelda.appendChild(crearAccionesElenco());
    }
	oCapaContenido.append(oTabla);
}


function crearAccionesElenco(oPersona){
	var oCapaAcciones=document.createElement("div");
	oCapaAcciones.classList.add("col-6");
	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-outline-danger");
	oBoton.classList.add("mr-1");
	oBoton.value="X";
   	oBoton.addEventListener("click", eliminarPersona);
	oCapaAcciones.appendChild(oBoton);

	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-outline-dark");
	oBoton.value="edit";
	oBoton.addEventListener("click", editarPersona);
	oCapaAcciones.appendChild(oBoton);

	var oCapaEditar=document.createElement("div");
	oCapaEditar.classList.add("capaBotonesModificar");
	oCapaEditar.classList.add("d-none");

	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.value="listo";
   	oBoton.addEventListener("click", aceptarEditarPersona);
	oCapaEditar.appendChild(oBoton);

	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-outline-warning");
	oBoton.classList.add("mr-1");
	oBoton.value="x";
   	oBoton.addEventListener("click", cancelarEditarPersona);
	oCapaEditar.appendChild(oBoton);

	oCapaAcciones.appendChild(oCapaEditar);

	return oCapaAcciones;
}

function editarPersona(oEvento){
	var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement;
	oE.target.nextSibling.classList.toggle("d-none");
	oE.target.toggle("d-none");
	var sNombre=oFormularioPadre.dataset.nombre.replace("-", " ");
	var sApellido=oFormularioPadre.dataset.appelido.replace("-", " ");
}

function eliminarPersona(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
    if(oUpoflix.eliminarFavorito(sTitulo.replace("-", " "))){
        alert("Película eliminada de favoritos");
        mostrarPelisFavoritas();
    }else{
        alert("Error al eliminar, inténtelo de nuevo.");
    }
}

function aceptarEditarPersona(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
    if(oUpoflix.eliminarFavorito(sTitulo.replace("-", " "))){
        alert("Película eliminada de favoritos");
        mostrarPelisFavoritas();
    }else{
        alert("Error al eliminar, inténtelo de nuevo.");
    }
}

function cancelarEditarPersona(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion;
    if(oUpoflix.eliminarFavorito(sTitulo.replace("-", " "))){
        alert("Película eliminada de favoritos");
        mostrarPelisFavoritas();
    }else{
        alert("Error al eliminar, inténtelo de nuevo.");
    }
}

Date.prototype.toString=function(){
	var dia=this.getDate();
	var mes=this.getMonth()+1;
	var anio=this.getFullYear();
	var sCadena=anio+"-"+mes+"-"+dia;
	return sCadena;
}