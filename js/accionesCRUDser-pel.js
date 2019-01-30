function añadirRecurso(){
	document.querySelector("#capaAddProduccion>div").classList.remove("d-none");	
	document.querySelector("#radioAddPeli").addEventListener("click", tipoProduccion);
	document.querySelector("#radioAddSerie").addEventListener("click",tipoProduccion);
	document.querySelector("input[name=btnActorNuevo]").addEventListener("click",añadirPersonaNuevaActor);
	document.querySelector("input[name=btnActorExistente]").addEventListener("click",añadirPersonaExistenteActor);
	document.querySelector("input[name=btnDirectorNuevo]").addEventListener("click",añadirPersonaNuevaDirector);
	document.querySelector("input[name=btnDirectorExistente]").addEventListener("click",añadirPersonaExistenteDirector);
	document.querySelector("#capaAddProduccion input[name=btnAñadir]").addEventListener("click",añadirProduccion);
	document.querySelector("#genero").appendChild(getSelectAddGenero());
	limpiarErroresAñadir();
}

function añadirProduccion(){
	var oFormulario=document.querySelector("#frmAddProduccion");
	limpiarErroresAñadir();
	var bValido=true;
    var sErrores="";

	//validar url
	oFormulario.txtAddCartel.classList.add("bg-warning");

	//validar titulo

	//recoger genero

	//validar resumen

	//recoger actores nuevos

	//validar actores nuevos

	//recoger actores existentes
	
	//recoger directores nuevos

	//validar directores nuevos

	//recoger directores existentes

	//si es serie

	//si es peli

	// si esta todo OK
	if(bValido){
		if(oUpoflix.añadirProduccion (oProduccion)){
            alert("Produccion añadida.");
            listarTodo();
        }else{
        	alert("Ya existía esa producción.")
        }
	}else{
		alert(sErrores);
	}
	
}

function limpiarErroresAñadir(){
    var oInputs=document.querySelectorAll("#frmAddProduccion .bg-warning");
    for(var i=0; i<oInputs.length;i++){
        oInputs[i].classList.remove("bg-warning");
    }
}

function tipoProduccion(){
	if(document.getElementById("radioAddSerie").checked){
        document.getElementById("datosSeries").classList.remove("d-none");
        document.getElementById("datosPelis").classList.add("d-none");
    }
    else{
        document.getElementById("datosPelis").classList.remove("d-none");
        document.getElementById("datosSeries").classList.add("d-none");
    }
}

function añadirPersonaNuevaActor(){
	//crear capa
	var oCapa=document.createElement("div");
	oCapa.classList.add("nuevo-actor");
	//crear formulario
	var oCapaFormulario=document.createElement("div");
	oCapaFormulario.classList.add("form-group");
	oCapaFormulario.classList.add("row");
	//crear columna
	var oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col-5");
	//crear input
	var oInput=document.createElement("input");
	oInput.setAttribute("type","text");
	oInput.classList.add("form-control");
	oInput.classList.add("form-control-sm");
	oInput.setAttribute("maxlength","20");
	//input nombre
	oInput.setAttribute("name","txtNombre");
	oInput.setAttribute("id","txtNombre");
	oInput.setAttribute("placeholder","Nombre");
	oCapaColumna.appendChild(oInput);
	oCapaFormulario.appendChild(oCapaColumna);
	//input apellido
	oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col-5");
	oInput=document.createElement("input");
	oInput.setAttribute("type","text");
	oInput.classList.add("form-control");
	oInput.classList.add("form-control-sm");
	oInput.setAttribute("maxlength","20");
	oInput.setAttribute("name","txtApellido");
	oInput.setAttribute("id","txtApellido");
	oInput.setAttribute("placeholder","Apellido");
	oCapaColumna.appendChild(oInput);
	oCapaFormulario.appendChild(oCapaColumna);
	//boton
	oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col");
	var oBoton=document.createElement("input");
	oBoton.setAttribute("type","button");
	oBoton.setAttribute("name","btnBorrarActorNuevo");
	oBoton.setAttribute("value","x");
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("btn-sm");
	oBoton.addEventListener("click",eliminarCapa);//evento boton
	oCapaColumna.appendChild(oBoton);
	oCapaFormulario.appendChild(oCapaColumna);
	//introducir todo
	oCapa.appendChild(oCapaFormulario);
	document.getElementById("capaActores").appendChild(oCapa);
}

