<template>
  <div id="app">
      <main class="main-wrap bg-light">
          <div class="row g-0 h-100">

              <div class="col col-md-2">
                  <app-side-nav/>
              </div>

              <div class="col col-md-10 d-flex flex-column">
                  <app-header/>

                  <router-view/>
              </div>

          </div>
      </main>
  </div>
</template>

<script>
export default {
    components:{
        AppSideNav: () => import('/src/components/app/SideNav'),
        AppHeader: () => import('/src/components/app/Header'),
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-wrap{
    height: 100vh;
}

.no-resize{
    resize: none;
}
</style>

