interface Props {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: Props) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};
