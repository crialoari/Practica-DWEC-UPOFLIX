function añadirRecurso(){
	document.querySelector("#capaAddProduccion").classList.remove("d-none");	
	document.querySelector("#radioAddPeli").addEventListener("click", tipoProduccion);
	document.querySelector("#radioAddSerie").addEventListener("click",tipoProduccion);
	document.querySelector("input[name=btnActorNuevo]").addEventListener("click",añadirPersonaNuevaActor);
	document.querySelector("input[name=btnActorExistente]").addEventListener("click",añadirPersonaExistenteActor);
	document.querySelector("input[name=btnDirectorNuevo]").addEventListener("click",añadirPersonaNuevaDirector);
	document.querySelector("input[name=btnDirectorExistente]").addEventListener("click",añadirPersonaExistenteDirector);
	document.querySelector("#capaAddProducion input[name=btnAñadir]").addEventListener("click",añadirProduccion);
	document.querySelector("#genero").appendChild(getSelectGenero());
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
	var oOption=document.createElement("option");
	oOption.value="cualquiera";
	oOption.textContent="Todos las personas";
	oSelect.appendChild(oOption);
	for(var i=0;i<aPersonas.length;i++){
		oOption=document.createElement("option");
		oOption.value=aPersonas[i];
		oOption.textContent=aPersonas[i];
		oSelect.appendChild(oOption);
	}
	return oSelect;
}
function getSelectGenero(){
	var aGeneros=["accion","Aventuras","Comedia","Drama","Terror","Musical","Ciencia ficción","Bélica","Western","Thriller","Infantil"];
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectGenero";
	var oOption=document.createElement("option");
	oOption.value="cualquiera";
	oOption.textContent="Todos los géneros";
	oSelect.appendChild(oOption);
	for(var i=0;i<aGeneros.length;i++){
		oOption=document.createElement("option");
		oOption.value=aGeneros[i];
		oOption.textContent=aGeneros[i];
		oSelect.appendChild(oOption);
	}
	return oSelect;
}

function editarTemporadas(){
	var event = new Event('change');
	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col-8");
    oColumnaDatos.classList.add("m-auto");
    var oTexto=document.createElement("h4");
	oTexto.classList.add("text-warning");
	oTexto.textContent="Temporadas:";
	oColumnaDatos.appendChild(oTexto);
	var aSeries=oUpoflix.aProducciones.filter(Produccion => Produccion instanceof Serie);
	if(aSeries.length==0){
		oTexto=document.createElement("p");
		oTexto.textContent="No hay series para modificar temporadas";
		oColumnaDatos.appendChild(oTexto);
		var oBoton=document.createElement("INPUT");
		oBoton.type="button";
		oBoton.classList.add("btn");
		oBoton.classList.add("btn-sm");
		oBoton.classList.add("btn-warning");
		oBoton.classList.add("mr-1");
		oBoton.classList.add("mt-1");
		oBoton.value="Añadir serie";
		oBoton.addEventListener("click", mostrarAñadirRecurso);
		oColumnaDatos.appendChild(oBoton);
	}else{
		var oFormulario=document.createElement("form");
		oFormulario.id="frmEditarTemporadas";
		var oLabel=document.createElement("label");
		oLabel.textContent="Selecciona serie:";
		oFormulario.appendChild(oLabel);
		oFormulario.appendChild(getSelectSeries(aSeries));
		//select temporada
		var oCapa=document.createElement("div");
		oCapa.id="capaSelectTemporada";
		oFormulario.appendChild(oCapa);
		//capa modificacion temporada
		oCapa=document.createElement("div");
		oCapa.id="capaModificarTemporada";
		oFormulario.appendChild(oCapa);
		//select capitulo
		oCapa=document.createElement("div");
		oCapa.id="capaSelectCapitulo"
		oFormulario.appendChild(oCapa);
		//capa modificacion capitulo
		oCapa=document.createElement("div");
		oCapa.id="capaModificarCapitulo";
		oFormulario.appendChild(oCapa);

    	oColumnaDatos.appendChild(oFormulario);

	}
    oCapaContenido.appendChild(oColumnaDatos);
    if(document.querySelector("#frmEditarTemporadas")!=null)
    	document.querySelector("#frmEditarTemporadas").selectSerie.dispatchEvent(event);
}

