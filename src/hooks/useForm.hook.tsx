import React, { useState } from 'react';

const useForm: any = () => {
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

  return { handleChange, values } as const;
};

export default useForm;
