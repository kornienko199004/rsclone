import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

const fontSize = 22;
const radius = 18;

const Node = ({ node }: any) => {
  const sizes = {
    radius,
    textSize: fontSize,
    textX: radius * 1.5,
    textY: radius / 2,
  };

  let link = '';
  const handleDoubleClick = () => {
    link = '/';
  };

  return (
    <>
      <Link component={RouterLink} to={link} onDoubleClick={() => { handleDoubleClick(); }}>
        <circle
          fill=" #3f51b5"
          stroke=" #3f51b5"
          r={sizes.radius}
        />
        <g style={{ fontSize: `${sizes.textSize}px` }}>
          <text
            x={sizes.radius + 7}
            y={sizes.radius / 2}
          >
            {node.title}
          </text>
        </g>
      </Link>
    </>
  );
};
export default Node;