function getSelectSeries(aSeries){
	var oSelect=document.createElement("select");
	oSelect.classList.add("custom-select");
	oSelect.classList.add("custom-select-sm");
	oSelect.name="selectSerie";
	for(var i=0;i<aSeries.length;i++){
		var oOption=document.createElement("option");
		oOption.value=aSeries[i].sTitulo.replace(" ","-");
		oOption.textContent=aSeries[i].sTitulo;
		oSelect.appendChild(oOption);
	}
	oSelect.addEventListener("change", crearSelectTemporadas);
	return oSelect;
}

function crearSelectTemporadas(oEvento){
	var oE = oEvento || window.event;
	var oSerie=oUpoflix.buscarProduccion(oE.target.value);
	var oCapaSelectTemporada=document.querySelector("#capaSelectTemporada");
	oCapaSelectTemporada.empty();
	if(oSerie.aTemporadas.length==0){
		var oTexto=document.createElement("p");
		oTexto.textContent="No hay temporadas";
		oCapaSelectTemporada.appendChild(oTexto);
		oCapaSelectTemporada.appendChild(getCapaModificarTemporada());
		document.querySelector("input[name=modificar-temporada").classList.add("d-none");
		document.querySelector("input[name=eliminar-temporada").classList.add("d-none");
		document.querySelector("input[name=nueva-temporada").classList.add("d-none");
		document.querySelector("input[name=add-temporada").classList.remove("d-none");

	}else{
		var oLabel=document.createElement("label");
		oLabel.textContent="Selecciona Temporada:";
		oCapaSelectTemporada.appendChild(oLabel);
		var oSelect=document.createElement("select");
		oSelect.dataset.serie=oE.target.value;
		oSelect.classList.add("custom-select");
		oSelect.classList.add("custom-select-sm");
		oSelect.name="selectTemporada";
		for(var i=0;i<oSerie.aTemporadas.length;i++){
			var oOption=document.createElement("option");
			oOption.value=oSerie.aTemporadas[i].iNumTemporada;
			oOption.textContent="Temporada "+oSerie.aTemporadas[i].iNumTemporada;
			oSelect.appendChild(oOption);
		}
		oSelect.addEventListener("change", crearSelectCapitulos);
		oCapaSelectTemporada.appendChild(oSelect);
		oCapaSelectTemporada.appendChild(getCapaModificarTemporada());
		var event = new Event('change');
		document.querySelector("#frmEditarTemporadas").selectTemporada.dispatchEvent(event);
	}
}

function getCapaModificarTemporada(){
	var oCapaAdd=document.createElement("div");
	oCapaAdd.classList.add("col-8");
	oCapaAdd.classList.add("m-3");
	oLabel=document.createElement("label");
	oLabel.textContent="Número:";
	oCapaAdd.appendChild(oLabel);
	
	var oInput=document.createElement("INPUT");
	oInput.type="text";
	oInput.classList.add("form-control");
	oInput.name="txtNumeroT";
	oInput.maxLength=3;
	oCapaAdd.appendChild(oInput);
	oLabel=document.createElement("label");
	oLabel.textContent="Resumen:";
	oCapaAdd.appendChild(oLabel);
	oInput=document.createElement("textarea");
	oInput.classList.add("form-control");
	oInput.rows=3;
	oInput.maxLength=140;
	oInput.name="txtResumenT";
	oCapaAdd.appendChild(oInput);
	
	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="modificar-temporada";
	oBoton.value="Modificar";
	oBoton.addEventListener("click", modificarTemporada);
	oCapaAdd.appendChild(oBoton);
			
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="eliminar-temporada"
	oBoton.value="Eliminar";
	oBoton.addEventListener("click", eliminarTemporada);
	oCapaAdd.appendChild(oBoton);
	
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-success");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="nueva-temporada"
	oBoton.value="Nueva";
	oBoton.addEventListener("click", nuevaTemporada);
	oCapaAdd.appendChild(oBoton);
	
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-success");
	oBoton.classList.add("d-none");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="add-temporada";
	oBoton.value="Añadir";
	oBoton.addEventListener("click", añadirTemporada);
	oCapaAdd.appendChild(oBoton);

	return oCapaAdd;
}

