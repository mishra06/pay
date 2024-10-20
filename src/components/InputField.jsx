import React from 'react';

const InputField = ({ label, name, value, onChange, type = 'number' }) => (
  <div className="input-field">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default InputField;