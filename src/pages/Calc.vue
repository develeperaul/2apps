<template>
  <q-page class="calc p-content">
    <div id="counter" style="max-width: 500px">
      <div
        class="progress__block"
        style="opacity: 0"
        :style="{ opacity: slideLength ? 1 : 0 }"
      >
        <object type="image/svg+xml" data="2a.svg" width="96px">
          Your browser does not support SVG
        </object>
        <div class="progress" :style="{ width: '100%' }">
          <div
            class="progress-left"
            :style="{ width: `${(100 * currentSlide) / slideLength}%` }"
          ></div>
          <div
            class="progress-circle"
            :style="{
              left: `${
                currentSlide == 0
                  ? 10 + 'px'
                  : (100 * currentSlide) / slideLength + '%'
              }`,
            }"
          ></div>
          <div class="progress-right"></div>
        </div>

        <transition :name="transitionName" mode="out-in">
          <div
            v-if="show"
            class="content-calc"
            :style="{ 'max-height': contentHeight }"
          >
            <div v-if="slideLength > currentSlide">
              <div class="wrapper">
                <div class="title">
                  {{ current.title }}
                </div>
                <div class="content">
                  <div class="description">
                    {{ current.description }}
                  </div>
                  <div class="right">
                    <div
                      v-for="(option, index) in current.options"
                      :key="index"
                      class="choice"
                    >
                      <label :for="option.title" class="choice-label">
                        <input
                          v-if="current.multicheckbox"
                          type="checkbox"
                          :id="option.title"
                          :value="{ [currentSlide]: option }"
                          v-model="checkedNames"
                          class="option-input checkbox"
                        />
                        <input
                          v-else
                          type="radio"
                          @change="add"
                          :id="option.title"
                          :value="{
                            [currentSlide]: {
                              multicheckbox: current.multicheckbox,
                              ...option,
                            },
                          }"
                          v-model="radioNames"
                          class="option-input radio"
                        />
                        <span class="choice-title">
                          {{ option.title }}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="slideLength == currentSlide">
              <div class="amount">
                Приблизительная стоимость <br />
                {{ animatedNumber }} ₽
              </div>
              <p style="margin: 40px auto">
                Впишите ваши ФИО и телефон, мы свяжемся с вами
              </p>
              <form @submit.prevent="submit" id="feed_form">
                <div class="offset">
                  <input
                    class="input center"
                    name="fio"
                    placeholder="ФИО"
                    type="text"
                    required="true"
                  />
                </div>
                <div class="offset">
                  <input
                    class="input center"
                    id="phone"
                    name="phone"
                    placeholder="Телефон"
                    type="text"
                    required="true"
                  />
                </div>
                <button type="submit" class="but1_1 but1_2">
                  Получить консультацию
                </button>
              </form>
              <button v-show="currentSlide !== 0" @click="prev" class="prev">
                Предыдущий шаг
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="bottom" mode="out-in">
      <div v-if="showButton" class="calc__button">
        <div class="button-group">
          <button @click="next" class="button but1_1 but1_2 next">
            Следующий шаг
          </button>
          <button v-show="currentSlide !== 0" @click="prev" class="prev">
            Предыдущий шаг
          </button>
        </div>
        <div class="amount">
          Приблизительная стоимость <br />
          {{ animatedNumber }} ₽
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import { ref, watch, computed, onMounted } from "vue";
import gsap from "gsap";
import data from "src/data.json";
// import nodemailer from "nodemailer";
export default {
  // name: 'PageName',
  setup(props) {
    const jsonData = data.data;
    const json = jsonData;
    const slideLength = json.length;
    const currentSlide = ref(0);
    const show = ref(true);
    const showButton = ref(true);
    const amount = ref(0);
    const checkedNames = ref([]);
    const radioNames = ref({});
    const summ = ref([]);
    const tweenedNumber = ref(0);
    // const filled = ref([]);
    const current = computed(() => {
      return json[currentSlide.value];
    });
    const transitionName = ref("fade");

    const progressHeight = ref(0);
    const pageHeight = ref(0);
    const bottomHeight = ref(0);
    const setHeight = () => {
      progressHeight.value =
        document.querySelector(".progress__block")?.offsetHeight;
      bottomHeight.value =
        document.querySelector(".calc__button")?.offsetHeight;

      pageHeight.value = document.querySelector(".calc")?.offsetHeight;
    };
    // const filled = ref([]);
    const add = () => {
      if (
        checkedNames.value[checkedNames.value.length - 1] &&
        checkedNames.value[checkedNames.value.length - 1].hasOwnProperty(
          Object.keys(radioNames.value)[0]
        )
      ) {
        checkedNames.value.splice(
          checkedNames.value.length - 1,
          1,
          radioNames.value
        );
      } else {
        checkedNames.value.push(radioNames.value);
      }
    };
    const next = () => {
      transitionName.value = "fade";
      setHeight();

      if (
        checkedNames.value.find(
          (item) => Object.keys(item)[0] == currentSlide.value
        )
      ) {
        show.value = false;
        if (currentSlide.value < slideLength) currentSlide.value++;
        if (showButton.value && slideLength <= currentSlide.value)
          showButton.value = false;
        setInterval(() => {
          show.value = true;
        }, 100);
      }
    };

    const prev = () => {
      transitionName.value = "prev";
      show.value = false;
      setHeight();
      if (currentSlide.value >= 1) currentSlide.value--;
      if (!showButton.value && slideLength >= currentSlide.value)
        showButton.value = true;
      setInterval(() => {
        show.value = true;
      }, 100);
    };
    const submit = async () => {
      // mail("Рассчитать стоимость разработки").catch(console.error);
      // console.log(require("nodemailer"));
      // const nodemailer = require("nodemailer");
    };
    // const mail = async function (textMail) {
    //   let transporter = nodemailer.createTransport({
    //     host: "smtp.yandex.ru",
    //     port: 465,
    //     secure: true, // true for 465, false for other ports
    //     auth: {
    //       user: "calculate2apps@yandex.ru", // generated ethereal user
    //       pass: "jrcocafmqdhmandt", // generated ethereal password
    //     },
    //   });

    //   // send mail with defined transport object
    //   let info = await transporter.sendMail({
    //     from: "calculate2apps@yandex.ru", // sender address
    //     to: "info@2apps.ru", // list of receivers
    //     subject: "Бот 2apps", // Subject line
    //     text: `${textMail}`, // plain text body
    //   });

    //   console.log("Message sent: %s", info.messageId);
    // };

    const contentHeight = computed(
      () => `${pageHeight.value - bottomHeight.value - progressHeight.value}px`
    );

    onMounted(() => {
      setHeight();
    });

    const count = computed(() => {
      let array = [];
      checkedNames.value.forEach((item, index) => {
        let count = 0;
        if (
          checkedNames.value[index - 1] &&
          Object.keys(checkedNames.value[index - 1])[0] == Object.keys(item)[0]
        ) {
          const current = item;
          const next = checkedNames.value[index - 1];

          if (Object.values(next)[0].hasOwnProperty("price"))
            count =
              array.splice(array.length - 1, 1)[0] +
              Object.values(next)[0].price;
          if (Object.values(next)[0].hasOwnProperty("koef"))
            count =
              array.splice(array.length - 1, 1)[0] +
              Object.values(next)[0].koef;
        } else {
          if (Object.values(item)[0].hasOwnProperty("price"))
            count = count + Object.values(item)[0].price;
          if (Object.values(item)[0].hasOwnProperty("koef"))
            count = count + Object.values(item)[0].koef;
        }
        array.push(count);
      });

      return Math.ceil(
        array.reduce((a, b) => {
          if (a == 0) return (a = b);

          return a * b;
        }, 0)
      );
    });
    const animatedNumber = computed(() => {
      return String(tweenedNumber.value.toFixed(0))
        .replace(/[^0-9]/g, "")
        .match(/.{1,3}(?=(.{3})*$)/g)
        .join(" ");
    });

    watch(currentSlide, (newValues, prevValues) => {
      if (newValues < prevValues) {
        radioNames.value = checkedNames.value.find((item) => {
          return item[newValues]?.multicheckbox == false;
        });

        checkedNames.value = checkedNames.value.filter((item) => {
          if (Object.keys(item)[0] <= newValues) return item;
        });
      }
    });
    watch(count, (newValue) => {
      gsap.to(tweenedNumber, { duration: 1, value: newValue.toFixed(0) });
    });
    return {
      currentSlide,
      slideLength,
      json,
      count,
      next,
      prev,
      contentHeight,
      checkedNames,
      radioNames,
      add,
      current,
      show,
      showButton,
      tweenedNumber,
      animatedNumber,
      transitionName,
      submit,
    };
    // return {
    //   data: data,
    // };
  },
};
</script>
<style scoped>
.content-calc {
  position: absolute;
  max-width: 500px;
  min-width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  overflow-y: scroll;
  right: 50%;

  transform: translate(50%, 15px) !important;
}
.input {
  display: block;
  width: 100%;
  max-width: 320px;
  height: 40px;
  border: 1px solid #ccc;
  padding: 12px;
  box-sizing: border-box;
}

