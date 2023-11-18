<script>

import AppNavbar from "./components/layout/AppNavbar.vue"

export default {
  name: "App",
  components: {
    
    AppNavbar
  }
}
</script>

<template>
<AppNavbar />
    <router-view></router-view>
</template>

<style>
#file-input {
  display: none;
}
body {
  background-color: lightskyblue !important;
}
</style>