function añadirPersonaNuevaDirector(){
	//crear capa
	var oCapa=document.createElement("div");
	oCapa.classList.add("nuevo-director");
	//crear formulario
	var oCapaFormulario=document.createElement("div");
	oCapaFormulario.classList.add("form-group");
	oCapaFormulario.classList.add("row");
	//crear columna
	var oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col-5");
	//crear input
	var oInput=document.createElement("input");
	oInput.setAttribute("type","text");
	oInput.classList.add("form-control");
	oInput.classList.add("form-control-sm");
	oInput.setAttribute("maxlength","20");
	//input nombre
	oInput.setAttribute("name","txtNombre");
	oInput.setAttribute("id","txtNombre");
	oInput.setAttribute("placeholder","Nombre");
	oCapaColumna.appendChild(oInput);
	oCapaFormulario.appendChild(oCapaColumna);
	//input apellido
	oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col-5");
	oInput=document.createElement("input");
	oInput.setAttribute("type","text");
	oInput.classList.add("form-control");
	oInput.classList.add("form-control-sm");
	oInput.setAttribute("maxlength","20");
	oInput.setAttribute("name","txtApellido");
	oInput.setAttribute("id","txtApellido");
	oInput.setAttribute("placeholder","Apellido");
	oCapaColumna.appendChild(oInput);
	oCapaFormulario.appendChild(oCapaColumna);
	//boton
	oCapaColumna=document.createElement("div");
	oCapaColumna.classList.add("col");
	var oBoton=document.createElement("input");
	oBoton.setAttribute("type","button");
	oBoton.setAttribute("name","btnBorrarDirectorNuevo");
	oBoton.setAttribute("value","x");
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("btn-sm");
	oBoton.addEventListener("click",eliminarCapa);//evento boton
	oCapaColumna.appendChild(oBoton);
	oCapaFormulario.appendChild(oCapaColumna);

	//introducir todo
	oCapa.appendChild(oCapaFormulario);
	document.getElementById("capaDirectores").appendChild(oCapa);
}

function añadirPersonaExistenteActor(){
	var oCapa=document.createElement("div");
	oCapa.classList.add("elegir-actor");
	var oCapaFormulario=document.createElement("div");
	oCapaFormulario.classList.add("form-group");
	oCapaFormulario.classList.add("row");
	var oColumna=document.createElement("div");
	oColumna.classList.add("col-10");
	oColumna.appendChild(getSelectPersona());
	oCapaFormulario.appendChild(oColumna);
	oColumna=document.createElement("div");
	oColumna.classList.add("col");
	var oBoton=document.createElement("input");
	oBoton.setAttribute("type","button");
	oBoton.setAttribute("name","btnBorrarActorExistente");
	oBoton.setAttribute("value","x");
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("btn-sm");
	oBoton.addEventListener("click",eliminarCapa);
	oColumna.appendChild(oBoton);
	oCapaFormulario.appendChild(oColumna);
	oCapa.appendChild(oCapaFormulario);
	document.getElementById("capaActores").appendChild(oCapa);

}

function añadirPersonaExistenteDirector(){
	var oCapa=document.createElement("div");
	oCapa.classList.add("elegir-director");
	var oCapaFormulario=document.createElement("div");
	oCapaFormulario.classList.add("form-group");
	oCapaFormulario.classList.add("row");
	var oColumna=document.createElement("div");
	oColumna.classList.add("col-10");
	oColumna.appendChild(getSelectPersona());
	oCapaFormulario.appendChild(oColumna);
	oColumna=document.createElement("div");
	oColumna.classList.add("col");
	var oBoton=document.createElement("input");
	oBoton.setAttribute("type","button");
	oBoton.setAttribute("name","btnBorrarDirectorExistente");
	oBoton.setAttribute("value","x");
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("btn-sm");
	oBoton.addEventListener("click",eliminarCapa);
	oColumna.appendChild(oBoton);
	oCapaFormulario.appendChild(oColumna);
	oCapa.appendChild(oCapaFormulario);
	document.getElementById("capaDirectores").appendChild(oCapa);

}

function eliminarCapa(oEvento){
	var oE=oEvento || window.event;
	var div=oE.target.parentElement.parentElement.parentElement;
	if(div !== null){
        while (div.hasChildNodes()){
            div.removeChild(div.lastChild);
		}
		div.remove();
	}
}

function getSelectPersona(){
	var aPersonas=oUpoflix.aPersonas;
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectPersona";
	for(var i=0;i<aPersonas.length;i++){
		var oOption=document.createElement("option");
		oOption.value=aPersonas[i].sNombre.replace(" ", "-")+"_"+aPersonas[i].sApellido.replace(" ", "-");
		oOption.textContent=aPersonas[i].sNombre+" "+aPersonas[i].sApellido;
		oSelect.appendChild(oOption);
	}
	return oSelect;
}

function getSelectAddGenero(){
	var aGeneros=["Acción","Aventuras","Comedia","Drama","Terror","Musical","Ciencia ficción","Bélica","Western","Thriller","Infantil"];
	aGeneros=aGeneros.sort();
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectGenero";
	for(var i=0;i<aGeneros.length;i++){
		var oOption=document.createElement("option");
		oOption.value=aGeneros[i];
		oOption.textContent=aGeneros[i];
		oSelect.appendChild(oOption);
	}
	return oSelect;
}