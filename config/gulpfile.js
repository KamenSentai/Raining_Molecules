/* ---------------------------------------------------------------------------------------------------- *\
|*
|* REQUIRES
|*
\* ---------------------------------------------------------------------------------------------------- */

const browserSync      = require('browser-sync').create()
const babelify         = require('babelify')
const browserify       = require('browserify')
const buffer           = require('vinyl-buffer')
const source           = require('vinyl-source-stream')

const gulp             = require('gulp')
const gulpAutoprefixer = require('gulp-autoprefixer')
const gulpCssnano      = require('gulp-cssnano')
const gulpImagemin     = require('gulp-imagemin')
const gulpNotify       = require('gulp-notify')
const gulpPlumber      = require('gulp-plumber')
const gulpStylus       = require('gulp-stylus')
const gulpUglify       = require('gulp-uglify')

/* ---------------------------------------------------------------------------------------------------- *\
|*
|* SETTINGS
|*
\* ---------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------- *\
|* PATHS
\* -------------------------------------------------- */

const path =
{
	name : 'works/raining_molecules',
	app  :
	{
		root     : './../app/',
		scripts  : './../app/scripts/',
		styles   : './../app/styles/',
		includes : './../app/includes/',
		assets   : './../app/assets/'
	},
	dist :
	{
		root     : './../dist/',
		scripts  : './../dist/scripts/',
		styles   : './../dist/styles/',
		includes : './../dist/includes/',
		assets   : './../dist/assets/'
	},
	src  :
	{
		root     : './../src/',
		scripts  : './../src/scripts/',
		styles   : './../src/styles/',
		includes : './../src/includes/',
		assets   : './../src/assets/'
	}
}

/* -------------------------------------------------- *\
|* MESSAGES
\* -------------------------------------------------- */

const message =
{
	compiled   : '<%= file.relative %> : file compiled',
	exported   : '<%= file.relative %> : file exported',
	transpiled : '<%= file.relative %> : file transpiled',
	error      : '<%= error.message %>'
}

/* ---------------------------------------------------------------------------------------------------- *\
|*
|* TASKS
|*
\* ---------------------------------------------------------------------------------------------------- */

/* -------------------------------------------------- *\
|* ACCESS
\* -------------------------------------------------- */

gulp.task('access', () =>
{
	return gulp.src(`${path.src.root}.htaccess`)
		.pipe(gulpPlumber(
			{
				errorHandler : gulpNotify.onError(
					{
						title   : 'Access',
						message : `${message.error}`,
						sound   : 'beep'
					})
			}))
		.pipe(gulp.dest(path.app.root))
		.pipe(gulpNotify(
			{
				title   : 'Access',
				message : `${message.exported}`,
				sound   : 'beep'
			}))
})

/* -------------------------------------------------- *\
|* ASSETS
\* -------------------------------------------------- */

gulp.task('assets', () =>
{
	return gulp.src(
		[
			`${path.src.assets}*.*`,
			`${path.src.assets}**/*.*`,
			`${path.src.assets}**/**/*.*`
		])
		.pipe(gulpPlumber(
			{
				errorHandler : gulpNotify.onError(
					{
						title   : 'Assets',
						message : `${message.error}`,
						sound   : 'beep'
					})
			}))
		.pipe(gulp.dest(path.app.assets))
		.pipe(gulpNotify(
			{
				title   : 'Assets',
				message : `${message.exported}`,
				sound   : 'beep'
			}))
})

/* -------------------------------------------------- *\
|* LIBS
\* -------------------------------------------------- */

