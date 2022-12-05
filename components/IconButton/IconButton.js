const icons = [
  {
    "iconName": "x", 
    "iconSvg": () => <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 7L7 17M7 7L17 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    "iconName": "<-",
    "iconSvg": () => <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 12H4M4 12L10 18M4 12L10 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    "iconName": "<",
    "iconSvg": () => <svg width="21" height="20" viewBox="0 0 21 20" stroke="currentColor" fill="none"><path d="M13 15L8 10L13 5" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
]

const IconButton = ({
  onClick,
  iconName,
  label,
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
        className: className + ' flex',
        onClick,
        disabled,
      }}>
        {icon && <Icon />}
        {label && <span className="text-sm my-auto">{label}</span>}
    </button>
  );
};

export default IconButton;
