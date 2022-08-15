import AddIcon from '@mui/icons-material/Add';

export default function Button({ title, onClick, addIcon, disabled, type }) {
  const bgColor = () => {
    switch (type) {
      case 'primary':
        return '#16abf8';
      case 'danger':
        return '#ED4C5C';
      case 'basic':
        return '#F4F4F4';
      default:
        return '#16abf8';
    }
  };

  const textColor = () => {
    if (type === 'basic') return 'inherit';
    return '#ffffff';
  };

  return (
    <button
      className="btn-add"
      style={{ backgroundColor: `${bgColor()}`, color: `${textColor()}` }}
      onClick={onClick}
      disabled={disabled}
    >
      {addIcon && <AddIcon />}
      {title}
    </button>
  );
}
