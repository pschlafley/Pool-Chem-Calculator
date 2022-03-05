import React from 'react';

const Select = ({
  name,
  label,
  onInputChange,
  placeholder,
  value,
  inputOptions,
  inputRef,
}) => {
  const renderOptions = () =>
    inputOptions.map(({ id, label }) => (
      <option key={id} value={id}>
        {label}
      </option>
    ));

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={onInputChange}
        value={value}
        ref={inputRef}
        required
      >
        <option value={null} defaultValue hidden>
          {placeholder}
        </option>
        {renderOptions()}
      </select>
    </>
  );
};

export default Select;
