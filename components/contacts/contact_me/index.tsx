import React, { useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { useForm } from 'react-hook-form';
import { ERROR_TIMEOUT } from '@/utils/constants';
import Api from '@api/.';

import styles from './styles.module.scss';

const ContactMe = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const isButtonDisabled = !!errors.result || isLoading;

  const errorMessage = useMemo(() => {
    if (errors?.contact?.type === 'required' || errors?.name?.type === 'required') {
      return 'Not all fields are filled';
    }

    if (errors?.result) {
      return 'Something went wrong:(';
    }

    return '';
  }, [errors.contact, errors.name, errors.result]);

  const onSubmit = async (data: any) => {
    if (data.name && data.contact) {
      setLoading(true);
      const res = await Api.landing.sendMail(data);
      setLoading(false);

      if (res.status === 'success') {
        setSuccessMessage('I will contact you soon!');
        return;
      }

      setError('result', { type: 'error' });
    }
  };

  useEffect(() => {
    if (errors.result) {
      setTimeout(() => {
        clearErrors('result');
      }, ERROR_TIMEOUT);
    }

    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage('');
      }, ERROR_TIMEOUT);
    }
  }, [errors.result, successMessage]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.main}>
      <div className={styles.inputs}>
        <input
          className={cls(styles.input, { [styles.error]: errors.name })}
          type="text"
          placeholder="Your name"
          {...register('name', { required: true })}
        />

        <input
          className={cls(styles.input, { [styles.error]: errors.contact })}
          type="text"
          placeholder="Your contact"
          {...register('contact', { required: true })}
        />
      </div>

      <textarea className={styles.text} cols={30} rows={10} placeholder="Your message" {...register('text')} />

      <div className={styles.button_wrapper}>
        <button className={styles.button} type="submit" disabled={isButtonDisabled}>
          Send
        </button>

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        {successMessage && <span className={styles.successMessage}>{successMessage}</span>}
      </div>
    </form>
  );
};

export default ContactMe;