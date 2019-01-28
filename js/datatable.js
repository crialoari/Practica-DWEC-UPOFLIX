function listarTodo(oEvento){
	ocultarFormularios();
	oCapaContenido.empty();
	var oE = oEvento || window.event;
	oE.preventDefault();

	var oColumnaDatos=document.createElement("div");
	oColumnaDatos.classList.add("col");

	var oTabla = document.createElement("table");
    oTabla.id="datatable";
    oTabla.classList.add("dataTable");
    oTabla.classList.add("hover");
    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "Título";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Tipo";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Género";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Actores";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Directores";
    oFila.appendChild(oCelda);
    oCelda = document.createElement("TH");
    oCelda.textContent = "Año";
    oFila.appendChild(oCelda);
    // TBODY
    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);
    
	for(var i=0; i<oUpoflix.aProducciones.length;i++){
        oFila = oTBody.insertRow(-1);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = oUpoflix.aProducciones[i].sTitulo;
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = (oUpoflix.aProducciones[i] instanceof Serie ? "Serie" : "Película");
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = oUpoflix.aProducciones[i].sGenero;
    	oCelda = oFila.insertCell(-1);
    	var lista=document.createElement("ul");
    	for(var j=0; j<oUpoflix.aProducciones[i].aActores.length;j++){
    		var actor=document.createElement("li");
    		actor.textContent=oUpoflix.aProducciones[i].aActores[j];
    		lista.appendChild(actor);
    	}
    	oCelda.appendChild(lista);
    	oCelda = oFila.insertCell(-1);
    	lista=document.createElement("ul");
    	for(var j=0; j<oUpoflix.aProducciones[i].aDirectores.length;j++){
    		var director=document.createElement("li");
    		director.textContent=oUpoflix.aProducciones[i].aDirectores[j];
    		lista.appendChild(director);
    	}
    	oCelda.appendChild(lista);
    	oCelda = oFila.insertCell(-1);
    	oCelda.textContent = (oUpoflix.aProducciones[i] instanceof Serie ? oUpoflix.aProducciones[i].dFechaInicio.getFullYear() : oUpoflix.aProducciones[i].iAñoEstreno);;
    }

    // CAPTION
    var oCaption = oTabla.createCaption();
    oCaption.textContent = "Producciones";

	//crear tabla
	oColumnaDatos.appendChild(oTabla);
	oCapaContenido.appendChild(oColumnaDatos);
	$('#datatable').DataTable();
}