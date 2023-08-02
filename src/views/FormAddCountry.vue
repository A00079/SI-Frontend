<template>
  <section>
    <AppModel
      :isVisible="isVisible"
      @close-model="(data) => (isVisible = data)"
      :modelData="countriesList"
    />
    <div>
      <div class="max-w-2xl mx-auto bg-white p-8">
        <div>
          <div class="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Country name</label
              >
              <input
                type="text"
                v-model="countryForm.name"
                maxlength="20"
                name="name"
                id="name"
                class="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter a country"
                :class="{
                  'border border-red-400 ':
                    isSubmitted && $v.countryForm.name.$error,
                }"
              />
              <div
                v-if="isSubmitted && !$v.countryForm.name.required"
                class="invalid-feedback text-red-400 text-sm font-medium"
              >
                Country name field is required
              </div>
              <div
                v-if="isSubmitted && !$v.countryForm.name.minLength"
                class="invalid-feedback text-red-400 text-sm font-medium"
              >
                Country name should be more than 3 characters
              </div>
            </div>
            <div>
              <label
                for="countryrank"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Rank</label
              >
              <input
                type="number"
                v-model="countryForm.rank"
                id="countryrank"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter country rank"
                :class="{
                  'border border-red-400 ':
                    isSubmitted && $v.countryForm.rank.$error,
                }"
              />
              <div
                v-if="isSubmitted && !$v.countryForm.rank.required"
                class="invalid-feedback text-red-400 text-sm font-medium"
              >
                Country rank field is required
              </div>
            </div>
          </div>
          <div class="mb-4">
            <BaseSelect
              code="continent"
              discription="continent"
              :isValid="isSubmitted && !$v.countryForm.continent.required"
              selectLabel="Select Continent"
              defaultOption="Continents"
              :optionsData="continentsList"
              @selected-option="(data) => (countryForm.continent = data)"
            />
            <div
              v-if="isSubmitted && !$v.countryForm.continent.required"
              class="invalid-feedback text-red-400 text-sm font-medium"
            >
              Continent field is required
            </div>
          </div>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
              >Upload Country Image</label
            >
            <input
              ref="fileInput"
              @change="handleImageChange"
              accept="image/png, image/jpeg"
              class="block w-full py-1.5 px-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              :class="{
                'border border-red-400':
                  isSubmitted && $v.countryForm.imageFile.$error,
              }"
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              PNG or JPG (MAX. 4 MB).
            </p>
            <div
              v-if="isSubmitted && !$v.countryForm.imageFile.required"
              class="invalid-feedback text-red-400 text-sm font-medium"
            >
              Country image field is required
            </div>
          </div>
          <div>
            <img
              v-if="imagePreviewUrl"
              class="w-36 mx-auto object-contain"
              :src="imagePreviewUrl"
              alt="Preview"
            />
          </div>
          <div class="flex flex row items-center space-x-3 pb-20">
            <router-link to="/">
              <button
                class="text-black bg-gray-200 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-2 px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Back
              </button>
            </router-link>
            <button
              @click="validateBeforeSubmit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-2 px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseSelect from "@/components/BaseSelect.vue";
import AppModel from "@/components/AppModel.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "FormAdd-Country",
  data() {
    return {
      continentsList: [],
      imagePreviewUrl: null,
      countryForm: {
        name: "",
        rank: "",
        continent: "",
        imageFile: "",
      },
      countriesList: [],
      isSubmitted: false,
      isVisible: false,
    };
  },
  validations: {
    countryForm: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
      },
      rank: {
        required,
      },
      continent: {
        required,
      },
      imageFile: {
        required,
      },
    },
  },
  components: {
    BaseSelect,
    AppModel,
  },
  created() {
    this.fetchContinents();
  },
  methods: {
    fetchContinents() {
      this.$sportZAPI
        .collection(`api/v1/continents`)
        .read({})
        .then((response) => {
          if (response.status == "success") {
            const uniqueObjectsByContinent = response.result.reduce(
              (uniqueArray, currentObject) => {
                const isDuplicate = uniqueArray.some(
                  (obj) => obj.continent === currentObject.continent
                );
                if (!isDuplicate) {
                  uniqueArray.push(currentObject);
                }
                return uniqueArray;
              },
              []
            );
            this.continentsList = uniqueObjectsByContinent;
          }
        })
        .catch((error) => console.error(error));
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const validExtensions = ["image/png", "image/jpeg"];
        const maxSizeInBytes = 4 * 1024 * 1024;
        if (!validExtensions.includes(file.type)) {
          this.$toast.error("Please select a PNG or JPG file.");
        } else if (file.size > maxSizeInBytes) {
          this.$toast.error("Image size should not exceed 4 MB.");
        } else {
          this.countryForm.imageFile = file;
          this.loadImagePreview(file);
        }
      }
    },
    loadImagePreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    validateBeforeSubmit() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.saveDetails();
    },
    saveDetails() {
      const formData = new FormData();
      formData.append("image", this.countryForm.imageFile);
      formData.append("name", this.countryForm.name);
      formData.append("rank", this.countryForm.rank);
      formData.append("continent", this.countryForm.continent);
      formData.append("id", this.$generateUniqueId());
      fetch("http://127.0.0.1:8080/api/v1/country", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            this.isSubmitted = false;
            this.$toast.success("Details saved successfully.");
            this.$set(this.countryForm, "imageFile", "");
            this.$set(this.countryForm, "name", "");
            this.$set(this.countryForm, "rank", "");
            this.$set(this.countryForm, "imageFile", "");
            this.imagePreviewUrl = "";
            this.$nextTick(() => {
              this.$v.countryForm.name.$reset();
              this.$v.countryForm.rank.$reset();
              this.$v.countryForm.imageFile.$reset();
              const fileInput = this.$refs.fileInput;
              fileInput.value = "";
            });
            this.displayAllCountries();
          } else {
            this.$toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    displayAllCountries() {
      this.isVisible = true;
      this.$sportZAPI
        .collection(`api/v1/country/details`)
        .read({})
        .then((response) => {
          if (response.status == "success") {
            this.countriesList = response.result;
          }
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style>
</style>