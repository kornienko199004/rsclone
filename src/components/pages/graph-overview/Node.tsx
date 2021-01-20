import React from 'react';

const fontSize = 18;
const radius = 14;

const Node = ({ node }: any) => {
  const sizes = {
    radius,
    textSize: fontSize,
    textX: radius * 1.5,
    textY: radius / 2,
  };

  return (
    <>
      <circle
        onContextMenu={(event) => {
          alert(`You pressed button: ${event.button}`);
        }}
        fill="#240053"
        stroke="#330033"
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
    </>
  );
};
export default Node;
