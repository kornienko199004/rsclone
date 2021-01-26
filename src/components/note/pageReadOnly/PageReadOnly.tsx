/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// import shortid from 'shortid';

function TemplateReadOnly(props: any) {
  const { children, onClick } = props;
  return (
    // eslint-disable-next-line react/no-danger
    <div className="readonly-wrapper" onClick={onClick}>
      {children}
    </div>
  );
}

export default TemplateReadOnly;
