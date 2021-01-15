import React from 'react';

interface Proptypes {
  loading?: boolean;
  label: string;
  onClick: () => any;
  className?: string;
  disabled?: boolean;
}
const Button = ({loading, label, onClick, className, disabled}: Proptypes) => {
  return loading ? (
    <button type="button" className={className} disabled>
      <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
      Loading...
    </button>
  ) : (
      <button type="button" className={className} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    );
};

export default Button;
