<template>
  <div class="app-navbar">
    <header class="text-gray-600 body-font border-b border-gray-200 shadow-sm">
      <div
        class="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center justify-between"
      >
        <router-link to="/">
          <a
            class="flex items-center text-gray-900 mb-4 md:mb-0 cursor-pointer"
          >
            <div class="ml-3 flex flex-col justify-start">
              <div class="text-2xl text-green-500 font-bold">
                {{ navTitle }}
              </div>
              <div class="text-lg text-gray-400 leading-none">
                {{ navSubTitle }}
              </div>
            </div>
          </a>
        </router-link>
        <router-link to="/add-country">
          <div
            v-if="isVisiable"
            class="flex flex row items-center justify-center cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>

            <div class="text-black">Add Countries</div>
          </div>
        </router-link>
      </div>
    </header>
  </div>
</template>
  
  <script>
export default {
  name: "App-Navbar",
  props: {
    navTitle: {
      type: String,
      required: true,
    },
    navSubTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isVisiable: true,
    };
  },
  watch: {
    $route() {
      this.handleAddContryVisible();
    },
  },
  methods: {
    handleAddContryVisible() {
      if (window.location.href.split("#").length) {
        if (window.location.href.split("#")[1] == "/add-country") {
          this.isVisiable = false;
        } else {
          this.isVisiable = true;
        }
      }
    },
  },
};
</script>
  
  <style scoped>
</style>
  