import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';

export default function AlertAct({ open, onClose, title }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={onClose}
    >
      <Alert data-cy="modal-information" severity="info" className="alert">
        {title}
      </Alert>
    </Backdrop>
  );
}
