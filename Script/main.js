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


function selectTip(t) {
  
  if (tip && tip !== t) {
    
    if (tipSelected) {
      tipSelected = null
      document.getElementById(tip + "tip").classList.remove("active_tip")
      
      if (document.getElementById("custom").value == "") {
        
        tipSelected = document.getElementById(t + "tip")
        tipSelected.classList.add("active_tip")

      }
      
    } else if (document.getElementById("custom").value == "" || document.getElementById("custom").value == tip) {
      
      tipSelected = document.getElementById(t + "tip")
      tipSelected.classList.add("active_tip")
      document.getElementById("custom").value = ""
      
    }
    
  } else if (document.getElementById("custom").value == "") {

    tipSelected = document.getElementById(t + "tip")
    tipSelected.classList.add("active_tip")
  }
  
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


