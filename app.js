/* eslint-disable no-undef */
import createError from 'http-errors'

import express, { json, urlencoded} from 'express'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import session from 'express-session'
import pkg from 'passport'
import LocalStrategy from 'passport-local'
import MongoStore from 'connect-mongo';
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import uploadRouter from './routes/upload.js'
import profileRouter from './routes/profile.js'
import createRouter from './routes/create.js'
import followRouter from './routes/follow.js'
import unfollowRouter from './routes/unfollow.js'
import followInfoRouter from './routes/followinfo.js'
import reelsRouter from './routes/reels.js'
import photosRouter from './routes/photos.js'
import likeRouter from './routes/like.js'
import finduserRouter from './routes/findusers.js'
import exploreRouter from './routes/explore.js'
import postsRouter from './routes/posts.js'
import userModel from './db/models/user.js';
import flash from 'connect-flash'
import { verifyPassword } from './utils/hashgen.js'
let app = express()
// view engine setup
app.set('views', __dirname+'/views')
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname+'/public'))
app.use(express.static(__dirname+'/uploads'))
const store =  MongoStore.create({
	mongoUrl: 'mongodb://localhost:27017/socialm',
	collectionName:'sessions',
})

store.on('error', function (err) {
	console.error(err)
})
app.use(
	session({
		secret: 'monza',
		resave: false,
		saveUninitialized: false,
		store: store,
		cookie: {
			maxAge: 1000 * 3600,
		},
	})
)
app.use(flash())
app.use(pkg.initialize())
app.use(pkg.authenticate('session'))
pkg.use(
	new LocalStrategy(async function (username, password, done) {
		let userData = await userModel.findOne({ username })
		if (userData !== null) {
			let [hash, salt] = userData.password.split('.')
			const isMatch = verifyPassword(password, hash, salt)
			if (isMatch) {
				return done(null, userData)
			} else {
				return done(null, false, { message: 'Incorrect Password' })
			}
		} else {

			return done(null, false, { message: 'Incorrect Username' })
		}
	})
)

app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/', followInfoRouter)
app.use('/', likeRouter)
app.use('/users', usersRouter)
app.use('/upload', uploadRouter)
app.use('/profile',profileRouter)
app.use('/create',createRouter)
app.use('/follow', followRouter)
app.use('/unfollow', unfollowRouter)
app.use('/reels', reelsRouter)
app.use('/photos', photosRouter)
app.use('/findusers', finduserRouter)
app.use('/explore', exploreRouter)
app.use('/viewpost', postsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

export default app
