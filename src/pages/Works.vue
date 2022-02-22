<template>
  <q-page class="p-content">
    <h2>ПОСЛЕДНИЕ РАБОТЫ</h2>
    <q-carousel
      animated
      v-model="slide"
      navigation
      swipeable
      height="100%"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn
          v-if="active"
          size="5px"
          :icon="btnProps.icon"
          color="dark"
          flat
          round
          dense
          @click="onClick"
        ></q-btn>
        <q-btn
          v-else
          size="5px"
          :icon="btnProps.icon"
          color="grey"
          flat
          round
          dense
          @click="onClick"
        ></q-btn>
      </template>
      <q-carousel-slide
        v-for="(item, index) in list"
        :name="index"
        :key="index"
      >
        <img :src="`works/${item.url}.png`" class="slider__image" alt="chat" />
        <h3 class="slider__title">{{ item.title }}</h3>
        <p class="slider__text">{{ item.text1 }}</p>
        <br />
        <p class="slider__text">
          {{ item.text2 }}
        </p>
        <div class="slider__links">
          <span @click="goMarket(item.market)">
            <img src="appstore.svg" alt="appstore" />
          </span>
          <span @click="goMarket(item.store)">
            <img src="googleplay.svg" alt="googleplay" />
          </span>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { ref } from "vue";
const list = [
  {
    title: "Работа студентам",
    text1: "Приложение для поиска работы студентами",
    text2: `Приложение для поиска работы студентам в сфере продажи сим-карт. Приложение дает возможности:
							пошаговового прохождения обучения продаж продуктов компании, регистрации новых сотрудников в системе,
							получения уведомлений`,
    url: "studentswork",
    market: "https://play.google.com/store/apps/details?id=ru.sim.partner",
    store:
      "https://apps.apple.com/us/app/работа-студентам/id1515228466?l=ru&ls=1",
  },
  {
    title: "Мой Мобильный партнер",
    text1: "Корпортаивное приложение компании",
    text2: `
							Приложение для агентов и менеджеров в сфере продажи сим-карт. Приложение дает возможности:
							мониторинга
							статистики продаж, регистрации привлеченных клиентов в системе, получение актуальные новости для
							сотрудников.`,
    url: "mobilepartner",
    market: "https://play.google.com/store/apps/details?id=ru.mobile.partner",
    store: "https://apps.apple.com/ru/app/мой-мобильный-партнер/id1509915647",
  },
  {
    title: "Салаватстекло",
    text1: "Приложение крупнейшего Российского производителя стекла",
    text2: `Сложный технический конфигуратор стекольной продукции. Благодаря данному продукту клиенты ходинга
							Салаватстекло и Саратовстройстекло могут производить технический расчет и получение характеристик оконных
							изделий.`,
    url: "salstek",
    market: "https://play.google.com/store/apps/details?id=com.salstek.app",
    store:
      "https://apps.apple.com/ru/app/салаватстекло-конфигуратор/id1335344951",
  },
  {
    title: "Чат с юристом",
    text1: "Приложение для юридической компании",
    text2: `
							Идея классная, клиенты пишут на линию бесплатной консультации и становятся лидами компании. Часть из них
							конвертируется в клиентов. В целом компаниия получает до 100 запрсов в день`,
    url: "chat",
    market: "https://play.google.com/store/apps/details?id=ru.golinec.app",
    store: "https://apps.apple.com/ru/app/чат-с-юристом/id1437925841",
  },
  {
    title: "Работа вахтой",
    text1: "Приложение для поиска работы вахтовым методом",
    text2: `Android проект, который, за счет правильного позиционирования и настройки ключевых слов, генерирует
							заказчику(кадровое агентсво) по 10-20 кандидатов в день, для работы в условиях крайнего севера.`,
    url: "tour-1",
    market:
      "https://play.google.com/store/apps/details?id=com.ionicframework.sever725513",
    store: null,
  },
];
export default {
  // name: 'PageName',
  setup() {
    const goMarket = function (link) {
      // cordova.InAppBrowser.open(
      //   link,
      //   '_system',
      //   'location=yes'
      // );
    };
    return {
      goMarket,
      slide: ref(0),
      autoplay: ref(true),
      list,
    };
  },
};
</script>
<style lang="scss" scoped>
.slider {
  &__title {
    text-align: left;
    padding: 5px 0;
  }
  &__text {
    font-size: 14px;
    text-align: left;
  }
  &__image {
    max-width: 100%;
    width: 300px;
  }
  &__links {
    display: flex;
    justify-content: start;

    padding-top: 10px;
    padding-bottom: 50px;
    :first-child {
      margin-right: 10px;
    }
  }
}
</style>
