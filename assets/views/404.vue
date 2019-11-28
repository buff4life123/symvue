<template>
    <div class="v-responsive v-image" style="min-height: 100%;">
        <div class="v-responsive__sizer" style="padding-bottom: 66.7188%;"></div>
        <div class="v-image__image v-image__image--cover" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(&quot;https://demos.creative-tim.com/vuetify-material-dashboard-pro/img/clint-mckoy.36f95307.jpg&quot;); background-position: center center;"></div>
        <div class="v-responsive__content" style="width: 1920px;">
            <section class="container error-page fill-height">
                <div class="row text-center justify-center">
                    <div class="col col-auto">
                        <h1 class="title font-weight-black">404 {{ $store.state.totalTvCount }}</h1>
                        <div class="display-3 mb-5 mt-10">Page not found :(</div>
                        <a href="/vuetify-material-dashboard-pro/#/" class="v-btn v-btn--depressed v-btn--router theme--dark v-size--default">
                            <span class="v-btn__content">Get me out of here!</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'satus_404',
    computed: {
        // If you have only one state/getter object spread operators are not necessarily needed
        // But we'll use it for now, so you can see how they are used
        // mapState/mapGetter accepts an array of strings as parameter
        ...mapState(['totalTvCount']),
        ...mapGetters(['happyStaff'])
    },
    methods: {
        ...mapActions(['removeTv']),
    },
    mounted: function() {
        // console.log(this.happyStaff);
        // console.log(this.totalTvCount);
        // console.log(this.removeTv(2));
        // // console.log(this.$store.dispatch('removeTv', 2));
        // console.log(this.$store.state.totalTvCount);
    },
    beforeRouteUpdate: require(`@/guards/login`).default,
    beforeRouteEnter: require(`@/guards/login`).default,
}
</script>
