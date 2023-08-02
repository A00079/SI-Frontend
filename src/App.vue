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
  created() {
    console.log(
      "%cSportz Interactive",
      "color: blue; font-style: Barlow Condensed; font-size: 2em;font-weight:900;"
    );
  },
};
</script>
<style>
body {
  font-family: "Barlow Condensed";
}
</style>
