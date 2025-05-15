import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const useRequestForm = (fn) => {

  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      status: 'active',
    },
  });

  const { value: fullName, errorMessage: fullNameError, handleBlur: fullNameBlur } = useField('fullName', yup.string().trim().required('Please enter client full name'));
  const { value: phone, errorMessage: phoneError, handleBlur: phoneBlur } = useField('phone', yup.string().trim().required('Please enter client phome'));
  const { value: amount, errorMessage: amountError, handleBlur: amountBlur } = useField('amount', yup.number().required('Please enter amount').min(0, 'Amount can\'t be smaller then 0'));
  const { value: status } = useField('status');

  const onSubmit = handleSubmit(fn);

  return {
    isSubmitting,
    onSubmit,
    fullName,
    fullNameError,
    fullNameBlur,
    phone,
    phoneError,
    phoneBlur,
    amount,
    amountError,
    amountBlur,
    status,
  }
};