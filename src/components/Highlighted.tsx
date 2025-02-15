const Highlighted = ({ text = "", highlight = "", style = {} }) => {

  if (!highlight?.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text?.toString()?.split(regex);

  return (
    <span>
      {parts?.map((part, i) =>
        regex?.test(part) ? (
          <mark
            style={{
              color: '#000',
              backgroundColor: '#F3E5AB',
              ...style,
            }}
            key={i}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default Highlighted;
