// DOM Elements
const currencyOne = document.getElementById('currency__one')
const currencyTwo = document.getElementById('currency__two')
const amountOne = document.getElementById('amount__one')
const amountTwo = document.getElementById('amount__two')
const resultBox = document.getElementById('result')
const swipeBtn = document.getElementById('swipe')
const timeBoxLast = document.getElementById('timeLast')
const timeBoxNext = document.getElementById('timeNext')
const amountSending = document.getElementById('amount__sending')
const amountReceived = document.getElementById('amount__received')
const titleInfo = document.querySelector('.sub__title')

function getExchangeRate() {
  // API key
  let apiKey = 'da8f1ba92578cbd11252e612'
  // Get select input
  const selectOneVal = currencyOne.value
  const selectTwoVal = currencyTwo.value
  
  // Get data from API
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectOneVal}`)
  // Get responses to json format
  .then(response => response.json())
  // Use data to get exchange
  .then(data => {
    // Get rate
    const rate = data.conversion_rates[selectTwoVal]

    // Insert rate
    resultBox.innerHTML = `<b>1</b> ${selectOneVal} = <b>${rate}</b> ${selectTwoVal}`

    if (selectOneVal == 'XOF') {
      // Fix amount
      const myString = (parseInt(amountOne.value) * 0.02);
      // Fix Total amount to send
      const total = new Intl.NumberFormat().format((parseInt(amountOne.value) + myString))

      // Fix total amount to receive
      amountTwo.value = ((amountOne.value * rate) * 0.98544233).toFixed(2)
      const finalAmount = new Intl.NumberFormat().format(amountTwo.value)

      // Insertion to div
      amountSending.innerHTML = `${total} FCFA`
      amountReceived.innerHTML = `${finalAmount} RUB`
      titleInfo.style.display = 'block'
    } else {
      amountTwo.value = (amountOne.value * rate).toFixed(2)
      titleInfo.style.display = 'none'
    }
  })
  .catch(() => {
    // Set error
    resultBox.innerHTML = 'Une erreur est survenue...'
  })
}

// Event Listner
currencyOne.addEventListener('change', getExchangeRate)
amountOne.addEventListener('input', getExchangeRate)

currencyTwo.addEventListener('change', getExchangeRate)
amountTwo.addEventListener('input', getExchangeRate)

// Changing rate
swipeBtn.addEventListener('click', () => {
  const change = currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = change

  getExchangeRate()
})

// Call function
getExchangeRate()