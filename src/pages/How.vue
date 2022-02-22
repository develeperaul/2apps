<template>
  <q-page>
    <div class="slide p-content" v-for="(item, index) in list" :key="index">
      <div class="slide__content">
        <h2 v-if="item.title">{{ item.title }}</h2>
        <h2>{{ item.subtitle }}</h2>
        <p>
          {{ item.text }}
        </p>
      </div>
      <img class="slide__img" :src="`how/proccess-${item.url}.png`" alt="" />
    </div>
    <div>
      <h2>ЕСТЬ КЛАССНАЯ ИДЕЯ?</h2>
      <BaseButton
        style="margin-bottom: 20px"
        text="Расчитать стоимость"
        @click="() => $router.push({ name: 'calc' })"
      />
    </div>
  </q-page>
</template>

<script>
import BaseButton from "src/components/BaseButton.vue";
const list = [
  {
    title: "КАК МЫ РАБОТАЕМ",
    subtitle: "ПОГРУЖЕНИЕ",
    text: "У вас есть классная идея? Мы погружаемся в вашу тематику и идею, анализируем нишу и создаем базовую концепцию, которую в дальнейшем будем развивать.",
    url: 1,
  },
  {
    subtitle: "КОНЦЕПЦИЯ",
    text: "Мы будем работать вместе до создания рабочего прототипа. Кроме того, благодаря итерационному подходу вы будете довольны конечным результатом.",
    url: 2,
  },
  {
    subtitle: "РАЗРАБОТКА",
    text: "На данном этапе наша команда разрабатывает ваш продукт. Вы контроллируете прогресс на всех этапах через специальный инструмент, который вы получите.",
    url: 3,
  },
  {
    subtitle: "ПРИЛОЖЕНИЕ",
    text: "Ваше приложение готово. Вы получите не только опубликованные приложения, но и полноценную документацию, а также программные коды. Мы всегда помогаем с продвижением приложения, что очень важно.",
    url: 4,
  },
];
export default {
  // name: 'PageName',
  components: { BaseButton },
  setup() {
    return {
      list,
    };
  },
};
</script>
<style lang="scss" scoped>
.slide {
  // display: flex;
  // flex-direction: column;

  &__img {
    max-width: 100%;
    width: 50%;
    // height: 295px;

    // background-repeat: no-repeat;
    // background-size: contain;
    // background-position: center;
    // min-height: 100%;
  }
  &__content {
  }
}
</style>
