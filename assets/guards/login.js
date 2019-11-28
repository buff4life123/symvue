import store from '@/store'

import router from '@/router'

let entryUrl = null;

export default async (to, from, next, updateRoute) => {
    // if (store.state.loggedIn) {
    //     if (entryUrl) {
    //         const url = entryUrl;
    //         entryUrl = null;
    //         return next(url); // goto stored url
    //     } else {
    //         return next(); // all is fine
    //     }

    //     await store.dispatch('checkAuth');
    // } else {
    //     await store.dispatch('checkAuth');

    //     if(store.state.loggedIn) {
             next();
    //     } else{
    //         entryUrl = to.path;
    //         router.history.updateRoute(router.match({name:'Login'}));
    //     }
    // }
}
