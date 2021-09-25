import React from 'react';

interface Props {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: Props): JSX.Element => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

export default Button;
