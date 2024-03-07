import React, { useState } from 'react'
import "./Others.css";
import Select from '@mui/material/Select';
import Insurance from './Insurance/Insurance';
import Utilities from './Utilities/Utilities';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropetiesRent from './PropetiesRent/PropetiesRent';
import TravelExpense from './TravelExpense/TravelExpense';
import OfficeSuppliers from './OfficeSuppliers/OfficeSuppliers ';
import BusinessExpense from './BusinessExpense/BusinessExpense';

const Others = () => {
  const [selectOtherExpense, setSelectOtherExpense] = useState('');


  // Function to handle option selection
  const handleChange = (event) => {
    setSelectOtherExpense(event.target.value);
  };
  return (
    <div className="Others-form Scroll-Style-hide">
      <form >
        <div className="input-field">
          <div className="input" style={{ width: "300px" }}>
            <FormControl sx={{ m: 1, minWidth: 210 }} size="small">
              <InputLabel id="demo-select-small-label">Select Other Expense</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectOtherExpense}
                label="Select Other Expense"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Properties-Rent</MenuItem>
                <MenuItem value={20}>Insurance</MenuItem>
                <MenuItem value={30}>Utilities</MenuItem>
                <MenuItem value={40}>Office-Supplies</MenuItem>
                <MenuItem value={50}>Traveling</MenuItem>
                <MenuItem value={60}>Business-License & Permits</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {selectOtherExpense === 10 && <div><PropetiesRent /></div>}
        {selectOtherExpense === 20 && <div><Insurance /></div>}
        {selectOtherExpense === 30 && <div><Utilities /></div>}
        {selectOtherExpense === 40 && <div><OfficeSuppliers /></div>}
        {selectOtherExpense === 50 && <div><TravelExpense /></div>}
        {selectOtherExpense === 60 && <div><BusinessExpense /></div>}
      </form>
    </div>
  )
}

export default Others