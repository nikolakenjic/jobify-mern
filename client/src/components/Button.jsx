/* eslint-disable react/prop-types */
const Button = ({ type, btnName, className, disabled, onClick }) => {
  return (
    <button
      type={type || 'button'}
      className={`btn btn-block ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {btnName}
    </button>
  );
};

export default Button;
