<template>
  <router-link :to="link" class="nav">
    <!-- {{ title }} -->
    <span>
      {{ title }}
    </span>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: Object,
      required: true,
    },
  },
});
</script>
