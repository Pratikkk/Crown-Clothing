import "./form-input.scss";
export function FormInput({ label, ...otherProps }) {
  const { value, ...inputProps } = otherProps;

  return (
    <div className="form-input-container">
      <input className="form-input" {...inputProps} />
      {label && (
        <label className={`${value.length ? "shrink" : ""} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
}
