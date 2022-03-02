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
        <svg @click="() => $router.push({ name: 'home' })" width="70" viewBox="0 0 167 197" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    <!-- Generator: Sketch 3.3.2 (12043) - http://www.bohemiancoding.com/sketch -->
            <title>2a</title>
            <desc>Created with Sketch.</desc>
              <defs>
                <!-- <style type="text/css"> -->
                  <!-- font-family: Avenir; -->
                <!-- </style> -->
            </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <text id="2" sketch:type="MSTextLayer" font-family="Avenir" font-size="144" font-weight="bold" fill="#CA083B">
                    <tspan x="0" y="144">2</tspan>
                </text>
                <rect id="Rectangle-1" stroke="#FFFFFF" fill="#FFFFFF" sketch:type="MSShapeGroup" transform="translate(61.194817, 131.787675) rotate(23.000000) translate(-61.194817, -131.787675) " x="59.3964818" y="115.287675" width="3.59666945" height="33"></rect>
                <path d="M139.640004,143.979998 L90.9555669,143.979998 L80.96,169 L47.48,169 L100.94,41.56 L130.82,41.56 C130.82,41.56 149.739881,96.0099077 159.199822,123.234862 C161.602614,130.149907 166.4082,143.979998 166.4082,143.979998 L139.640004,143.979998 Z M115.34,75.58 L99.14,124.56 L131.18,124.56 L115.34,75.58 Z" id="A" fill="#CA083B" sketch:type="MSShapeGroup"></path>
                <rect id="Rectangle-2" stroke="#FFFFFF" fill="#FFFFFF" sketch:type="MSShapeGroup" transform="translate(95.934210, 134.914674) rotate(23.000000) translate(-95.934210, -134.914674) " x="94.9198053" y="121.414674" width="3.56484435" height="27"></rect>
            </g>
        </svg>
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
