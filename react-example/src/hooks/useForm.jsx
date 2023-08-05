import { useState, useCallback } from "react";

const useForm = (initialValues, validators) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});// {name: 'name is required', email: 'email is required'}
  const setFieldValue = useCallback((name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if(validators[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validators[name](value) // 调用验证方法，如果验证通过，返回undefined，否则返回错误信息
      }))
    }
  }, [validators]);
  return { values, setFieldValue, errors };
};

export default useForm;