gulp.task('libs', () =>
{
	// Update styles libraries
	gulp.src(`${path.src.styles}lib/*.css`)
		.pipe(gulpPlumber(
			{
				errorHandler : gulpNotify.onError(
					{
						title   : 'Styles lib',
						message : `${message.error}`,
						sound   : 'beep'
					})
			}))
		.pipe(gulp.dest(`${path.app.styles}`))
		.pipe(gulpNotify(
			{
				title   : 'Style libraries',
				message : `${message.exported}`,
				sound   : 'beep'
			}))

	// Update scripts libraries
	gulp.src(`${path.src.scripts}lib/*.js`)
		.pipe(gulpPlumber(
			{
				errorHandler : gulpNotify.onError(
					{
						title   : 'Scripts lib',
						message : `${message.error}`,
						sound   : 'beep'
					})
			}))
		.pipe(gulp.dest(`${path.app.scripts}`))
		.pipe(gulpNotify(
			{
				title   : 'Script libraries',
				message : `${message.exported}`,
				sound   : 'beep'
			}))
})

/* -------------------------------------------------- *\
|* SCRIPTS
\* -------------------------------------------------- */

gulp.task('scripts', () =>
{
	return browserify(
		{
			debug   : true,
			entries : `${path.src.scripts}main.js`
		})
		.transform(babelify.configure(
			{
				presets : ['babel-preset-env'].map(require.resolve)
			}))
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(gulpPlumber(
			{
				errorHandler : gulpNotify.onError(
					{
						title   : 'Scripts',
						message : `${message.error}`,
						sound   : 'beep'
					})
			}))
		.pipe(gulp.dest(`${path.app.scripts}`))
		.pipe(gulpNotify(
			{
				title   : 'Scripts',
				message : `${message.transpiled}`,
				sound   : 'beep'
			}))
})

/* -------------------------------------------------- *\
|* STYLES
\* -------------------------------------------------- */

gulp.task('styles', () =>
{
	return gulp.src(`${path.src.styles}main.styl`)
		.pipe(gulpPlumber(
			{
				errorHandler : gulpNotify.onError(
					{
						title   : 'Styles',
						message : `${message.error}`,
						sound   : 'beep'
					})
			}))
		.pipe(gulpStylus())
		.pipe(gulpAutoprefixer())
		.pipe(gulp.dest(path.app.styles))
		.pipe(gulpNotify(
			{
				title   : 'Styles',
				message : `${message.compiled}`,
				sound   : 'beep'
			}))
})

/* -------------------------------------------------- *\
|* INCLUDES
\* -------------------------------------------------- */

gulp.task('includes', () =>
{
	return gulp.src(
		[
			`${path.src.includes}*.php`,
			`${path.src.includes}**/*.php`,
			`${path.src.includes}**/**/*.php`,
			`${path.src.includes}**/**/**/*.php`,
			`${path.src.includes}**/**/**/**/*.php`
		])
		.pipe(gulpPlumber(
			{
				errorHandler : gulpNotify.onError(
					{
						title   : 'Includes',
						message : `${message.error}`,
						sound   : 'beep'
					})
			}))
		.pipe(gulp.dest(path.app.includes))
		.pipe(gulpNotify(
			{
				title   : 'Includes',
				message : `${message.exported}`,
				sound   : 'beep'
			}))
})

/* -------------------------------------------------- *\
|* INDEX
\* -------------------------------------------------- */

gulp.task('index', () =>
{
	return gulp.src(`${path.src.root}index.php`)
		.pipe(gulpPlumber(
			{
				errorHandler : gulpNotify.onError(
					{
						title   : 'Index',
						message : `${message.error}`,
						sound   : 'beep'
					})
			}))
		.pipe(gulp.dest(path.app.root))
		.pipe(gulpNotify(
			{
				title   : 'Index',
				message : `${message.exported}`,
				sound   : 'beep'
			}))
})

/* -------------------------------------------------- *\
|* WATCH
\* -------------------------------------------------- */

