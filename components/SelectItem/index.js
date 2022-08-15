import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Image from 'next/image';
import { useState } from 'react';
import Badge from '../Badge';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 205,
      fontFamily: 'Poppins',
    },
  },
};

export default function SelectItem({ onChange, data }) {
  const [priority, setPriority] = useState([data]);

  return (
    <div>
      <FormControl sx={{ width: 205 }}>
        <Select
          className="select-item"
          displayEmpty
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            onChange(e.target.value);
          }}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">Pilih Priority</MenuItem>
          <MenuItem value="very-high">
            <div className="priority-item-wrap">
              <div className="dsc-priority">
                <Badge type="very-high" />
                Very High
              </div>
              {priority === 'very-high' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </div>
          </MenuItem>
          <MenuItem value="high">
            <div className="priority-item-wrap">
              <div className="dsc-priority">
                <Badge type="high" />
                High
              </div>
              {priority === 'high' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </div>
          </MenuItem>
          <MenuItem value="normal">
            <div className="priority-item-wrap">
              <div className="dsc-priority">
                <Badge type="normal" />
                Medium
              </div>
              {priority === 'normal' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </div>
          </MenuItem>
          <MenuItem value="low">
            <div className="priority-item-wrap">
              <div className="dsc-priority">
                <Badge type="low" />
                Low
              </div>
              {priority === 'low' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </div>
          </MenuItem>
          <MenuItem value="very-low">
            <div className="priority-item-wrap">
              <div className="dsc-priority">
                <Badge type="very-low" />
                Very Low
              </div>
              {priority === 'very-low' && (
                <Image
                  src="/icon/checklist.svg"
                  width={18}
                  height={18}
                  alt="checked-btn"
                />
              )}
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
