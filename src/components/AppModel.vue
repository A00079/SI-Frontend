<template>
  <div
    v-show="isVisible"
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:pb-4">
            <div class="sm:flex mb-3 sm:items-start border-b border-gray-300">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Countries
                </h3>
                <div class="mt-1 pb-2">
                  <p class="text-sm text-gray-500">
                    Below is the list of countries with some details.
                  </p>
                </div>
              </div>
            </div>
            <div class="h-80 overflow-y-auto">
              <div
                class="w-full mt-2.5 pr-4"
                v-for="(items, index) in modelData"
                :key="index"
              >
                <div
                  class="h-full flex items-center border-gray-200 border p-2 rounded-lg"
                >
                  <img
                    alt="team"
                    class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    :key="index"
                    :src="baseUrl + items.flag"
                  />
                  <div class="flex-grow">
                    <h2 class="text-gray-600 title-font font-bold">
                      {{ items.name }}
                    </h2>
                    <p class="text-gray-400 text-sm">
                      Continent:
                      <span class="text-gray-600 font-bold">{{ items.continent }}</span>
                    </p>
                    <p class="text-gray-400 text-sm">
                      Rank: <span class="text-gray-600 font-bold">{{ items.rank }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="closeModel"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App-Model",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    modelData: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      baseUrl: "http://127.0.0.1:8080/images/",
    };
  },
  methods: {
    closeModel() {
      this.$emit("close-model", false);
    },
  },
};
</script>

<style>
</style>