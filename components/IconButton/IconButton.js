const icons = [
  {
    "iconName": "x", 
    "iconSvg": () => <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 7L7 17M7 7L17 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    "iconName": "<",
    "iconSvg": () => <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 12H4M4 12L10 18M4 12L10 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  }
]

const IconButton = ({
  onClick,
  iconName,
  className,
  disabled
}) => {
  const icon = icons.find(element => element.iconName === iconName);
  let Icon;
  if (icon) Icon = icon.iconSvg;

  return (
    <button
      {...{
        type: "button",
        className,
        onClick,
        disabled,
      }}
    >{icon ? <Icon /> : iconName}
    </button>
  );
};

export default IconButton;
