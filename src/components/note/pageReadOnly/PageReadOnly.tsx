import React from 'react';
import shortid from 'shortid';

function TemplateReadOnly(props: any) {
  const { onAddNeighbor, onAddChild, content } = props;
  return (
    <div key={shortid.generate()}>
      <button type="button">Открыть</button>
      <button type="button" onClick={onAddChild}>Add child</button>
      <button type="button" onClick={onAddNeighbor}>Add neighbor</button>
      <p className="content">{content}</p>
    </div>
  );
}

export default TemplateReadOnly;
