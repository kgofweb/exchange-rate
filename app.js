const currencyOne = document.getElementById('currency__one')
const currencyTwo = document.getElementById('currency__two')
const amountOne = document.getElementById('amount__one')
const amountTwo = document.getElementById('amount__two')
const resultBox = document.getElementById('result')
const swipeBtn = document.getElementById('swipe')
const timeBoxLast = document.getElementById('timeLast')
const timeBoxNext = document.getElementById('timeNext')
const amountSending = document.getElementById('amount__sending')

function getExchangeRate() {
  // API key
  let apiKey = 'da8f1ba92578cbd11252e612'
  // Get select input
  const selectOneVal = currencyOne.value
  const selectTwoVal = currencyTwo.value
  

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectOneVal}`)
  .then(response => response.json())
  .then(data => {
    const rate = data.conversion_rates[selectTwoVal]

    resultBox.innerHTML = `<b>1</b> ${selectOneVal} = <b>${rate}</b> ${selectTwoVal}`

    amountTwo.value = (amountOne.value * rate).toFixed(2)

    if (selectOneVal == 'XOF') {
      const myString = (parseInt(amountOne.value) * 0.02);
      const total = (parseInt(amountOne.value) + myString)
      amountSending.innerHTML = `${total} FCFA`
      amountSending.style.display = 'flex'
    } else {
      amountSending.style.display = 'none'
    }
  })
  .catch(() => {
    resultBox.innerHTML = 'Une erreur est survenue...'
  })
}

// Event Listner
currencyOne.addEventListener('change', getExchangeRate)
amountOne.addEventListener('input', getExchangeRate)

currencyTwo.addEventListener('change', getExchangeRate)
amountTwo.addEventListener('input', getExchangeRate)

swipeBtn.addEventListener('click', () => {
  const change = currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = change

  getExchangeRate()
})

getExchangeRate()
