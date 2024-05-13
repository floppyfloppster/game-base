import Bottleneck from "bottleneck"

const limiter = new Bottleneck({
  minTime: 200 // 5 requests per second
})

function throttleFetch(url, options) {
  return limiter.schedule(() => fetch(url, options))
}


export function setup(element) {
  console.log("Hello from apitest.js")
  // handshake with server to test CORS
  const url = "http://localhost:3000"
  throttleFetch(url)
    .then((response) => response.text())
    .then((text) => {
      console.log(text)
    })
    .catch((error) => {
      console.error(error)
    })

  element.innerHTML = `
    <h2>Score</h2>
    <button id="postScore">Post Score</button>
    <button id="getScore">Get Score</button>
  `

  document.querySelector("#postScore").addEventListener("click", () => {
    postScore(100)
  })

  document.querySelector("#getScore").addEventListener("click", () => {
    getScore()
  })
}

export function postScore(score) {
  const url = "http://localhost:3000"
  const data = { score }
  throttleFetch(`${url}/score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((text) => {
      console.log(text)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function getScore() {
  const url = "http://localhost:3000"
  throttleFetch(`${url}/score`)
    .then((response) => response.text())
    .then((text) => {
      console.log(text)
    })
    .catch((error) => {
      console.error(error)
    })
}