const postRoute = require('./postRoute');
const contactRoute = require('./contactRoute');
const authRoute = require('./authRoute');
const searchRoute = require('./searchRoute');
const uploadRoute = require('./uploadRoute');
const routes = [
    {
        path: '/api/posts',
        handler: postRoute
    },
    {
        path: '/api/email',
        handler: contactRoute
    },
    {
        path: '/api/auth',
        handler: authRoute
    },
    {
        path: '/api/search',
        handler: searchRoute
    },
    {
        path:'/api/uploads',
        handler: uploadRoute
    }
]

module.exports = (app) => {
    routes.map(route => {
        if (route.path === '/') {
            return app.get(route.path, route.handler)
        } else {
            return app.use(route.path, route.handler)
        }
    })
}
