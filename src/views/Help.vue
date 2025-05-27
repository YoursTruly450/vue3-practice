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
      {title: 'What is in this system?', text: 'Here you have everything you need to see what requests a person has added'},
      {title: 'How does authorization work here?', text: 'Everything is implemented through Firebase'},
    ];

    return { questions };
  },
}
</script>
