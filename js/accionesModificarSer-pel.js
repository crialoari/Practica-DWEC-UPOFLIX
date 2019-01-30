function editar(oEvento){
	var oE = oEvento || window.event;
	var sTitulo=oE.target.parentElement.dataset.produccion.replace("-", " ");
	alert(sTitulo);
	var oProduccionModificar=oUpoflix.buscarProduccion(sTitulo);
	oCapaContenido.empty();
    ocultarFormularios();
    //poner visible la capa correspondiente
}