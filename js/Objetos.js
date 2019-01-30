function Usuario(user,nombre,apellido,email,contraseña,fechaRegistro,rol){
    this.sUser=user;
    this.sNombre=nombre;
    this.sApellido=apellido;
    this.sEmail=email;
    this.sContraseña=contraseña;
    this.dFechaRegistro=fechaRegistro;
    this.aFavoritos=[];
    this.sRol=rol;
   
}

function Produccion(titulo,genero,actores,directores,resumen,urlImagen){
    this.sTitulo=titulo;
    this.sGenero=genero;
    this.aPuntuaciones=[];
    this.aActores=actores;
    this.aDirectores=directores;
    this.sresumen=resumen;
    this.sUrlImagen=urlImagen;
    this.fNotaMedia=0;
}

function Serie(titulo,genero,actores,directores,resumen,urlImagen,fechaInicio,fechaFin){
    Produccion.call(this,titulo,genero,actores,directores,resumen,urlImagen);
    this.dFechaInicio=fechaInicio;
    this.dFechaFin=fechaFin;
    this.aTemporadas=[];
}

Serie.prototype=Object.create(Produccion.prototype);
Serie.prototype.constructor=Produccion;

function Pelicula(titulo,genero,actores,directores,resumen,urlImagen,añoEstreno,duracion){
    Produccion.call(this,titulo,genero,actores,directores,resumen,urlImagen);
    this.iAñoEstreno=añoEstreno;
    this.iDuracion=duracion;
}

Pelicula.prototype=Object.create(Produccion.prototype);
Pelicula.prototype.constructor=Produccion;

function Persona(nombre,apellido){
    this.sApellido=apellido;
    this.sNombre=nombre;
}

function Temporada(numTemporada,resumen){
    this.iNumTemporada=numTemporada;
    this.aCapitulos=[];
    this.sResumen=resumen;
}

function Capitulo(numeroCapitulo,resumen){
    this.iNumCapitulo=numeroCapitulo;
    this.sresumen=resumen;
}

function Puntuacion(usuario,nota){
    this.oUsuario=usuario;
    this.iNota=nota;
}

class Upoflix{
    constructor(){
        this.oUsuarioActivo=null;
        this.aUsuarios=[];
        this.aProducciones=[];
        this.aPersonas=[];
    }

    iniciarSesion(sUsuario,contraseña){
        var oUsuario=this.buscarUsuario(sUsuario);
        if(oUsuario==null){
            return 0;//usuario incorrecto
        }
        else{
            if(oUsuario.sContraseña==contraseña){
                this.oUsuarioActivo=oUsuario;
                return 2;//sesion iniciada
            }
            else
                return 1;//contraseña incorrecta
        }
    }

    cerrarSesion(){
        this.oUsuarioActivo=null;
        return true;//sesion cerrada
    }

    añadirProduccion (produccion){
        var array=this.aProducciones.filter(Produccion => Produccion.sTitulo==produccion.sTitulo);

        if(array.length>0)
            return false;//la producción ya estaba
        else{
            this.aProducciones.push(produccion);
            return true;//producción introducida
        }
        
    }

    altaUsuario(usuario){
        var array=this.aUsuarios.filter(Usuario=>Usuario.sUser==usuario.sUser);

        if(array.length>0)
            return false;//usuario ya estaba
        else{
            this.aUsuarios.push(usuario);
            return true;//usuario introducido    
        }
    }

    altaPersona(persona){
        var array=this.aPersonas.filter(Persona=>Persona.sNombre==persona.sNombre && Persona.sApellido==persona.sApellido);

        if(array.length>0)
            return false;//la persona ya estaba
        else{
            this.aPersonas.push(persona);
            return true;//persona introducida    
        }
    }

    buscarPersona(sNombre,sApellido){
        var array=this.aPersonas.filter(Persona=>Persona.sNombre==sNombre && Persona.sApellido==sApellido);
        if(array.length>0)
            return array[0];
        else
            return null;  
    }

