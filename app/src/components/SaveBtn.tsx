import React, {useState, useEffect} from 'react';
import Button from './Button';

interface PropTypes {
  onClick: () => any;
  disabled: boolean;
}
const SaveBtn = React.memo(({onClick, disabled}: PropTypes) => {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('Save');
  const [state, setState] = useState('primary');

  useEffect(() => {
    if (!disabled && label !== 'Save' && state !== 'primary') {
      setLabel('Save');
      setState('primary');
    }
  }, [disabled, label, state]);

  const _onClick = async () => {
    if (typeof onClick === 'function') {
      setLoading(true);
      setState('secondary');
      let error = false;
      if (onClick.constructor.name == 'AsyncFunction') {
        ({error} = await onClick() || {error: true});
      } else {
        ({error} = onClick() || {error: true})
      }
      setLoading(false);
      if (error) {
        setLabel('Error');
        setState('danger');
        return;
      }
      setLabel('Saved!');
      setState('success');
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
