/* eslint-disable no-undef */
let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
let MongoStore = require('connect-mongodb-session')(session)
const userModel = require('./db/models/user')
let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let authRouter = require('./routes/auth')
let uploadRouter = require('./routes/upload')
let profileRouter = require('./routes/profile')
let createRouter = require('./routes/create')
let followRouter = require('./routes/follow')
let flash = require('connect-flash')
const { verifyPassword } = require('./utils/hashgen')


let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))
const store = new MongoStore({
	uri: 'mongodb://localhost:27017/socialm',
	collection: 'sessions',
})

store.on('error', function (err) {
	console.log(err)
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
app.use(passport.initialize())
app.use(passport.authenticate('session'))
passport.use(
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
app.use('/users', usersRouter)
app.use('/upload', uploadRouter)
app.use('/profile',profileRouter)
app.use('/create',createRouter)
app.use('/follow', followRouter)

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

module.exports = app
