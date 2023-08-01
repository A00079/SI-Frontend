<template>
  <div id="app" class="relative h-screen">
    <section>
      <Navbar navTitle="Sportz" navSubTitle="Interactive" />
    </section>
    <router-view />
    <section class="absolute bottom-0 w-full">
      <AppFooter />
    </section>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    AppFooter,
  },
};
</script>
<style>
body {
  font-family: "Barlow Condensed";
}
</style>