function modificarTemporada(){
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	oFormulario.txtNumeroT.classList.remove("bg-warning");
	oFormulario.txtResumenT.classList.remove("bg-warning");
	var sSerie=oFormulario.selectSerie.value;
	var iNumTemporada=parseInt(oFormulario.selectTemporada.value, 10);
	var iNuevoNumT=parseInt(oFormulario.txtNumeroT.value,10);
	var sResumen=oFormulario.txtResumenT.value;
	var bValido=true;
	if(iNuevoNumT==""){
		bValido=false;
		oFormulario.txtNumeroT.classList.add("bg-warning");
		oFormulario.txtNumeroT.focus();
	}
	if(sResumen==""){
		oFormulario.txtResumenT.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormulario.txtResumenT.focus();
		}
	}

	if(!bValido){
		alert("Por favor rellena todos los campos");	
	}else{
		oUpoflix.modificarTemporada(sSerie,iNumTemporada,iNuevoNumT,sResumen);
		alert("Datos actualizados.");
		mostrarEditarTemporadas();
	}
}

function eliminarTemporada(){
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	var sSerie=oFormulario.selectSerie.value;
	var iNumTemporada=parseInt(oFormulario.selectTemporada.value);
	if(oUpoflix.borrarTemporada(sSerie,iNumTemporada)){
		alert("Temporada borrada.");
		mostrarEditarTemporadas();
	}else{
		alert("Error, pruebe de nuevo.");
	}
}

function nuevaTemporada(oEvento){
	var oE = oEvento || window.event;
	oE.target.nextSibling.classList.remove("d-none");
	document.querySelector("input[name=txtNumeroT").value="";
	document.querySelector("textarea[name=txtResumenT").value="";
	document.querySelector("input[name=modificar-temporada").classList.add("d-none");
	document.querySelector("input[name=eliminar-temporada").classList.add("d-none");
}

function añadirTemporada(){
	alert("deberia añadir temporada");
}

function crearSelectCapitulos(oEvento){
	//cambiar datos temporada en capa temporada
	var oFormulario=oCapaSelectCaptitulo.parentElement;
	oFormulario.txtNumeroT.value=iNumTemporada;
	oFormulario.txtResumenT.value=oTemporada.sResumen;
	//llenar select
	var oE = oEvento || window.event;
	var sSerie=oE.target.dataset.serie.replace("-"," ");
	var iNumTemporada=parseInt(oE.target.value, 10);
	var oTemporada=oUpoflix.buscarTemporada(sSerie,iNumTemporada);
	var oCapaSelectCaptitulo=document.querySelector("#capaSelectCapitulo");
	oCapaSelectCaptitulo.empty();
	
	if(oTemporada.aCapitulos.length==0){
		var oTexto=document.createElement("p");
		oTexto.textContent="No hay capítulos";
		oCapaSelectCaptitulo.appendChild(oTexto);
		oCapaSelectCaptitulo.appendChild(getCapaModificarCapitulo());
		document.querySelector("input[name=modificar-capitulo").classList.add("d-none");
		document.querySelector("input[name=eliminar-capitulo").classList.add("d-none");
		document.querySelector("input[name=nueva-capitulo").classList.add("d-none");
		document.querySelector("input[name=add-capitulo").classList.remove("d-none");
	}else{
		var oLabel=document.createElement("label");
		oLabel.textContent="Selecciona capítulo:";
		oCapaSelectCaptitulo.appendChild(oLabel);
		var oSelect=document.createElement("select");
		oSelect.dataset.serie=oE.target.dataset.serie;
		oSelect.dataset.temporada=iNumTemporada;
		oSelect.classList.add("custom-select");
		oSelect.classList.add("custom-select-sm");
		oSelect.name="selectCapitulo";
		for(var i=0;i<oTemporada.aCapitulos.length;i++){
			var oOption=document.createElement("option");
			oOption.value=oSerie.aCapitulos[i].iNumTemporada;
			oOption.textContent="Capítulo "+oSerie.aCapitulos[i].iNumTemporada;
			oSelect.appendChild(oOption);
		}
		oSelect.addEventListener("change", cambiarDatosCapitulos);
		oCapaSelectCaptitulo.appendChild(oSelect);
		oCapaSelectTemporada.appendChild(getCapaModificarCapitulo());
		var event = new Event('change');
		document.querySelector("#frmEditarTemporadas").selectCapitulo.dispatchEvent(event);
	}
}

