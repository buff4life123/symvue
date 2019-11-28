<template>
    <v-app style="width: 100vw; height: 100vh;">
        <basic-view />
    </v-app>
</template>

<script>
    export default {
        components: {
            BasicView: () => import(/* webpackMode: "eager" */ '#/components/core/Basic')
        }
    }
</script>

<style lang='scss' type="text/css">
    
@import '~@mdi/font/css/materialdesignicons.css';
@import '~@fortawesome/fontawesome-free/css/all.css';
/*@import '~vuetify/dist/vuetify.min.css';*/
@import '~flag-icon-css/css/flag-icon.css';
@import '~croppie/croppie.css';

</style>