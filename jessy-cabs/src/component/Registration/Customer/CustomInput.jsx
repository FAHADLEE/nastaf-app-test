import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Organization } from './Customerdata';

const CustomInput = () => {
    const [BillingGroup, setBillingGroup] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        Organization()
            .then((data) => {
                if (data) {
                    setBillingGroup(data);
                }
            })
    }, []);

    const handleInputChange = (event, newValue) => {
        setSelectedItems(newValue);
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
        <Autocomplete
            size='small'
            multiple
            id="checkboxes-tags-demo"
            options={BillingGroup}
            onChange={(event, value) => handleInputChange(event, value)}
            value={selectedItems}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label="BillingGroup" placeholder="Organization" />
            )}
        />
    );
};

export default CustomInput;