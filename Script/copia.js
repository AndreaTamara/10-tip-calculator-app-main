//variables de entrada
let bill
let tip = 0
let people
//variables de salida
let tipXperson
let totalXperson
//variables para modificón del DOM
let tipSelected = null// igual al elemento  button seleccionado o input custom value
let errorQPeople //igual al div que contiene el error
let resetActive // igual al button reset
let showTip // igual al div que muestra el resultado tip
let showTotal // igual al div que muestra el resultado total



// me devuelve la propina seleccionada, se ejecuta en la funcion principal de calcular los totales
function selectTip(t) {
  //valido si ya hay un valor de propina y si el que tenía es diferente al nuevo valor deseado
  if (tip && tip !== t) {
    //valido si la propina anterior procedia de un btn, es decir si habia un boton seleccinado.De ser así, 
    //borro los estilos de ese btn y reseto la variable tipSelected
    //NUEVA ES DIFERENTE DE VIEJA Y VIEJA PROVIENE DE UN BTN
    if (tipSelected) {
      tipSelected = null
      document.getElementById(tip + "tip").classList.remove("active_tip")
      //valido si el campo custom está vacío, lo que significa que la nueva proprina proviene de un btn
      //y tengo que colocarle el estilo de seleccionado, si custom está lleno entonces no debo activar ningun estilo
      //NUEVA ES DIFERENTE DE VIEJA, VIEJA PROVIENE DE UN BTN Y NUEVA ES UN BTN
      if (document.getElementById("custom").value == "") {
        tipSelected = document.getElementById(t + "tip")
        tipSelected.classList.add("active_tip")
      }
      //si la propina anterior no provine de un boton, no debo desactivar nada, 
      //pero debo revisar de donde proviene la nueva, si custom está vacio o es igual al valor de propina anterior,/
      //significa que la nueva propina es un boton, por lo que debo activar los estilos de ese btn y borrar 
      //lo que estaba en custom
      //NUEVA ES DIFERENTE DE VIEJA, VIEJA NO ES UN BTN Y NUEVA ES UN BTN
    } else if (document.getElementById("custom").value == "" || document.getElementById("custom").value == tip) {
      tipSelected = document.getElementById(t + "tip")
      tipSelected.classList.add("active_tip")
      document.getElementById("custom").value = ""
      //si custom no está vacio y no es igual al valor de la vieja propina,
      // significa que el nuevo valor si viene de custom, entonces no debo resetear  nada
    }
    //en caso de que la nueva propina y la vieja sean iguales y que no exista 
    //un tip previo (osea sea la primera corrida), valido si custom está vacio,
    // de estarlo,la nueva es un boton y por ende la vieja tambn, si hay un valor previo ya estará con el estilo activdo, 
    //pero si es la primera corrida, debo activarlo
    //si custom no está vacio, tanto la nueva como la vieja son custom, y no tengo que hacer nada.
    // NUEVA ES IGUAL A VIEJA Y TANTO NUEVA COMO VIEJA SON BTN Ó ES LA PRIMERA CORRIDA Y NO HAY VALOR PREVIO
  } else if (document.getElementById("custom").value == "") {
    tipSelected = document.getElementById(t + "tip")
    tipSelected.classList.add("active_tip")
  }
  //para todos los casos, la neuva propina debe actualizarse.
  tip = t

  calculateTipAndTotal()
}


function calculateTipAndTotal() {

  resetError()

  if (document.getElementById("people").value != 0) {

    bill = document.getElementById("bill").value
    people = document.getElementById("people").value
    tipXperson = ((bill * (tip / 100)) / people).toFixed(2)
    totalXperson = (bill * (1 + (tip / 100)) / people).toFixed(2)
    showTip = document.getElementById("tipxperson")
    showTip.textContent = "$" + tipXperson
    showTotal = document.getElementById("totalxperson")
    showTotal.textContent = "$" + totalXperson
    resetActive = document.getElementById("reset")
    resetActive.classList.remove("inactive")
    resetActive.classList.add("active_reset")
  } else {
    errorQPeople = document.getElementById("error_msn")
    errorQPeople.textContent = "can't be zero"
    document.getElementById("people").classList.add("border_error")
  }

}


function resetAll() {

  if (document.getElementById("custom").value == "") {
    tipSelected.classList.remove("active_tip")
  }
  document.getElementById("bill").value = ""
  document.getElementById("people").value = ""
  document.getElementById("custom").value = ""
  showTip.textContent = "$0.00"
  showTotal.textContent = "$0.00"
  resetActive.classList.add("inactive")
  resetActive.classList.remove("active_reset")
  tip = 0
  resetError()

}

function resetError() {
  errorQPeople = document.getElementById("error_msn")
  errorQPeople.textContent = ""
  document.getElementById("people").classList.remove("border_error")
}


