import React from 'react';

const NotFound = ({message}) => (
  <div className="nrl__notfound">
    { message ? message: 'Entry Not Found...'}
  </div>
);

export default NotFound;