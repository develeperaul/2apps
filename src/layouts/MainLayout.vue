<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header p-content" style="background: #ffffff">
      <q-btn
        flat
        dense
        round
        icon="menu"
        color="primary"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <a class="phone" href="tel:89174808852">8 (917) 480-88-52</a>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="drawer__list">
        <img
          src="logo.svg"
          alt=""
          @click="() => $router.push({ name: 'home' })"
          width="70"
        />
        <EssentialLink
          v-for="(link, index) in essentialLinks"
          :key="index"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Наши работы",
    link: { name: "work" },
  },
  {
    title: "Как мы работаем",
    link: { name: "how" },
  },
  {
    title: "Калькулятор",
    link: { name: "calc" },
  },
  {
    title: "Контакты",
    link: { name: "contacts" },
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0px 7px 10px rgba(255, 255, 255, 0.5);
}
.drawer__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
