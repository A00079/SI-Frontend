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
      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
    >
      <option selected>Countries</option>
      <template v-for="(items, index) in optionsData">
        <option :key="index" :value="items.id">{{ items.name }}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: "Base-Select",
  data() {
    return {
      selectedOption: "Countries",
    };
  },
  props: {
    selectLabel: {
      type: String,
      required: true,
    },
    optionsData: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleOptionChange() {
      this.$emit("selected-country", this.selectedOption);
    },
  },
};
</script>

<style>
</style>