function cambiarDatosCapitulos(oEvento){
	var oE = oEvento || window.event;
	var sSerie=oE.target.dataset.serie.replace("-"," ");
	var iNumTemporada=parseInt(oE.target.dataset.temporada, 10);
	var iNumCapitulo=parseInt(oE.target.value,10);
	var oFormulario=document.querySelector("#frmEditarTemporadas");
	oFormulario.txtNumeroC.value=iNumCapitulo;
	oFormulario.txtResumenT.value=oTemporada.sResumen;

}
/*modificar*/
function getCapaModificarCapitulo(){
var oCapaAdd=document.createElement("div");
	oCapaAdd.classList.add("col-8");
	oCapaAdd.classList.add("m-3");
	oLabel=document.createElement("label");
	oLabel.textContent="Número:";
	oCapaAdd.appendChild(oLabel);
	
	var oInput=document.createElement("INPUT");
	oInput.type="text";
	oInput.classList.add("form-control");
	oInput.name="txtNumeroC";
	oInput.maxLength=3;
	oCapaAdd.appendChild(oInput);
	oLabel=document.createElement("label");
	oLabel.textContent="Resumen:";
	oCapaAdd.appendChild(oLabel);
	oInput=document.createElement("textarea");
	oInput.classList.add("form-control");
	oInput.rows=3;
	oInput.maxLength=140;
	oInput.name="txtResumenC";
	oCapaAdd.appendChild(oInput);
	
	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="modificar-temporada";
	oBoton.value="Modificar";
	oBoton.addEventListener("click", modificarTemporada);
	oCapaAdd.appendChild(oBoton);
			
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-danger");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="eliminar-temporada"
	oBoton.value="Eliminar";
	oBoton.addEventListener("click", eliminarTemporada);
	oCapaAdd.appendChild(oBoton);
	
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-success");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="nueva-temporada"
	oBoton.value="Nueva";
	oBoton.addEventListener("click", nuevaTemporada);
	oCapaAdd.appendChild(oBoton);
	
	oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-success");
	oBoton.classList.add("d-none");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.name="add-temporada";
	oBoton.value="Añadir";
	oBoton.addEventListener("click", añadirTemporada);
	oCapaAdd.appendChild(oBoton);

	return oCapaAdd;
}

function getCapaAltaPersona(sMetodo){
	var oCapaAltaPersona=document.createElement("div");
	oCapaAltaPersona.classList.add("altaPersona");
	oCapaAltaPersona.classList.add("p-2");
	var oFormulario=document.createElement("form");
    oFormulario.classList.add="frmAltaPersona";
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
    capaFrm.appendChild(oInput);

	oLabel=document.createElement("label");
	oLabel.textContent="Apellidos:";
	capaFrm.appendChild(oLabel);

	oInput=document.createElement("INPUT");
	oInput.type="text";
	oInput.classList.add("form-control");
	oInput.name="txtApellido";
	oInput.maxLength=20;
	capaFrm.appendChild(oInput);

	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.value="Añadir";
	oBoton.addEventListener("click", sMetodo);
    capaFrm.appendChild(oBoton);

    oFormulario.appendChild(capaFrm);
	oCapaAltaPersona.appendChild(oFormulario);

	return oCapaAltaPersona;
}

