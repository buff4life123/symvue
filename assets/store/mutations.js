// https://vuex.vuejs.org/en/mutations.html

export default {
    removeTv(state, amount) {
        // For now we allow Jenny just to remove
        // one TV at a time.
        state.totalTvCount -= amount;
    },
    setAuth(state, e) {
        state.loggedIn = e;
    }
}
