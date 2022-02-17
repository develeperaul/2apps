<template>
  <button class="but1_1 but1_2">
    {{ text }}
  </button>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.but1_2 {
  margin: 5px;
  font-size: 14px;
  border-radius: 50px;
  border: none;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.6em 1.6em 0.5em;
  letter-spacing: 0.1em;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: background 0.25s ease, color 0.25s ease, opacity 0.25s ease;
}

.but1_1 {
  background-color: #ca083b;
  color: #fff;
  box-shadow: 0 0.3em 1em rgb(0 0 0 / 15%);
  background: -webkit-linear-gradient(75deg, #ca083b, #f60f4c);
  background: linear-gradient(15deg, #ca083b, #f60f4c);
}
</style>
