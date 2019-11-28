/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)

const route = function(path, view, name, children) {
    let object = {
        path,
        component: (resovle) => import(
            /* webpackMode: "eager" */
            `@/views/${view}.vue`
        ).then(resovle)
    }

    if (children) {
        object.children = children.map(path => route(path.path, view+"/"+path.view, path.name, path.children));
    } else {
        object.name = name || view
    }
    return object;
}


export default function(paths) {
    // Create a new router
    const router = new Router({
        // mode: 'history',
        routes: paths.map(path => route(path.path, path.view, path.name, path.children)).concat([
            {
                path: '/403',
                name: '403',
                view: '403',
            },
            {
                path: '/404',
                name: '404',
                view: '404',
            },
            {
                path: '/500',
                name: '500',
                view: '500',
            },
            { path: '*', name: 'redirect_404' }
        ]),
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            }
            if (to.hash) {
                return { selector: to.hash }
            }
            return { x: 0, y: 0 }
        }
    });

    router.beforeEach((to, from, next) => {
        switch (to.name) {
            case 'redirect_403':
                router.history.updateRoute(router.match({name:'403'}));
            break;
            case 'redirect_404':
                // router.history.updateRoute(router.match({name:'404'}));
                next(router.match({name:'404'}));
            break;
            case 'redirect_500':
                router.history.updateRoute(router.match({name:'500'}));
            break;
            default:
                next();
            break;
        }
    });

    // Vue.use(Meta)

    // Bootstrap Analytics
    // Set in .env
    // https://github.com/MatteoGabriele/vue-analytics
    if (process.env.GOOGLE_ANALYTICS) {
        Vue.use(VueAnalytics, {
            id: process.env.GOOGLE_ANALYTICS,
            router,
            autoTracking: {
                page: process.env.NODE_ENV !== 'development'
            }
        })
    }

    return router
}