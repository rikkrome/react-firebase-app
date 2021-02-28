import React from 'react'

const Alert = ({ text, type }: { text: string; type: string }) => {
  if (!text) {
    return null;
  }
  return (
    <div className={`alert alert-${type}`} role="alert">
      {text}
    </div>
  )
}

Alert.defaultProps = {
  text: '',
  type: 'success'
}
export default Alert; 
