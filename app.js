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
import dotenv from 'dotenv'
import LocalStrategy from 'passport-local'
import MongoStore from 'connect-mongo';
import indexRouter from './routes/index.routes.js'
import authRouter from './routes/auth.routes.js'
import uploadRouter from './routes/upload.routes.js'
import profileRouter from './routes/profile.routes.js'
import createRouter from './routes/create.routes.js'
import followRouter from './routes/follow.routes.js'
import followInfoRouter from './routes/followinfo.routes.js'
import reelsRouter from './routes/reels.routes.js'
import photosRouter from './routes/photos.routes.js'
import likeRouter from './routes/like.routes.js'
import finduserRouter from './routes/findusers.routes.js'
import exploreRouter from './routes/explore.routes.js'
import postsRouter from './routes/posts.routes.js'
import likedPostsRouter from './routes/likedposts.routes.js'
import storiesRouter from './routes/stories.routes.js'
import hashTagRouter from './routes/hashtags.routes.js'
import addViewsRouter from './api/addViews.js'
import userModel from './db/models/user.model.js';
import flash from 'connect-flash'
import { verifyPassword } from './utils/hashgen.js'
import deleteExpiredFiles from './utils/deleteExpiredFiles.js';

dotenv.config()
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
const DATABASENAME=process.env.DB_NAME
const DBURL=process.env.DB_URL
const store =  MongoStore.create({
	mongoUrl: `${DBURL}/${DATABASENAME}`,
	collectionName:'sessions',
	ttl:5*24*60*60 // 5 days.
})

store.on('error', function (err) {
	console.error(err)
})
app.use(
	session({
		secret: process.env.SECRET_KEY_SESSION,
		resave: false,
		saveUninitialized: false,
		store: store,
		cookie: {
			maxAge: 1000 * 3600 * 24 * 5, //5 days
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
app.use('/upload', uploadRouter)
app.use('/profile',profileRouter)
app.use('/create',createRouter)
app.use('/follow', followRouter)
app.use('/reels', reelsRouter)
app.use('/photos', photosRouter)
app.use('/findusers', finduserRouter)
app.use('/explore', exploreRouter)
app.use('/viewpost', postsRouter)
app.use('/likedposts', likedPostsRouter)
app.use('/tags', hashTagRouter)
app.use('/stories', storiesRouter)
app.use('/addview', addViewsRouter)

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

// delete the stories which are expired
setInterval(function () {
	deleteExpiredFiles()
},62000)


export default app
