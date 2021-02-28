import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

interface PropTypes {
  onClick: () => any;
  disabled: boolean;
}
const SaveBtn = React.memo(({ onClick, disabled }: PropTypes) => {
  const mountedRef = useRef(true);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('Save');
  const [state, setState] = useState('primary');

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!disabled && label !== 'Save' && state !== 'primary' && mountedRef.current) {
      setLabel('Save');
      setState('primary');
    }
  }, [disabled, label, state]);

  const _onClick = async () => {
    if (typeof onClick === 'function' && mountedRef.current) {
      setLoading(true);
      setState('secondary');
      let error = false;
      if (onClick.constructor.name == 'AsyncFunction') {
        ({ error } = await onClick() || { error: true });
      } else {
        ({ error } = onClick() || { error: true })
      }
      if (mountedRef.current) {
        setLoading(false);
        if (error) {
          setLabel('Error');
          setState('danger');
          return;
        }
        setLabel('Saved!');
        setState('success');
      }
    }
  };

  return (
    <div className="d-flex flex-row align-items-center justify-content-end" >
      <Button
        label={label}
        loading={loading}
        className={`btn btn-${disabled ? 'secondary' : state} ${state === 'success' ? 'bg-success text-white' : null} btn-lg pr-4 pl-4`
        }
        onClick={_onClick}
        disabled={state === 'success' || disabled}
      />
    </div>
  );
});

export default SaveBtn;
