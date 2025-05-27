<template>
  <AppPage back title="About">
    <QuestionItem
      v-for="(question, idx) in questions"
      :key="idx"
      :question="question"
    />
  </AppPage>
</template>

<script>
import AppPage from '../components/ui/AppPage.vue';
import QuestionItem from '../components/questions/QuestionItem.vue';

export default {
  components: {
    AppPage,
    QuestionItem,
  },

  setup() {
    const questions = [
      {title: 'Что есть в данной системе?', text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'},
      {title: 'Как тут работает авторизация?', text: 'Все реализовано через Firebase'},
    ];

    return { questions };
  },
}
</script>
