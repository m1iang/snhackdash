<template>
  <div class="badge pb-3">
    <div
      class="px-3 py-2 bg-yellow-500 rounded-lg"
      v-if="$props.text === 'solution_proposed'"
    >
      <h1 class="text-sm lowercase font-semibold text-white">Solution Proposed</h1>
    </div>
    <div
      class="px-3 py-2 bg-green-500 rounded-lg"
      v-if="$props.text === 'solution_accepted'"
    >
      <h1 class="text-sm lowercase font-semibold text-white">Solution Accepted</h1>
    </div>
    <div class="px-3 py-2 bg-red-500 rounded-lg" v-if="$props.text === 'pending'">
      <h1 class="text-sm lowercase font-semibold text-white">Pending</h1>
    </div>
  </div>
</template>

<style scoped></style>

<script lang="ts">
export default {
  name: "Badge",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
