<template>
      <div class="v-responsive v-image" style="min-height: 100%;">
          <div class="v-responsive__sizer" style="padding-bottom: 66.7188%;"></div>
          <div class="v-image__image v-image__image--cover" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(&quot;https://demos.creative-tim.com/vuetify-material-dashboard-pro/img/clint-mckoy.36f95307.jpg&quot;); background-position: center center;"></div>
          <div class="v-responsive__content" style="width: 1920px;">
              <section class="container error-page fill-height">
                  <div class="row text-center justify-center">
                      <div class="col col-auto">
                          <h1 class="title font-weight-black">404</h1>
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
export default {
    name: 'satus_403',
    beforeRouteUpdate: require(`@/guards/login`).default,
    beforeRouteEnter: require(`@/guards/login`).default,
}
</script>
