import store from '@/store'

export default (to, from, next) => {
    console.log('dashboard',to, from);
    // if(store.state.auth.loggedIn) {
        next();
    // } else{
    //     next('/login'); // go to '/login';
    // }
}
