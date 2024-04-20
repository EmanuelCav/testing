import express from 'express';
import path from 'path';
import morgan from 'morgan';
import passport from 'passport';
import { fileURLToPath } from 'url'

import { addLogger } from './lib/logger.js'

import userRoute from './routes/users.routes.js'
import productRoute from './routes/products.routes.js'
import cartRoute from './routes/carts.routes.js'
import loggerRoute from './routes/logger.routes.js'
import messageRoute from './routes/message.routes.js'
import mocksRoute from './routes/mocks.routes.js'

const app = express()

app.use(addLogger)
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(passport.initialize())

app.use(userRoute)
app.use(productRoute)
app.use(cartRoute)
app.use(loggerRoute)
app.use(messageRoute)
app.use(mocksRoute)

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "../public")))

export default app