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

function Produccion(titulo,genero,actores,directores,paises,resumen){
    this.sTitulo=titulo;
    this.sGenero=genero;
    this.aPuntuaciones=[];
    this.aActores=actores;
    this.aDirectores=directores;
    this.aPaises=paises;
    this.sresumen=resumen;

}

function Serie(titulo,genero,actores,directores,paises,resumen,fechaInicio,fechaFin){
    Produccion.call(this,titulo,genero,actores,directores,paises,resumen);
    this.dFechaInicio=fechaInicio;
    this.dFechaFin=fechaFin;
    this.aTemporadas=[];
}

Serie.prototype=Object.create(Produccion.prototype);
Serie.prototype.constructor=Produccion;

function Peliculas(titulo,genero,actores,directores,paises,resumen,añoEstreno,duracion){
    Produccion.call(this,titulo,genero,actores,directores,paises,resumen);
    this.iAñoEstreno=añoEstreno;
    this.iDuracion=duracion;
}

Peliculas.prototype=Object.create(Produccion.prototype);
Peliculas.prototype.constructor=Produccion;

function Persona(nombre,apellido,pais,nacimiento){
    this.sApellido=apellido;
    this.sNombre=nombre;
    this.spais=pais;
    this.dNacimiento=nacimiento;
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

function Puntuacion(usuario,nota,produccion){
    this.oUsuario=usuario;
    this.iNota=nota;
    this.oProduccion=produccion;
}

class Upoflix{
    constructor(){
        this.oUsuarioActivo=null;
        this.aUsuarios=[];
        this.aProducciones=[];
        this.aPersonas=[];
    }

    iniciarSesion(sUsuario,contraseña){
        oUsuario=this.buscarUsuario(sUsuario);
        if(oUsuario==null){
            return "El usuario no existe.";
        }
        else{
            if(oUsuario.sContraseña==contraseña){
                this.oUsuarioActivo=oUsuario;
                return "Sesión iniciada.";
            }
            else
                return "La contraseña no es válida.";
        }
    }

    cerrarSesion(){
        this.oUsuarioActivo=null;
        return "La sesion ha sido cerrada.";
    }

    añadirProduccion (produccion){
        var array=this.aProducciones.filter(Produccion => Produccion.sTitulo==produccion.sTitulo);

        if(array.length>0)
            return "La producción ya existía.";
        else{
            this.aProducciones.push(produccion);
            return "La producion ha sido dado de alta.";
        }
        
    }

    altaUsuario(usuario){
        var array=this.aUsuarios.filter(Usuario=>Usuario.sUser==usuario.sUser);

        if(array.length>0)
            return "el usuario ya existía.";
        else{
            this.aUsuarios.push(usuario);
            return "El usuario se ha registrado con éxito.";    
        }
    }

    altaPersona(persona){
        var array=this.aUsuarios.filter(Persona=>Persona.sNombre==persona.sApellido && Persona.sApellido==persona.sApellido);

        if(array.length>0)
            return "Esa persona ya existía.";
        else{
            this.aPersonas.push(persona);
            return "La persona se ha registrado con éxito.";    
        }
    }

    bajaUsuario(sUsuario){
        for(var i=0; i<this.aUsuarios.length;i++){
            if(this.aUsuarios[i].sUser==sUsuario){
                this.aUsuarios.splice(i,1);
                return "El usuario ha sido eliminado.";
            }
        }
        return "El usuario no estaba registrado.";
    }

    bajaProduccion(titulo){
        for(var i=0; i<this.aProducciones.length;i++){
            if(this.aProducciones[i].sTitulo==titulo){
                this.aProducciones.splice(i,1);
                return "La produccion ha sido eliminada.";
            }
        }
        return "La produccion no estaba registrada.";
    }

    bajaPersona(nombre,apellido){
        for(var i=0; i<this.aPersonas.length;i++){
            if(this.aPersonas[i].sNombre==nombre && this.aPersonas[i].sApellido==apellido){
                this.aPersonas.splice(i,1);
                return "La persona ha sido eliminada.";
            }
        }
        return "La persona no estaba registrada.";
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
        oProduccion=this.buscarProduccion(titulo);

        this.oUsuarioActivo.aFavoritos.push(oProduccion);
        return "Ha sido añadido a favoritos.";
    }

    eliminarFavorito(titulo){
        for(var i=0;i<this.oUsuarioActivo.aFavoritos.length;i++){
            if(aFavoritos[i].sTitulo==titulo){
                this.oUsuarioActivo.aFavoritos.splice(i,1);
                return "Favorito eliminado.";
            }
        }
        return "El favorito ya había sido eliminado.";
    }

    puntuar(nota,titulo){
        oProduccionBuscada=this.buscarProduccion(titulo);
        oPuntuacion=new Puntuacion(this.oUsuarioActivo,nota,oProduccionBuscada);
        for(var i=0; i<oProduccion.aPuntuaciones.length;i++){
            if(oProduccionBuscada.aPuntuaciones[i].oProduccion.titulo==titulo && this.oProduccionBuscada.aPuntuaciones[i].oUsuario.sUser==this.oUsuarioActivo.sUser){
                oProduccionBuscada.aPuntuaciones.splice(i,1);
                oProduccionBuscada.aPuntuaciones.push(oPuntuacion);
                return "Puntuación cambiada.";
            }
        }
        oProduccionBuscada.aPuntuaciones.push(oPuntuacion);
        return "Puntuación añadida.";
    }

    añadirTemporada(titulo,numTemporada,resumen){
        oProduccionBuscada=this.buscarProduccion(titulo);
        oTemporada=new Temporada(numTemporada,resumen);

        if(oProduccionBuscada instanceof Serie){
            for(var i=0;i<oProduccionBuscada.aTemporadas.length;i++){
                if(oProduccionBuscada.aTemporadas[i].iNumTemporada==numTemporada){
                    return "La temporada ya había sido introducida.";
                }
            }
            oProduccionBuscada.aTemporadas.push(oTemporada);
            return "La temporada ha sido introducida.";
        }
        else{
            return "Ha introducido una película.";
        }
    }

    añadirCapitulo(titulo,numTemporada,numCapitulo,resumen){
        oProduccionBuscada=this.buscarProduccion(titulo);
        oCapitulo=new Capitulo(numCapitulo,resumen);
        if(oProduccionBuscada instanceof Serie){
            for(var i=0;i<oProduccionBuscada.aTemporadas.length;i++){
                if(oProduccionBuscada.aTemporadas[i].iNumTemporada==numTemporada){
                    for(var p=0;oProduccionBuscada.aTemporadas[i].aCapitulos.length;p++){
                        if(oProduccionBuscada.aTemporadas[i].aCapitulos[p].iNumCapitulo==numCapitulo){
                            return "El capítulo ya había sido introducida.";
                        }
                    }
                    oProduccionBuscada.aTemporadas[i].aCapitulos.push(oCapitulo);
                    return "El capítulo ha sido introducido";
                }
            }
        }
        else{
            return "Ha introducido una película.";
        }
    }
    

                
    
}
