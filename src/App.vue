<template>
  <div id="app" class="h-screen">
    <section>
      <Navbar navTitle="Sportz" navSubTitle="Interactive" />
    </section>
    <router-view />
    <section class="w-full">
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
