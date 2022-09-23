import React from 'react';

interface TextFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.FormEvent) => void;
  /**
   * @default false
   */
  required: boolean;
  /**
   * @default false
   */
  readOnly: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, name, onChange, required = false, readOnly = false }) => {

  return (
    <div className="form-group">
      <label htmlFor={`txt${name}`} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id={`txt${name}`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      />
      {required && (
        <>
          <div className="invalid-feedback">Campo `{label}` é obrigatorio</div>
          <div className="valid-feedback">Campo `{label}` OK</div>
        </>
      )}
    </div>
  )
}

export default TextField;