gulp.task('watch', () =>
{
	// Run browser
	browserSync.init(
		{
			browser : 'Google Chrome',
			proxy   : `http://localhost/${path.name}/app`
		})

	// Watch access
	gulp.watch(`${path.src.root}.htaccess`, ['access'])
		.on('change', browserSync.reload)

	// Watch assets
	gulp.watch(
		[
			`${path.src.assets}*.*`,
			`${path.src.assets}**/*.*`,
			`${path.src.assets}**/**/*.*`
		], ['assets'])
		.on('change', browserSync.reload)

	// Watch libs
	gulp.watch(
		[
			`${path.src.styles}lib/*.css`,
			`${path.src.scripts}lib/*.js`
		], ['libs'])
		.on('change', browserSync.reload)

	// Watch scripts
	gulp.watch(
		[
			`${path.src.scripts}*.*`,
			`${path.src.scripts}components/*.js`,
			`${path.src.scripts}components/**/*.js`
		], ['scripts'])
		.on('change', browserSync.reload)

	// Watch styles
	gulp.watch(
		[
			`${path.src.styles}*.*`,
			`${path.src.styles}components/*.styl`,
			`${path.src.styles}components/**/*.styl`
		], ['styles'])
		.on('change', browserSync.reload)

	// Watch includes
	gulp.watch(
		[
			`${path.src.includes}*.php`,
			`${path.src.includes}**/*.php`,
			`${path.src.includes}**/**/*.php`,
			`${path.src.includes}**/**/**/*.php`,
			`${path.src.includes}**/**/**/**/*.php`
		], ['includes'])
		.on('change', browserSync.reload)

	// Watch index
	gulp.watch(
		[
			`${path.src.root}index.php`
		], ['index'])
		.on('change', browserSync.reload)
})

/* -------------------------------------------------- *\
|* PRODUCTION
\* -------------------------------------------------- */

gulp.task('production', () =>
{
	// Minify and export images
	gulp.src(`${path.app.assets}images/*.*`)
		.pipe(gulpImagemin())
		.pipe(gulp.dest(`${path.dist.assets}images/`))
		.pipe(gulpNotify(
			{
				title   : 'Images',
				message : `${message.exported}`,
				sound   : 'beep'
			}))

	// Export access
	gulp.src([`${path.app.root}.htaccess`])
		.pipe(gulp.dest(path.dist.root))
		.pipe(gulpNotify(
			{
				title   : 'Access',
				message : `${message.exported}`,
				sound   : 'beep'
			}))

	// Export assets
	gulp.src(
		[
			`${path.app.assets}*.*`,
			`${path.app.assets}**/*.*`,
			`${path.app.assets}**/**/*.*`,
			`!${path.app.assets}images/*.*`
		])
		.pipe(gulp.dest(path.dist.assets))
		.pipe(gulpNotify(
			{
				title   : 'Assets',
				message : `${message.exported}`,
				sound   : 'beep'
			}))

	// Minify and export scripts
	gulp.src([`${path.app.scripts}*.js`])
		.pipe(gulpUglify())
		.pipe(gulp.dest(`${path.dist.scripts}`))
		.pipe(gulpNotify(
			{
				title   : 'Styles',
				message : `${message.exported}`,
				sound   : 'beep'
			}))

	// Minify and export styles
	gulp.src([`${path.app.styles}*.css`])
		.pipe(gulpCssnano())
		.pipe(gulp.dest(`${path.dist.styles}`))
		.pipe(gulpNotify(
			{
				title   : 'Scripts',
				message : `${message.exported}`,
				sound   : 'beep'
			}))

	// Export includes
	gulp.src(
		[
			`${path.app.includes}*.php`,
			`${path.app.includes}**/*.php`,
			`${path.app.includes}**/**/*.php`,
			`${path.app.includes}**/**/**/*.php`,
			`${path.app.includes}**/**/**/**/*.php`
		])
		.pipe(gulp.dest(path.dist.includes))
		.pipe(gulpNotify(
			{
				title   : 'Includes',
				message : `${message.exported}`,
				sound   : 'beep'
			}))

	// Export index
	gulp.src(`${path.app.root}index.php`)
		.pipe(gulp.dest(path.dist.root))
		.pipe(gulpNotify(
			{
				title   : 'Index',
				message : `${message.exported}`,
				sound   : 'beep'
			}))
})

/* -------------------------------------------------- *\
|* DEFAULT
\* -------------------------------------------------- */

gulp.task('default', ['access', 'assets', 'libs', 'scripts', 'styles', 'includes', 'index', 'watch'])