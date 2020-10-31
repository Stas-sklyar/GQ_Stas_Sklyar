const quoteGeneration = document.getElementById("quoteGeneration")
const sendTwitter = document.getElementById("sendTwitter")
const quote = document.getElementById("quote")
const quoteAuthor = document.getElementById("quoteAuthor")
const loader = document.getElementById("loader")
const quoteWrapper = document.getElementById("quoteWrapper")

function generatingQuote() {
    fetch('https://stormy-waters-81463.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
        .then(request => request.json())
        .then(data => {
            (data.quoteText) ? quote.innerHTML = data.quoteText : quote.innerHTML = 'Error';
            (data.quoteAuthor) ? quoteAuthor.innerHTML = data.quoteAuthor : quoteAuthor.innerHTML = 'Unknown';
        })
        .catch(() => {
            generatingQuote()
        });
}

generatingQuote()


quoteGeneration.addEventListener('click', function () {
    quoteGeneration.setAttribute("disabled", "disabled")
    sendTwitter.setAttribute("disabled", "disabled")
    loader.classList.toggle('loader--active')
    quoteWrapper.classList.toggle('quote__body--active')

    generatingQuote()

    setTimeout(() => {
        quoteWrapper.classList.toggle('quote__body--active')
        loader.classList.toggle('loader--active')
        quoteGeneration.removeAttribute('disabled')
        sendTwitter.removeAttribute('disabled')
    }, 1500);

})

sendTwitter.addEventListener('click', () => {
    window.open(`https://twitter.com/intent/tweet?text="${quote.innerText}" ${quoteAuthor.innerText}`)
})

