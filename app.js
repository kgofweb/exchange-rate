const currencyOne = document.getElementById('currency__one')
const currencyTwo = document.getElementById('currency__two')
const amountOne = document.getElementById('amount__one')
const amountTwo = document.getElementById('amount__two')
const resultBox = document.getElementById('result')

function getExchangeRate() {
  // API key
  let apiKey = '22152b19b5da360f0b31aa21'
  // Get select input
  const selectOneVal = currencyOne.value
  const selectTwoVal = currencyTwo.value

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selectOneVal}`)
  .then(response => response.json())
  .then(data => {
    const rate = data.conversion_rates[selectTwoVal]

    // console.log(data);

    resultBox.innerHTML = `<b>1</b> ${selectOneVal} = <b>${rate}</b> ${selectTwoVal}`

    amountTwo.value = (amountOne.value * rate)
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


getExchangeRate()
