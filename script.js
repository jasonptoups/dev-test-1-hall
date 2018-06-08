const googleURL = 'https://script.google.com/macros/s/AKfycbzNjXa3WZ22hIiNd4hx7uYqYCzpx2UbFxMQ15RZhVhFtWPqMEY/exec'
const form = document.forms['email-form']
console.log(form)

form.addEventListener('submit', event => {
  event.preventDefault()
  if (validateData(event) === 'good') {
    fetch(googleURL,
      {
        method: 'POST',
        body: new FormData(form)
      }
    )
      .then(res => {
        event.target[0].value = ''
        event.target[1].value = ''
      })
      .catch(error => console.error('error:', error.message))
  }
})

function validateData (event) {
  let email = event.target[0].value
  let zip = event.target[1].value
  let errorMessage = document.querySelector('.errors')
  errorMessage.innerHTML = ''
  const validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const numbers = new RegExp(/^\d+$/)
  let errors = []

  if (validEmail.test(email) === false) errors.push('Please use a valid email')

  if (zip.length !== 5) errors.push('Please include a 5-digit zip code')

  if (numbers.test(zip) === false) errors.push('Please use only numbers in the zip code')

  errors.forEach(error => {
    let p = document.createElement('p')
    p.appendChild(document.createTextNode(error))
    errorMessage.appendChild(p)
  })

  if (errors.length === 0) return 'good'
}
