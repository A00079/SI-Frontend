<template>
  <div class="base-select">
    <label
      for="countries"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ selectLabel }}</label
    >
    <select
      v-model="selectedOption"
      @change="handleOptionChange"
      id="countries"
      :class="{ 'border border-red-400': isValid }"
      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
    >
      <option selected>{{ defaultOption }}</option>
      <template v-for="(items, index) in optionsData">
        <option :key="index" :value="items[code]">
          {{ items[discription] }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: "Base-Select",
  data() {
    return {
      selectedOption: "",
    };
  },
  created() {
    this.selectedOption = this.defaultOption;
  },
  props: {
    selectLabel: {
      type: String,
      required: true,
    },
    defaultOption: {
      type: String,
      required: true,
    },
    optionsData: {
      type: Array,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    handleOptionChange() {
      this.$emit("selected-option", this.selectedOption);
    },
  },
};
</script>

<style>
</style>