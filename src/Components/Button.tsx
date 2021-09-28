import React from 'react';

interface Props {
  id: string;
  text: string;
  onClick: () => void;
}

const Button = ({ id, text, onClick }: Props): JSX.Element => {
  return (
    <div>
      <button id="" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
