import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Image from 'next/image';

export default function SortButton({ onSort, sort }) {
  const handShowMenu = () => {
    document.getElementsByClassName('sort-menu')[0].classList.toggle('show');
  };

  const handHideMenu = () => {
    document.getElementsByClassName('sort-menu')[0].classList.remove('show');
    console.log('hoi');
  };

  return (
    <div className="sort-wrap">
      <button data-cy="todo-sort-button" onClick={handShowMenu}>
        <Image src="/icon/sort.svg" width={54} height={54} alt="sort-btn" />
      </button>
      <div className="sort-menu">
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handHideMenu();
                onSort('latest');
              }}
            >
              <ListItemIcon>
                <Image
                  src="/icon/latest.svg"
                  width={18}
                  height={18}
                  alt="sort-btn"
                />
              </ListItemIcon>
              <ListItemText primary="Terbaru" />
              {sort === 'latest' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                onSort('oldest');
                handHideMenu();
              }}
            >
              <ListItemIcon>
                <Image
                  src="/icon/oldest.svg"
                  width={18}
                  height={18}
                  alt="sort-btn"
                />
              </ListItemIcon>
              <ListItemText primary="Terlama" />
              {sort === 'oldest' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                onSort('az');
                handHideMenu();
              }}
            >
              <ListItemIcon>
                <Image
                  src="/icon/az.svg"
                  width={18}
                  height={18}
                  alt="sort-btn"
                />
              </ListItemIcon>
              <ListItemText primary="A-Z" />
              {sort === 'az' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                onSort('za');
                handHideMenu();
              }}
            >
              <ListItemIcon>
                <Image
                  src="/icon/za.svg"
                  width={18}
                  height={18}
                  alt="sort-btn"
                />
              </ListItemIcon>
              <ListItemText primary="Z-A" />
              {sort === 'za' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                onSort('unfinish');
                handHideMenu();
              }}
            >
              <ListItemIcon>
                <Image
                  src="/icon/unfinish.svg"
                  width={18}
                  height={18}
                  alt="sort-btn"
                />
              </ListItemIcon>
              <ListItemText primary="Belum Selesai" />
              {sort === 'unfinish' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
