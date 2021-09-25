import React, { useState } from 'react';

const useForm = () => {
  const [values, setValues] = useState({
    destination: '',
    tripStart: '',
    tripEnd: '',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { handleChange, values };
};

export default useForm;
