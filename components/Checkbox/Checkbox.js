const Checkbox = ({
  label,
  intent,
  disabled
}) => {
  return (
    <label>
      <input type="checkbox" className="mr-2" disabled={disabled} />{label}
    </label>
  )
}

export default Checkbox;