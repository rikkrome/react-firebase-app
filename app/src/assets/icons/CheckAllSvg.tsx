import React from 'react';

const CheckAllSvg = ({className, width, height}: {className: string, width: number, height: number}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" className={`bi bi-check-all ${className}`} viewBox="0 0 16 16">
      <path d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
    </svg>
  )
}

CheckAllSvg.defaultProps = {
  className: null,
  width: 16,
  height: 16,
}
export default CheckAllSvg;
