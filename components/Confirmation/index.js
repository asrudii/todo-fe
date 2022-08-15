import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Image from 'next/image';
import Button from '../Button';

export default function Confirmation({ open, onClose, onConfirmed, title }) {
  return (
    <div
      data-cy="modal-delete"
      style={{ backgrond: 'red', position: 'absolute' }}
    >
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="modal-confirm">
          <Image src="/icon/warning.svg" width={84} height={84} alt="warning" />
          <span style={{ textAlign: 'center', marginTop: '34px' }}>
            Apakah anda yakin menghapus activity <strong>“{title}”?</strong>
          </span>
        </div>
        <DialogActions>
          <div className="modal-confirm-btn">
            <Button title="Batal" type="basic" onClick={onClose} />
            <Button title="Hapus" type="danger" onClick={onConfirmed} />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
