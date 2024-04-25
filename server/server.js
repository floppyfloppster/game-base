import Express from "express"
import cors from "cors"
import { rateLimit } from 'express-rate-limit'
const app = Express()

const PORT = 3000 || process.env.PORT

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

app.use(limiter)
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // restrict calls to those this address
  methods: 'GET,POST' // only allow these verbs
}))

app.get("/", (req, res) => {
  console.log('request received from client', req.headers.origin)
  res.send("Hello World!")
})

app.post("/score", (req, res) => {
  // Här behöver vi prata med databasen och spara hiscoren
  console.log('request received from client', req.headers.origin)
  console.log('request body', req.body)
  res.send("Score received!")
})

app.get("/score", (req, res) => {
  // här behöver vi prata med databasen och hämta hiscoren
  console.log('request received from client', req.headers.origin)
  res.send("Score requested!")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})