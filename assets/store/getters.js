// https://vuex.vuejs.org/en/getters.html

export default {
    happyStaff: state => {
        return state.isLarryHappy && state.isJennyHappy
    }
}
