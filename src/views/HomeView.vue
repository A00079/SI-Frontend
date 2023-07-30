<template>
  <div class="home">
    <section>
      <Navbar navTitle="Sportz" navSubTitle="Interactive" />
    </section>
    <section>
      <div class="bg-gray-50 flex items-center">
        <section class="bg-cover bg-center bg-gray-50 py-28 w-full">
          <div class="container mx-auto text-left text-white">
            <div class="flex items-center">
              <div class="w-1/2">
                <h1 class="text-5xl font-bold mb-6 text-gray-600">
                  Welcome to
                  <span class="text-green-500">Sport</span> Interactive
                </h1>
                <p class="text-xl mb-6 text-gray-600">
                  Select a option from below list of countries to view more
                  details of a specific country. Details are shown to the right.
                </p>
                <div class="w-2/3">
                  <BaseSelect selectLabel="Select an country" :optionsData="countriesList"  @selected-country="displayCountryDetail"/>
                </div>
              </div>
              <div class="w-1/2 pl-16">
                <img
                  src="https://source.unsplash.com/random?ux"
                  class="h-64 w-full object-cover rounded-xl"
                  alt="Layout Image"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BaseSelect from "@/components/BaseSelect.vue";

export default {
  name: "HomeView",
  data() {
    return {
      countriesList: [],
    };
  },
  components: {
    Navbar,
    BaseSelect,
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
    displayCountryDetail(data){
      console.log('received data --->',data);
    }
  },
};
</script>
