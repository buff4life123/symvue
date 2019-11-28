<template>
    <div>
        <core-app-bar />

        <core-drawer />

        <core-view />

        <core-footer />
    </div>
</template>

<script>

export default {
    components: {
        CoreDrawer: () => import(/* webpackMode: "eager" */ '@/components/core/Drawer'),
        CoreFooter: () => import(/* webpackMode: "eager" */ '@/components/core/Footer'),
        CoreAppBar: () => import(/* webpackMode: "eager" */ '@/components/core/AppBar'),
        CoreView: () => import(/* webpackMode: "eager" */ '@/components/core/View')
    },
    beforeRouteUpdate: require(/* webpackMode: "eager" */ `@/guards/login`).default,
    beforeRouteEnter: require(/* webpackMode: "eager" */ `@/guards/login`).default,
}
</script>
