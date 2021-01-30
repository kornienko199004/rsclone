/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import RSCloneServiceContext from '../../../rsCloneServiceContext/index';

const fontSize = 18;
const radius = 14;

const Node = ({ node }: any) => {
  const [link, setLink] = useState('');
  const sizes = {
    radius,
    textSize: fontSize,
    textX: radius * 1.5,
    textY: radius / 2,
  };
  const service = useContext(RSCloneServiceContext);
  const showNote = async (title: string) => {
    const res = await service.getNoteByTitle(title);
    const id = await res.DATA._id;
    await setLink(`/note/${id}`);
  };

  return (
    <>
      {(link)
        ? <Redirect to={link} />
        : (
          <>
            <circle
              fill=" #3f51b5"
              stroke=" #3f51b5"
              r={sizes.radius}
              onClick={() => {
                showNote(node.title);
              }}
            />
            <g style={{ fontSize: `${sizes.textSize}px` }}>
              <text
                x={sizes.radius + 7}
                y={sizes.radius / 2}
              >
                {node.title}
              </text>
            </g>
          </>
        )}
    </>
  );
};
export default Node;
