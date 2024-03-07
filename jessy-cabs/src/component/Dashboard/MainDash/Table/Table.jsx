import { React, useState, useEffect } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tripdetails from './Tripdetails'; //tripsheet details page
import format from 'date-fns/format';
import "./Table.css";
import { Button, IconButton } from "@mui/material";
//dialog box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { APIURL } from "../../../url";

// ICON
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const apiUrl = APIURL;

const makeStyle = (status) => {
  if (status === 'Waiting' || status === 'On_Going') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status === 'Closed') {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const [filteredData, setFilteredData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const user_id = localStorage.getItem('useridno');

  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const currentPageName = 'Dashboard page';
        const response = await axios.get(`http://${apiUrl}/user-permissions/${user_id}/${currentPageName}`);
        setUserPermissions(response.data);
      } catch {
      }
    };

    fetchPermissions();
  }, [user_id]);

  const checkPagePermission = () => {
    const currentPageName = 'Dashboard page';
    const permissions = userPermissions || {};

    if (permissions.page_name === currentPageName) {
      return {
        read: permissions.read_permission === 1,
        new: permissions.new_permission === 1,
        modify: permissions.modify_permission === 1,
        delete: permissions.delete_permission === 1,
      };
    }

    return {
      read: false,
      new: false,
      modify: false,
      delete: false,
    };
  };

  const permissions = checkPagePermission();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${apiUrl}/tripsheet`);
        if (response.status === 200) {
          if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
              setFilteredData(data);
            } else {
              setFilteredData([]);
            }
          } else {
          }
        } else {
          const timer = setTimeout(fetchData, 2000);
          return () => clearTimeout(timer);
        }
      } catch {
      }
    };

    fetchData();
  }, []);

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleButtonClickTripsheet = (trip) => {
    setSelectedTrip(trip);
    setPopupOpen(true);
  };

  return (
    <div className="Table">
      <h1>Live Driver Status</h1>

      <TableContainer
        className="Scroll-Style"
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Driver</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {permissions.read && (
              filteredData && filteredData.length > 0 ? (
                filteredData.slice().reverse().map((trip) => (
                  <TableRow
                    key={trip.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{trip.driverName}</TableCell>
                    <TableCell align="left">TS{trip.tripid}</TableCell>
                    {/* <TableCell align="left">{trip.startdate}</TableCell> */}
                    <TableCell align="left">{format(new Date(trip.startdate), 'dd/MM/yyyy')}</TableCell>
                    <TableCell align="left"><span className="status" style={makeStyle(trip.apps)}>{trip.apps}</span></TableCell>
                    <TableCell align="left" className="Details">
                      <Button onClick={() => handleButtonClickTripsheet(trip)}>Details</Button>
                    </TableCell>

                    <Dialog open={popupOpen} className="dialog-box-TripDetails" >
                      <div className="dialog-close-btn">
                        <DialogActions>
                          <IconButton onClick={handlePopupClose} aria-label="delete">
                            <HighlightOffIcon />
                          </IconButton>
                        </DialogActions>
                      </div>
                      <DialogContent>
                        <Tripdetails />
                        {selectedTrip && <Tripdetails tripData={selectedTrip} />}
                      </DialogContent>
                    </Dialog>

                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No data available.</td>
                </tr>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
} 