function validarAñadirPersona(oFormulario){
	oFormulario.txtNombre.classList.remove("bg-warning");
	oFormulario.txtApellido.classList.remove("bg-warning");
	var sNombre=oFormulario.txtNombre.value.trim();
	var sApellido=oFormulario.txtApellido.value.trim();
	var bValido=true;
	if(sNombre==""){
		bValido=false;
		oFormulario.txtNombre.classList.add("bg-warning");
		oFormulario.txtNombre.focus();
	}
	if(sApellido==""){
		oFormulario.txtApellido.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormulario.txtApellido.focus();
		}
	}
	return bValido;
}

function añadirPersonaDesdeElenco(oEvento){
	var oE = oEvento || window.event;
	var oFormularioPadre=oE.target.parentElement.parentElement;
	if(validarAñadirPersona(oFormularioPadre)){
		var sNombre=oFormularioPadre.txtNombre.value.trim();
		var sApellido=oFormularioPadre.txtApellido.value.trim();
		var oPersona=new Persona(sNombre,sApellido);
		if(oUpoflix.altaPersona(oPersona)){
			alert("Persona añadida.");
			mostrarEditarElenco();
		}else{
			alert("Error, pruebe de nuevo.");
		}
		
	}else{
		alert("Debe rellenar todos los campos.");
	}
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
	/*capa añadir*/
	var oCapaAltaPersona=document.createElement("div");
	oCapaAltaPersona.id="capaAltaPerson";
	var oBoton=document.createElement("INPUT");
	oBoton.type="button";
	oBoton.classList.add("btn");
	oBoton.classList.add("btn-sm");
	oBoton.classList.add("btn-warning");
	oBoton.classList.add("mr-1");
	oBoton.classList.add("mt-1");
	oBoton.value="Añadir persona";
	oBoton.addEventListener("click", añadirFormularioAltaPersona);
	oCapaAltaPersona.appendChild(oBoton);
	oColumnaDatos.appendChild(oCapaAltaPersona);
    oCapaContenido.appendChild(oColumnaDatos);
}
function añadirFormularioAltaPersona(){
	document.querySelector("#capaAltaPerson").appendChild(getCapaAltaPersona(añadirPersonaDesdeElenco));
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
	oFormularioPadre.txtNombre.classList.remove("bg-warning");
	oFormularioPadre.txtApellido.classList.remove("bg-warning");
	var sNuevoNombre=oFormularioPadre.txtNombre.value.trim();
	var sNuevoApellido=oFormularioPadre.txtApellido.value.trim();
	var bValido=true;
	if(sNuevoNombre==""){
		bValido=false;
		oFormularioPadre.txtNombre.classList.add("bg-warning");
		oFormularioPadre.txtNombre.focus();
	}
	if(sNuevoApellido==""){
		oFormularioPadre.txtApellido.classList.add("bg-warning");
		if(bValido){
			bValido=false;
			oFormularioPadre.txtApellido.focus();
		}
	}

	if(!bValido){
		alert("Por favor rellena todos los campos");	
	}else{
		var sNombre=oFormularioPadre.dataset.nombre.replace("-", " ");
		var sApellido=oFormularioPadre.dataset.apellido.replace("-", " ");
		
		var oPersona=oUpoflix.buscarPersona(sNombre,sApellido);
		if(oPersona==null){
			alert("Error, pruebe de nuevo");
		}else{
			if(oUpoflix.modificarPersona(oPersona,sNuevoNombre,sNuevoApellido))
			alert("Datos actualizados");
			mostrarEditarElenco();
		}
	}
}

Date.prototype.toString=function(){
	var dia=this.getDate();
	var mes=this.getMonth()+1;
	var anio=this.getFullYear();
	var sCadena=anio+"-"+mes+"-"+dia;
	return sCadena;
}