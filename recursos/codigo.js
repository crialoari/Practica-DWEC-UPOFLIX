var oVivero=new Vivero();

ocultarFormularios();

function ocultarFormularios(){
    document.getElementById("frmAltaArbol").style.display="none";
    document.getElementById("frmTallaje").style.display="none";
    document.getElementById("frmListadoPerennes").style.display="none";
    document.getElementById("frmListadoCaducos").style.display="none";
}

function verAltaArbol(){
    ocultarFormularios();
    document.getElementById("frmAltaArbol").style.display="block";
    frmAltaArbol.reset();
    tipoArbol();
}

function verTallaje(){
    ocultarFormularios();
    document.getElementById("frmTallaje").style.display="block";
    frmTallaje.reset();
}
function verListadoPerennes(){
    ocultarFormularios();
    document.getElementById("frmListadoPerennes").style.display="block";
    frmListadoPerennes.reset();
}
function verListadoCaducos(){
    ocultarFormularios();
    document.getElementById("frmListadoCaducos").style.display="block";
    frmListadoCaducos.reset();
}
function tipoArbol(){
    if(document.getElementById("rbtTipoArbol-P").checked){
        document.getElementById("frutal").classList.remove("hidden");
        document.getElementById("floracion").classList.add("hidden");
    }
    else{
        document.getElementById("floracion").classList.remove("hidden");
        document.getElementById("frutal").classList.add("hidden");
    }

}
function altaArboles(){
    var iCodigo=parseInt(frmAltaArbol.txtCodigo.value.trim(), 10);
    var iTallaje=parseInt(frmAltaArbol.txtTallaje.value.trim(), 10);
    var sEspecie=frmAltaArbol.txtEspecie.value.trim();
    if(isNaN(iCodigo)){
        alert("Debe introducir el código.")
    }
    else{
        if(isNaN(iTallaje)){
            alert("Debe introducir el tallaje.")
        }
        else{
            if(sEspecie==""){
                alert("Debe introducir la especie.")
            }
            else{
                if(document.getElementById("rbtTipoArbol-C").checked){
                    var sMesFloracion=frmAltaArbol.txtMesFloracion.value.trim();
                    if(sMesFloracion==""){
                        alert("Debe introducir el mes de floración.")
                    }
                    else{
                        if(oVivero.altaArbol(new Caduco(iCodigo,iTallaje,sEspecie,sMesFloracion))){
                            alert("Árbol registrado OK.");
                            ocultarFormularios();
                            
                        }
                        else{
                            alert("Árbol registrado previmiamente.");
                        }
                    }
                    
                }
                else{
                    var bFrutal=document.getElementById("rbtFrutal-S").checked;
                    if(oVivero.altaArbol(new Perenne(iCodigo,iTallaje,sEspecie,bFrutal))){
                        alert("Árbol registrado OK.");
                        ocultarFormularios();
                        
                    }
                    else{
                        alert("Árbol registrado previmiamente.");
                    }
                }
            }
        }
    }
    
}

function tallajeArbol(){
    var iCodigo=parseInt(frmTallaje.txtCodigoArbol.value.trim());
    var iTallaje=parseInt(frmTallaje.txtTallajeArbol.value.trim());

    if(isNaN(iCodigo)){
        alert("Debe introducir un codigo");
    }
    else{
        if(isNaN(iTallaje)){
            alert("Debe introducir un tallaje");
        }
        else{
            alert(oVivero.tallajeArbol(iCodigo,iTallaje));
        }
    }
}

function listadoPerennes(){
    var iAltura=parseInt(frmListadoPerennes.txtAlturaMinima.value.trim());

    if(isNaN(iAltura)){
        alert("Debe introducir una altura.");
    }
    else{
        var oVentanaNueva=open("","_blank");
        oVentanaNueva.document.head.innerHTML="<title>Listado de árboles perennes.</title>";
        oVentanaNueva.document.body.innerHTML=oVivero.listadoPerennes(iAltura);
    }
}

function listadoCaducos(){
    var sMesFloracion=frmListadoCaducos.txtMesListado.value.trim();

    if(sMesFloracion==""){
        alert("Debe introducir un mes de floración.");
    }
    else{
        var oVentanaNueva=open("","_blank");
        oVentanaNueva.document.head.innerHTML="<title>Listado de árboles caducos con floración el mes: "+sMesFloracion+"</title>";
        oVentanaNueva.document.body.innerHTML=oVivero.listadoCaducos(sMesFloracion);
    }
}

function totalArbolesVenta(){
    alert(oVivero.totalArbolesVenta());
}