    buscarTemporada(sSerie,iNumTemporada){
        var oSerie=this.buscarProduccion(sSerie);
        for(var i=0;i<oSerie.aTemporadas.length;i++){
            if(oSerie.aTemporadas[i].iNumTemporada==iNumTemporada)
                return oSerie.aTemporadas[i];
        }
        return null;
    }

    buscarCapitulo(sSerie,iNumTemporada,iNumCapitulo){
        var oTemporada=this.buscarTemporada(sSerie,iNumTemporada);
        for(var i=0;i<oTemporada.aCapitulos.length;i++){
            if(oTemporada.aCapitulos[i].iNumCapitulo==iNumCapitulo)
                return oTemporada.aCapitulos[i];
        }
    }

    borrarTemporada(sSerie,iNumTemporada){
        var oSerie=this.buscarProduccion(sSerie);
        for(var i=0; i<oSerie.aTemporadas.length;i++){
            if(oSerie.aTemporadas[i].iNumTemporada==iNumTemporada){
                oSerie.aTemporadas.splice(i,1);
                return true;//usuario eliminado
            }
        }
        return false;//usuario no encontrado
    }

    bajaUsuario(sUsuario){
        for(var i=0; i<this.aUsuarios.length;i++){
            if(this.aUsuarios[i].sUser==sUsuario){
                this.aUsuarios.splice(i,1);
                return true;//usuario eliminado
            }
        }
        return false;//usuario no encontrado
    }

    bajaProduccion(titulo){
        for(var i=0; i<this.aProducciones.length;i++){
            if(this.aProducciones[i].sTitulo==titulo){
                for(var j=0;j<this.aUsuarios.length;j++){
                    for(var k=0;k<this.aUsuarios[j].aFavoritos.length;k++){
                        if(this.aUsuarios[j].aFavoritos[k].sTitulo==titulo){
                            this.aUsuarios[j].aFavoritos.splice(k,1);
                        }
                    }
                }
                this.aProducciones.splice(i,1);
                return true;//producción eliminada
            }
        }
        return false;//produccion no encontrada
    }

    bajaPersona(nombre,apellido){
        for(var i=0; i<this.aPersonas.length;i++){
            if(this.aPersonas[i].sNombre==nombre && this.aPersonas[i].sApellido==apellido){
                for(var j=0;j<this.aProducciones.length;j++){
                    for(var k=0;k<this.aProducciones[j].aActores.length;k++){
                        if(this.aProducciones[j].aActores[k].sNombre==nombre && this.aProducciones[j].aActores[k].sApellido==apellido){
                            this.aProducciones[j].aActores.splice(k,1);
                        } 
                    }
                    for(var k=0;k<this.aProducciones[j].aDirectores.length;k++){
                        if(this.aProducciones[j].aDirectores[k].sNombre==nombre && this.aProducciones[j].aDirectores[k].sApellido==apellido){
                            this.aProducciones[j].aDirectores.splice(k,1);
                        } 
                    }
                }
                this.aPersonas.splice(i,1);
                return true;//persona eliminada
            }
        }
        return false;//persona no encontrada
    }
    
    buscarUsuario(sUsuario){
        var array=this.aUsuarios.filter(Usuario=>Usuario.sUser==sUsuario);
        if(array.length>0)
            return array[0];
        else
            return null;
    }

    buscarProduccion(titulo){
        var array=this.aProducciones.filter(Produccion=>Produccion.sTitulo==titulo);
        if(array.length>0)
            return array[0];
        else
            return null;
    }
    añadirFavorito(titulo){
        var oProduccion=this.buscarProduccion(titulo);
        this.oUsuarioActivo.aFavoritos.push(oProduccion);
        return true;//produccion añadida a favoritos
    }

