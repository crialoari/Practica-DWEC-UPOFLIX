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
	var oTitulo=document.createElement("h4");
	oTitulo.classList.add("text-warning");
	oTitulo.textContent="Elenco:";
	oColumnaDatos.appendChild(oTitulo);
	var aElenco=oUpoflix.aPersonas;
	if(aElenco.length==0){
		oTitulo=document.createElement("h4");
		oTitulo.classList.add("text-warning");
		oTitulo.textContent="Elenco:";
		oColumnaDatos.appendChild(oTitulo);
		/**/
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
		oBoton.classList.add("btn-outline-dark");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.value="X";
	   	oBoton.addEventListener("click", eliminarPersona);
    	capaFrm.appendChild(oBoton);

    	oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-outline-dark");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.value="edit";
		oBoton.addEventListener("click", editarPersona);
		capaFrm.appendChild(oBoton);

		oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-outline-warning");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.classList.add("disabled");
		oBoton.value="listo";
	   	oBoton.addEventListener("click", aceptarEditarPersona);
		capaFrm.appendChild(oBoton);

		oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-outline-warning");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.classList.add("disabled");
		oBoton.value="x";
	   	oBoton.addEventListener("click", cancelarEditarPersona);
		capaFrm.appendChild(oBoton);

	    oFormulario.appendChild(capaFrm);
		capaPersona.appendChild(oFormulario);
		oColumnaDatos.appendChild(capaPersona);
		oColumnaDatos.appendChild(document.createElement("hr"));
	}

    oCapaContenido.appendChild(oColumnaDatos);
}


function editarPersona(oEvento){

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

function aceptarEditarPersona(oEvento){
	var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement.parentElement;
	oE.target.nextSibling.classList.toggle("d-none");
	oE.target.toggle("d-none");
	var sNombre=oFormularioPadre.dataset.nombre.replace("-", " ");
	var sApellido=oFormularioPadre.dataset.appelido.replace("-", " ");


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