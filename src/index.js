const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const SortMiddleware = require('./app/middlewares/SortMiddleware')

const db = require('./config/db')
db.connect()

const app = express()
const port = 3000

const route = require('./routes')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.use(morgan('combined'))

app.use(SortMiddleware)

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                let sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'oi oi-elevator',
                    desc: 'oi oi-sort-descending',
                    asc: 'oi oi-sort-ascending',
                }

                const types = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'asc',
                }

                let icon = icons[sortType]
                let type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`
            },
        },
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
