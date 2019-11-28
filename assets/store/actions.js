// https://vuex.vuejs.org/en/actions.html

export default {
    removeTv(context, amount) {
        // For now we only remove a tv,
        // but this action can contain logic
        // so we could expand it in the future.
        if(context.state.totalTvCount >= amount) {
            // If we enough TVs, ask Jenny to remove it
            context.commit('removeTv', amount)
        }
    },
    checkAuth(context) {
        context.commit('setAuth', false);
    }
}
