function holaMundo() {
    return "Hola Mundo" 
}

function suma(a,b,c,d) {
    return a + b + c + d 
}

function multiplicacion(n1,n2) {
    return n1 * n2 
}

function charName (x) {
 switch(x) {
  case 'a':
    return "Antonio"
  case 'b':
    return "Benito"
  case 'c':
    return "Claudio"
  default:
    return "Otro:"+x
 }
}

function imcTell (imc) {
  if( imc <= 18.5 ) {
    return "Tienes infrapeso" 
  } else if( imc <= 25.0 ) {
    return "Supuestamente eres normal..." 
  } else if( imc <=30.0 ) {
    return "¡Estas fordo!" 
  } else {
       return "¡Enhorabuena, eres una ballena!" 
  }
}

function imcCalculated (peso,altura) {
  if( (peso / Math.pow(altura, 2)) <= 18.5 ) {
    return "Tienes infrapeso" 
  } else if( (peso / Math.pow(altura, 2)) <= 25.0 ) {
    return "Supuestamente eres normal..." 
  } else if( (peso / Math.pow(altura, 2)) <= 30.0 ) {
    return "¡Estas fordo! Pierde peso gordito" 
  } else {
       return "¡Enhorabuena, eres una ballena!" 
  }
}

function imcCalculatedWhere (peso,altura) {
  let imc=peso/Math.pow(altura, 2)
  if( imc <= 18.5 ) {
    return "Tienes infrapeso, ¿Eres emo?" 
  } else if( imc <= 25.0 ) {
    return "Supuestamente eres normal..." 
  } else if( imc <= 30.0 ) {
    return "¡Estas fordo! Pierde peso gordito" 
  } else {
       return "¡Enhorabuena, eres una ballena!" 
  }
}
