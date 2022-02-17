<template>
  <q-page class="contacts p-content pt pb">
    <div>
      <h2 class="contacts__title">КОНТАКТЫ</h2>
      <div class="contacts__info">
        <h3>Контактный email :</h3>
        <p>
          <a href="mailto:info@2apps.ru"> info@2apps.ru </a>
        </p>
      </div>
      <div class="contacts__info">
        <h3>Контактный телефон :</h3>
        <p>
          <a href="tel:89174808852">8 (917) 480-88-52</a>
        </p>
      </div>
    </div>
    <div class="contacts__map" :style="{ 'max-width': width + 'px' }"></div>

    <BaseButton
      text="Расчитать стоимость"
      @click="() => $router.push({ name: 'calc' })"
    />
  </q-page>
</template>

<script>
import BaseButton from "src/components/BaseButton.vue";
export default {
  // name: 'PageName',
  components: { BaseButton },
  computed: {
    width() {
      return window.screen.width - 30;
    },
  },
};
</script>
<style lang="scss" scoped>
.contacts {
  // margin-top: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__title {
    margin-bottom: 30px;
  }

  &__info {
    margin-bottom: 15px;
  }
  &__map {
    background-image: url("src/assets/map.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    max-height: 100%;
    align-self: center;
    flex-grow: 1;
    margin: 0 0 15px 0;
    width: 100%;
  }
}
</style>