    eliminarFavorito(titulo){
        for(var i=0;i<this.oUsuarioActivo.aFavoritos.length;i++){
            if(this.oUsuarioActivo.aFavoritos[i].sTitulo==titulo){
                this.oUsuarioActivo.aFavoritos.splice(i,1);
                return true;//favorito eliminado
            }
        }
        return false;//favorito no encontrado
    }

    puntuar(nota,titulo){
        var oProduccionBuscada=this.buscarProduccion(titulo);

        var oPuntuacion=new Puntuacion(this.oUsuarioActivo,nota);
        var resultado=true;//puntuacion añadida
        var notaTotal=0;
        for(var i=0; i<oProduccionBuscada.aPuntuaciones.length;i++){
            if(oProduccionBuscada.aPuntuaciones[i].oUsuario.sUser==this.oUsuarioActivo.sUser){
                oProduccionBuscada.aPuntuaciones[i].iNota=nota;
                resultado= false;//cambiada
            }
        }
        var oPuntuacion=new Puntuacion(this.oUsuarioActivo,nota);
        oProduccionBuscada.aPuntuaciones.push(oPuntuacion);

        for(var i=0;i<oProduccionBuscada.aPuntuaciones.length;i++){
            notaTotal+=oProduccionBuscada.aPuntuaciones[i].iNota;
        }
        oProduccionBuscada.fNotaMedia=(notaTotal/oProduccionBuscada.aPuntuaciones.length).toPrecision(2);
        return resultado;

    }
    /*puntuarSinUsuarioActivo(user,nota,titulo){
        var oProduccionBuscada=this.buscarProduccion(titulo);
        var oUsuarioBuscado=this.buscarUsuario(user);
        var oPuntuacion=new Puntuacion(oUsuarioBuscado,nota);
        for(var i=0; i<oProduccion.aPuntuaciones.length;i++){
            if(oProduccionBuscada.aPuntuaciones[i].oUsuario.sUser==oUsuarioBuscado.sUser){
                oProduccionBuscada.aPuntuaciones[i].iNota=nota;
                return false;//puntuacion cambiada
            }
        }
        oProduccionBuscada.aPuntuaciones.push(oPuntuacion);
        return true;//puntuacion añadida
    }*/
    
    añadirTemporada(titulo,numTemporada,resumen){
        var oProduccionBuscada=this.buscarProduccion(titulo);
        var oTemporada=this.buscarTemporada(titulo,numTemporada);
        if(oTemporada==null){
            oTemporada=new Temporada(numTemporada,resumen);
            oProduccionBuscada.aTemporadas.push(oTemporada);
            oProduccionBuscada.aTemporadas.sort(function(a,b){
                if(b.iNumTemporada<a.iNumTemporada){
                    return 1;
                }
                else if(b.iNumTemporada>a.iNumTemporada){
                    return -1;
                }
                else{
                    return 0;
                }
            });
            return true;
        }else{
            return false;
        }
    }

    añadirCapitulo(titulo,numTemporada,numCapitulo,resumen){
        var oProduccionBuscada=this.buscarProduccion(titulo);
        var oCapitulo=new Capitulo(numCapitulo,resumen);
        if(oProduccionBuscada instanceof Serie){
            for(var i=0;i<oProduccionBuscada.aTemporadas.length;i++){
                if(oProduccionBuscada.aTemporadas[i].iNumTemporada==numTemporada){
                    for(var p=0;oProduccionBuscada.aTemporadas[i].aCapitulos.length;p++){
                        if(oProduccionBuscada.aTemporadas[i].aCapitulos[p].iNumCapitulo==numCapitulo){
                            return 1;//el capítulo ya había sido introducido
                        }
                    }
                    oProduccionBuscada.aTemporadas[i].aCapitulos.push(oCapitulo);
                    oProduccionBuscada.aTemporadas[i].aCapitulos.sort(function(a,b){
                        if(b.iNumCapitulo<a.iNumCapitulo){
                            return 1;
                        }
                        else if(b.iNumCapitulo>a.iNumCapitulo){
                            return -1;
                        }
                        else{
                            return 0;
                        }
                    });
                    return 2;//el capítulo ha sido introducido
                }
            }
        }
        else{
            return 0;//ha introducido una película
        }
    }
    
