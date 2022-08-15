export default function Badge({ type }) {
  const colorBadge = () => {
    switch (type) {
      case 'very-high':
        return '#ed4c5c';
      case 'high':
        return '#FFCE31';
      case 'normal':
        return '#00A790';
      case 'low':
        return '#43C4E3';
      case 'very-low':
        return '#B01AFF';
      default:
        return '#ed4c5c';
    }
  };

  return (
    <div className="badge" style={{ backgroundColor: `${colorBadge()}` }}></div>
  );
}
