const FormRowStatusAndTypes = ({
  name,
  labelText,
  defaultValue,
  list,
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        onChange={onChange}
        defaultValue={defaultValue || ''}
      >
        {list.map((jobStatus) => {
          return (
            <option key={jobStatus} value={jobStatus}>
              {jobStatus}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowStatusAndTypes;
