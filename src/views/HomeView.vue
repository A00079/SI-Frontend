<template>
  <div class="home">
    <section>
      <div class="bg-gray-50 flex items-center">
        <section class="bg-cover bg-center bg-gray-50 py-24 w-full">
          <div class="container mx-auto text-left text-white">
            <div class="flex items-center">
              <div class="w-1/2">
                <h1 class="text-5xl font-bold mb-6 text-gray-600">
                  Welcome to
                  <span class="text-green-500">Sportz</span> Interactive
                </h1>
                <p class="text-xl mb-6 text-gray-600">
                  Select a option from below list of countries to view more
                  details of a specific country. Details are shown to the right.
                </p>
                <div class="w-2/3">
                  <BaseSelect
                    code="id"
                    discription="name"
                    defaultOption="Countries"
                    selectLabel="Select an country"
                    :optionsData="countriesList"
                    @selected-option="displayCountryDetail"
                  />
                </div>
              </div>
              <div class="w-1/2 pl-16">
                <div v-show="!isLoading">
                  <div
                    class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <img
                      v-if="Object.keys(selectedCountry).length"
                      :src="baseUrl + selectedCountry.flag"
                      class="h-64 bg-gray-50 px-1 py-4 w-full object-contain rounded-xl"
                      alt="Layout Image"
                    />
                    <img
                      v-else
                      src="../assets/img/empty-box.png"
                      class="h-64 w-full object-contain rounded-xl"
                      alt="Layout Image"
                    />
                  </div>
                  <div class="mt-2" v-if="Object.keys(selectedCountry).length">
                    <div class="text-black font-medium text-md">
                      Country Name:-<span
                        class="ml-2 font-bold text-lg text-blue-600"
                        >{{ selectedCountry.name }}</span
                      >
                    </div>
                    <div
                      class="text-black flex flex row items-center font-medium text-md"
                    >
                      Rank:-
                      <span class="ml-2 font-bold text-lg text-blue-600">{{
                        selectedCountry.rank
                      }}</span>
                      <span
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 ml-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-show="isLoading">
                  <NoDataSkeleton />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import BaseSelect from "@/components/BaseSelect.vue";
import NoDataSkeleton from "@/components/NoDataSkeleton.vue";

export default {
  name: "HomeView",
  data() {
    return {
      countriesList: [],
      selectedCountry: {},
      isLoading: false,
      baseUrl: "http://127.0.0.1:8080/images/",
    };
  },
  components: {
    BaseSelect,
    NoDataSkeleton,
  },
  created() {
    this.fetchCountries();
  },
  methods: {
    fetchCountries() {
      this.$sportZAPI
        .collection(`api/v1/countries`)
        .read({})
        .then((response) => {
          if (response.status == "success") {
            this.countriesList = response.result;
          }
        })
        .catch((error) => console.error(error));
    },
    displayCountryDetail(data) {
      this.isLoading = true;
      if (this.$isNumber(data)) {
        this.$sportZAPI
          .collection(`api/v1/country`)
          .readone(data)
          .then((response) => {
            if (response.status == "success") {
              this.isLoading = false;
              this.selectedCountry = response.result;
            } else {
              this.selectedCountry = {};
              this.isLoading = false;
            }
          })
          .catch((error) => console.error(error));
      } else {
        this.selectedCountry = {};
        this.isLoading = false;
      }
    },
  },
};
</script>
