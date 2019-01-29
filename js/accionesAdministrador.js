function añadirRecurso(){
alert("recursos");
}

function editarTemporadas(){
alert("temporadas");
}

function editarElenco(){
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col-8");
    oColumnaDatos.classList.add("m-auto");
	var oTexto=document.createElement("h4");
	oTexto.classList.add("text-warning");
	oTexto.textContent="Elenco:";
	oColumnaDatos.appendChild(oTexto);
	var aElenco=oUpoflix.aPersonas;
	if(aElenco.length==0){
		oTexto=document.createElement("p");
		oTexto.textContent="No hay personas en la lista.";
		oColumnaDatos.appendChild(oTexto);
	}else
	for(var i=0; i<aElenco.length;i++){
		var capaPersona = document.createElement("div");
		capaPersona.classList.add("col");
		var oFormulario=document.createElement("form");
    	oFormulario.classList.add="frmDatosPersona";
    	oFormulario.dataset.nombre=aElenco[i].sNombre.replace(" ", "-");
		oFormulario.dataset.apellido=aElenco[i].sApellido.replace(" ", "-");
		var capaFrm = document.createElement("div");
		capaFrm.classList.add("form-group");
		
		var oLabel=document.createElement("label");
		oLabel.textContent="Nombre:";
		capaFrm.appendChild(oLabel);

		var oInput=document.createElement("INPUT");
	    oInput.type="text";
	    oInput.classList.add("form-control");
	    oInput.name="txtNombre";
	    oInput.maxLength=15;
	    oInput.value = aElenco[i].sNombre;
	    oInput.readOnly=true;
	    capaFrm.appendChild(oInput);

	    oLabel=document.createElement("label");
		oLabel.textContent="Apellidos:";
		capaFrm.appendChild(oLabel);

	    oInput=document.createElement("INPUT");
	    oInput.type="text";
	    oInput.classList.add("form-control");
	    oInput.name="txtApellido";
	    oInput.maxLength=20;
	    oInput.value = aElenco[i].sApellido;
	    oInput.readOnly=true;
	    capaFrm.appendChild(oInput);

	    var oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-danger");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.value="X";
	   	oBoton.addEventListener("click", eliminarPersona);
    	capaFrm.appendChild(oBoton);

    	oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-dark");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.value="edit";
		oBoton.addEventListener("click", editarPersona);
		capaFrm.appendChild(oBoton);

		oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-warning");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.classList.add("d-none");
		oBoton.value="listo";
	   	oBoton.addEventListener("click", aceptarEditarPersona);
		capaFrm.appendChild(oBoton);

		oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-warning");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.classList.add("d-none");
		oBoton.value="cancelar";
	   	oBoton.addEventListener("click", mostrarEditarElenco);
		capaFrm.appendChild(oBoton);

	    oFormulario.appendChild(capaFrm);
		capaPersona.appendChild(oFormulario);
		oColumnaDatos.appendChild(capaPersona);
		oColumnaDatos.appendChild(document.createElement("hr"));
	}

    oCapaContenido.appendChild(oColumnaDatos);
}

function eliminarPersona(oEvento){
	var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement.parentElement;
	var sNombre=oFormularioPadre.dataset.nombre.replace("-", " ");
	var sApellido=oFormularioPadre.dataset.apellido.replace("-", " ");
	if(oUpoflix.bajaPersona(sNombre,sApellido)){
		alert("Persona borrada.");
		mostrarEditarElenco();
	}else{
		alert("Error al borrar, prueba de nuevo.");
	}
}

function editarPersona(oEvento){
	var oE = oEvento || window.event;
	oE.target.classList.toggle("disabled");
	oE.target.classList.remove("btn-dark");
	oE.target.classList.add("btn-outline-dark");
	oE.target.nextSibling.classList.toggle("d-none");
	oE.target.nextSibling.nextSibling.classList.toggle("d-none");
    var oFormularioPadre=oE.target.parentElement.parentElement;
    var oInputs=oFormularioPadre.querySelectorAll("input[type=text");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].readOnly=false;
    }
	oE.target.removeEventListener("click", editarPersona);
}

function aceptarEditarPersona(oEvento){
	var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement.parentElement;
	var sNombre=oFormularioPadre.dataset.nombre.replace("-", " ");
	var sApellido=oFormularioPadre.dataset.apellido.replace("-", " ");
	var sNuevoNombre=oFormularioPadre.txtNombre.value.trim();
	var sNuevoApellido=oFormularioPadre.txtApellido.value.trim();
	var oPersona=oUpoflix.buscarPersona(sNombre,sApellido);
	if(oPersona==null){
		alert("Error, pruebe de nuevo");
	}else{
		if(oUpoflix.modificarPersona(oPersona,sNuevoNombre,sNuevoApellido))
		alert("Datos actualizados");
		mostrarEditarElenco();
	}
}

Date.prototype.toString=function(){
	var dia=this.getDate();
	var mes=this.getMonth()+1;
	var anio=this.getFullYear();
	var sCadena=anio+"-"+mes+"-"+dia;
	return sCadena;
}