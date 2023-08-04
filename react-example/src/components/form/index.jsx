import React, { useCallback, useMemo } from "react";
import useForm from "../../hooks/useForm";

export default function FormExample() {
  const validators = useMemo(() => ({
    name: (value) => {
      if (!value) {
        return "name is required";
      }
    },
    email: (value) => {
      if (!value) {
        return "email is required";
      }
    },
  }), []);

  const { values , setFieldValue, errors } = useForm(
    {
      name: '',
      email: ''
    }, 
    validators
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(values);
  }, [values]);
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <span className="color-error">{errors.name}</span>
        <input type="text" value={values.name} onChange={e => setFieldValue('name', e.target.value)}/>
      </div>
      <div>
        <label>Email:</label>
        <span className="color-error">{errors.email}</span>
        <input type="text" value={values.email} onChange={e => setFieldValue('email', e.target.value)}/>
      </div>
      <button type="submit">submit</button>
      <div>
        {JSON.stringify(values)}
      </div>
    </form>
  )
};