.center {
  margin: 0 auto;
}

.offset {
  margin-bottom: 15px;
}

.fade-enter-active {
  animation: slideIn 0.6s;
  animation-timing-function: ease-out;
}
.fade-leave-active {
  animation: slideOut 0.6s;
  animation-timing-function: ease-out;
}

.bottom-enter-active {
  animation: slideUp 0.66s;
  animation-timing-function: ease-out;
}

.bottom-leave-active {
  animation: slideDown 0.6s;
  animation-timing-function: ease-out;
}

.prev-enter-active {
  animation: prevSlideIn 0.6s;
  animation-timing-function: ease-out;
}
.prev-leave-active {
  animation: prevSlideOut 0.6s;
  animation-timing-function: ease-out;
}
@keyframes slideIn {
  from {
    transform: translate(40%, 15px);
    opacity: 0;
  }
  to {
    transform: translate(50%, 15px);
    opacity: 1;
  }
}
@keyframes slideOut {
  from {
    transform: translate(50%, 15px);
    opacity: 1;
  }
  to {
    transform: translate(60%, 15px);
    opacity: 0;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(9999px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slideDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(9999px);
    opacity: 0;
  }
}
@keyframes prevSlideIn {
  from {
    transform: translate(60%, 15px);
    opacity: 0;
  }
  to {
    transform: translate(50%, 15px);
    opacity: 1;
  }
}
@keyframes prevSlideOut {
  from {
    transform: translate(50%, 15px);
    opacity: 1;
  }
  to {
    transform: translate(40%, 15px);
    opacity: 0;
  }
}
.logo {
  width: 96px;
  margin: auto;
}
.wrapper {
  display: flex;
  flex-direction: column;
}
.content {
  max-width: 750px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  /* justify-content: center; */
}
.amount {
  font-weight: 550;
  font-size: 24px;
  line-height: 32px;
}
.amount,
.title {
  text-align: center;
}
.title {
  font-size: 18px;
  line-height: 1.8em;
  font-weight: 550;
  padding: 0 0 15px 0;
}
/* .left,
			.right {
				border: 1px solid red;
				width: 100%;
				padding: 10px;
			} */
.description {
  text-align: center;
  font-size: 16px;
  line-height: 28px;
  font-weight: 400;
}

.prev {
  margin-top: 10px;
  margin-bottom: 10px;
}

.prev {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  /* font-weight: 550; */
  /* отображаем курсор в виде руки при наведении; некоторые
				считают, что необходимо оставлять стрелочный вид для кнопок */
  cursor: pointer;
  color: #ca083b;
}

.main_b .but1 {
  position: absolute;
  bottom: 70px;
  width: 100%;
  /*opacity: 0;*/
  z-index: 1;
  font-size: 13px;
  -webkit-animation: _3hQ2jb6feIHlJ_zIdyVHPk;
  animation: _3hQ2jb6feIHlJ_zIdyVHPk;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
.main_b .but1 a {
  text-decoration: none;
}
.but1_1 {
  background-color: #ca083b;
  color: #fff;
  box-shadow: 0 0.3em 1em rgba(0, 0, 0, 0.15);
  background: -webkit-linear-gradient(75deg, #ca083b, #f60f4c);
  background: linear-gradient(15deg, #ca083b, #f60f4c);
}
.but1_2 {
  margin: 5px;
  font-size: 14px;
  border-radius: 50px;
  border: none;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.6em 1.6em 0.5em;
  /*letter-spacing: .1em;*/
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  -webkit-transition: background 0.25s ease, color 0.25s ease,
    opacity 0.25s ease;
  transition: background 0.25s ease, color 0.25s ease, opacity 0.25s ease;
}
.but1_2:hover {
  background-color: #f74171;
  background: -webkit-linear-gradient(75deg, #f60f4c, #f74171);
  background: linear-gradient(15deg, #f60f4c, #f74171);
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.button {
  align-self: center;
  background-color: #ca083b;
}
.progress {
  height: 2px;
  margin: auto;

  background-color: grey;
  border-radius: 10px;
  position: relative;
}

.progress-circle {
  border-radius: 50%;
  height: 10px;
  width: 10px;
  background-color: #f60f4c;
  position: absolute;
  transform: translate(-10px, -37.5%);
  transition: left 1.2s;
}
.progress-left {
  height: 2px;
  background: linear-gradient(15deg, #ca083b, #f60f4c);
  transition: width 1.2s;
  position: absolute;
}

* {
  font-family: "Roboto", sans-serif;
}

@keyframes click-wave {
  0% {
    height: 20px;
    width: 20px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    height: 60px;
    width: 60px;
    margin-left: -24px;
    margin-top: -24px;
    opacity: 0;
  }
}

.option-input {
  flex-shrink: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  position: relative;
  top: 6.33333px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 20px;
  width: 20px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.5rem;
  outline: none;
  position: relative;
  z-index: 1000;
}
.option-input:hover {
  background: #9faab7;
}
.option-input:checked {
  background: #ca083b;
}
.option-input:checked::before {
  height: 20px;
  width: 20px;
  position: absolute;
  content: "✔";
  display: inline-block;
  font-size: 18.66667px;
  text-align: center;
  line-height: 20px;
}
.option-input:checked::after {
  -webkit-animation: click-wave 0.65s;
  -moz-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #40e0d0;
  content: "";
  display: block;
  position: relative;
  z-index: 100;
}
.option-input.radio {
  border-radius: 50%;
}
.option-input.radio::after {
  border-radius: 50%;
}

.choice-label {
  display: flex;
  line-height: 20px;
  align-items: baseline;
}
.choice-title {
  text-align: left;
}

.choice {
  display: flex;
  margin-bottom: 2px;
}
.calc1 {
  top: -30%;
}

.calc__button {
  padding: 10px 0;
  position: absolute;
  bottom: 0;
}
</style>
