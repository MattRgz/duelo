///////////////////////////////////////////////////////////////////////////////////// CARDS

class Card{
    constructor(img,nombre,costo,jugador){
        this.jugador = jugador;
        this.img = img;
        this.nombre=nombre;
        this.costo=costo;
    }
    getIn(){
        console.log(`${this.jugador}, ha invocado a ${this.nombre}!`);
    }
    
}
///////////////////////////////////////////////////////////////////////////////////// UNIT
class Unit extends Card{
    constructor(img,nombre,costo,poder,resiliencia,jugador){
        super(img,nombre,costo);
        this.jugador = jugador;
        this.img = img;
        this.nombre = nombre;
        this.costo = costo;
        this.poder = poder;
        this.resiliencia = resiliencia;
    }
    atack(target){
        if( target instanceof Unit){
            console.log(`${this.jugador}, a atacado con ${this.nombre} a ${target.nombre}`)
            target.resiliencia = (target.resiliencia - this.poder)
            target.resiliencia <= 0
                ? console.log(`${target.jugador}, tu ${target.nombre} se ha quedado sin puntos de resiliencia, Haz perdido!`)
                : console.log(`${target.jugador}, tu ${target.nombre} tiene ${target.resiliencia} puntos de resiliencia!`)
        }
        else{
            throw new Error( "Target must be a unit!" );
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////// EFFECT

class Effect extends Card{
    constructor(img, nombre, costo, stat, magnitud,jugador, texto){
        super(img,nombre,costo);
        this.jugador = jugador;
        this.img = img;
        this.nombre = nombre;
        this.costo = costo;
        this.stat = stat;
        this.magnitud = magnitud;
        this.texto = texto;
    }
    useEffect(target){
        if( target instanceof Unit){
            console.log(`${this.jugador}, a utilizado ${this.nombre} en ${target.nombre}`);
            if(this.stat === 'Resiliencia'){
                target.resiliencia = (target.resiliencia + this.magnitud)
                target.resiliencia <= 0
                    ? console.log(`${target.jugador},ha perdido!`)
                    : console.log(`${target.jugador}, tu ${target.nombre} tiene ${target.resiliencia} puntos de resiliencia!`)
            }
            else{
                target.poder = (target.poder + this.magnitud)
                console.log(`${target.jugador}, tu ${target.nombre} tiene ${target.poder} puntos de poder!`)
            }
        }
        else{
            throw new Error( "Target must be a unit!" );
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////// CREATING CARDS


let cinturonRojo = new Unit( undefined ,'Ninja Cinturon Rojo',3,3,4,'Jugador 1');
let cinturonNegro = new Unit( undefined ,'Ninja Cinturon Negro',4,5,4,'Jugador 2');
let algoDif = new Effect(undefined, 'Algoritmo Dificil',2,'Resiliencia',3,'Jugador 1','Aumentar la resistencia del objetivo en 3');
let rejectPromise = new Effect(undefined, 'Rechazo de promesa no manejado',1,'Resiliencia',(-2),'Jugador 2','Reducir la resistencia del objetivo en 2');
let pairProgramming = new Effect(undefined, 'Programacion en pareja',3,'Poder',2,'Jugador 1','Aumentar el poder del objetivo en 2');


///////////////////////////////////////////////////////////////////////////////////// LETS PLAY!

cinturonRojo.getIn();
algoDif.useEffect(cinturonRojo);
cinturonNegro.getIn();
rejectPromise.useEffect(cinturonRojo);
pairProgramming.useEffect(cinturonRojo);
cinturonRojo.atack(cinturonNegro);