    modificarUsuario(nombre,apellido,email,contraseña,rol){
        this.oUsuarioActivo.sNombre=nombre;
        this.oUsuarioActivo.sApellido=apellido;
        this.oUsuarioActivo.sEmail=email;
        this.oUsuarioActivo.sContraseña=contraseña;
        this.oUsuarioActivo.sRol=rol;
        return true; //usuario modificado
    }

    modificarPersona(oPersona,sNNombre,sAApellido){
        for(var i=0;i<this.aPersonas.length;i++){
            if(this.aPersonas[i].sNombre==oPersona.sNombre && this.aPersonas[i].sApellido==oPersona.sApellido){
                this.aPersonas[i].sNombre=sNNombre;
                this.aPersonas[i].sApellido=sAApellido;
                return true;
            }
        }
    }

    modificarPelicula(){

    }
    modificarSerie(){

    }

    modificarCapitulo(){

    }

    modificarTemporada(sSerie,iNumTemporada,iNuevoNumero,sResumen){
        var temporada=this.buscarTemporada(sSerie,iNumTemporada);
        temporada.iNumTemporada=iNuevoNumero;
        temporada.sResumen=sResumen;
    }
    
    añadeActor(aActores,actor){
        for(var i=0;i<aActores.length;i++){
            if(aActores[i].sNombre==actor.sNombre && aActores[i].sApellido==actor.sApellido){
                return aActores;
            }
        }
        return aActores.push(actor);
    }

    añadeDirector(aDirectores,director){
        for(var i=0;i<aDirectores.length;i++){
            if(aDirectores[i].sNombre==director.sNombre && aDirectores[i].sApellido==director.sApellido){
                return aDirectores;
            }
        }

        return aDirectores.push(director);
    }

    
    buscarSerie(genero,fechaInicio,fechaFin,puntuacion){
        var aSeries=this.aProducciones.filter(Produccion=>Produccion instanceof Serie);
        var resultado=[];
        if(genero!="cualquiera"){
            resultado=aSeries.filter(Serie=>Serie.sGenero==genero);
        }
        else{
            resultado=aSeries;
        }
        if(fechaInicio!=null){
            resultado=resultado.filter(Serie=>Serie.dFechaInicio>=fechaInicio);
        }
        if(fechaFin!=null){
            resultado=resultado.filter(Serie=>Serie.dFechaFin<=fechaFin);
        }
        if(puntuacion>0){
            resultado=resultado.filter(Serie=>Serie.fNotaMedia>=puntuacion);
        }
        return resultado;

        }
        
    buscarPelicula(genero,dAñoInicio,dAñoFin,puntuacion){
        var aPeliculas=this.aProducciones.filter(Produccion=>Produccion instanceof Pelicula);
        var resultado=[];
        var añoInicio=0;
        var añoFin=0;
        if(dAñoInicio!=null){añoInicio=dAñoInicio.getFullYear();}
        if(dAñoFin!=null){añoFin=dAñoFin.getFullYear();}
        
        if(genero!="cualquiera"){
            resultado=aPeliculas.filter(Pelicula=>Pelicula.sGenero==genero);
        }
        else{
            resultado=aPeliculas;
        }
        if(añoInicio!=0){
            resultado=resultado.filter(Pelicula=>Pelicula.iAñoEstreno>=añoInicio);
        }
        if(añoFin!=0){
            resultado=resultado.filter(Pelicula=>Pelicula.iAñoEstreno<=añoFin);
        }
        if(puntuacion>0){
            resultado=resultado.filter(Pelicula=>Pelicula.fNotaMedia>=puntuacion);
        }
        return resultado;
    }
    
}
