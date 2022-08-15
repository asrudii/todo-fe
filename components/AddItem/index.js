import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SelectItem from '../SelectItem';
import Button from '../Button';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '830px',
    width: '830px',
    boxShadow: 'none',
    borderRadius: '12px',
  },
  '& .MuiDialogContent-root': {
    padding: '38px 30px',
    fontFamily: 'Poppins',
  },
  '& .MuiDialogActions-root': {
    padding: '20px 40px',
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          data-cy="modal-add-close-button"
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddItem({
  open,
  onClose,
  setName,
  setPriority,
  onAddTodo,
  onEditTodo,
  data,
}) {
  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          <span data-cy="modal-add-title" className="add-list">
            {data ? 'Edit Item' : 'Tambah List Item'}
          </span>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="dialog-content">
            <div className="form-group">
              <span data-cy="modal-add-name-title">NAMA LIST ITEM</span>
              <input
                defaultValue={data?.title}
                data-cy="modal-add-name-input"
                type="text"
                placeholder="Tambahkan nama list item"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <span data-cy="modal-add-priority-title">PRIORITY</span>
              <SelectItem
                data={data?.priority}
                data-cy="modal-add-priority-dropdown"
                onChange={setPriority}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            data-cy="modal-add-save-button"
            onClick={data ? onEditTodo : onAddTodo}
            title="Simpan"
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
