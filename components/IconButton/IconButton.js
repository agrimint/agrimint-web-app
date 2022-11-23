import Image from "next/image";

const icons = [
  {
    "iconName": "x", 
    "iconSvg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7L7 17M7 7L17 17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  }
]

const IconButton = ({
  onClick,
  iconName,
  className,
  disabled
}) => {
  const icon = icons.find(element => element.iconName === iconName);
  let iconSvg;
  if (icon) iconSvg = icon.iconSvg;

  return (
    <button
      {...{
        type: "button",
        className,
        onClick,
        disabled,
      }}
    ><Image src={`data:image/svg+xml;utf8,${iconSvg}`} width={24} height={24} alt="Icon" />
    </button>
  );
};

export default IconButton;
