import { computed, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export const useLoginForm = () => {
  const store = useStore();

  const router = useRouter();

  const { handleSubmit, isSubmitting, submitCount } = useForm();

  const { value: emailValue, errorMessage: emailErrorMessage, handleBlur: emailHandleBlur } = useField(
    'email',
    yup.string().trim().required('Please enter your email').email()
  );
  const { value: passwordValue, errorMessage: passwordErrorMessage, handleBlur: passwordHandleBlur } = useField(
    'password',
    yup.string().trim().required('You have to input password').min(6, 'Min length 6 symbols')
  );

  const isTooManyAttemps = computed(() => submitCount.value >= 3);

  watch(
    isTooManyAttemps,
    (val) => {
      if(val) {
        setTimeout(() => {
          submitCount.value = 0;
        }, 1500);
      }
    },
  )

  const onSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch('auth/login', values);
      router.push('/');
    } catch (e) {}
  });

  return {
    emailValue,
    emailErrorMessage,
    emailHandleBlur,
    passwordValue,
    passwordErrorMessage,
    passwordHandleBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttemps,
  };
};