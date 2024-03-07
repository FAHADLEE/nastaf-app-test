import React from "react";
import "./MailDetails.css";
import { Table } from "@mui/joy";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";

// ICONS
import SmsIcon from '@mui/icons-material/Sms';
import SendIcon from '@mui/icons-material/Send';
import BookIcon from '@mui/icons-material/Book';
import DeleteIcon from "@mui/icons-material/Delete";
import { AiOutlineFileSearch } from "react-icons/ai";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";


const rows = [
  // createData('1', "John Doe", "9912277222"),
  // createData('2', "Jane Smith", "9123317892"),
  // createData('3', "Michael Johnson", "73421288938"),
  // createData('4', "Sarah Davis", "62779165285"),
  // createData('5', "Robert Wilson", "7729734456"),

];


// const rowsTemplate = [
// createDataTemplate('1', '123', 'Hello, how are you?'),
// createDataTemplate('2', '124', 'Reminder: Your appointment is tomorrow.'),
// createDataTemplate('3', '125', 'Congratulations! You won a prize.'),
// createDataTemplate('4', '126', 'URGENT: Action required. Please respond.'),
// createDataTemplate('5', '127', 'Thank you for your purchase.'),

// ];
// TABLE END

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <ChecklistIcon />, name: "List" },
  { icon: <CancelPresentationIcon />, name: "Cancel" },
  { icon: <DeleteIcon />, name: "Delete" },
  { icon: <ModeEditIcon />, name: "Edit" },
  { icon: <BookmarkAddedIcon />, name: "Add" },
];


const MailDetails = () => {
  return (
    <div className="mailDetails-form-container">
      <div className="mailDetails-form Scroll-Style-hide">
        <form action="">
          <div className="detail-container-main-mailDetails">
            <div className="container-left-mailDetails">
              <div className="mailDetails-header">
                <div className="input-field" style={{ justifyContent: "center" }}>
                  <div className="input" style={{ width: "180px" }}>
                    <Button variant="outlined">Excel Format</Button>
                  </div>
                  <div className="input" style={{ width: "100px" }}>
                    <Button variant="contained">Upload</Button>
                  </div>
                </div>
                <div className="input-field ">
                  <div className="input" style={{ width: "400px" }}>
                    <div className="icone">
                      <SmsIcon color="action" />
                    </div>
                    <TextField
                      multiline
                      rows={4}
                      name="MailMessage"
                      label="Mail Message"
                      id="MailMessage"
                      sx={{ m: 1, width: "200ch" }}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input" >
                    <Button variant="contained" endIcon={<SendIcon />}>
                      Send
                    </Button>
                  </div>
                  <div className="input" style={{ width: "20px" }}>
                    <Button variant="outlined">Clear</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-right-mailDetails">
              <div className="textbox">
                <div className="textboxlist">
                  <div className="textboxlist-customer ">
                    <div className="input-field">
                      <div className="input" style={{ width: "300px" }}>
                        <div className="icone">
                          <AiOutlineFileSearch style={{ fontSize: '23px' }} />
                        </div>
                        <TextField
                          size="small"
                          id="templatename"
                          label="Template Name"
                          name="templatename"
                          sx={{ m: 1, width: "200ch" }}
                        />
                      </div>
                      <div className="input" style={{ width: "100px" }}>
                        <Button variant="contained">Search</Button>
                      </div>
                    </div>
                    <div className="mailDetails-list-update">
                      <Table stickyHeader hoverRow borderAxis="y">
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>Sno</th>
                            <th style={{ width: "20%" }}>TemplateName</th>
                            <th style={{ width: "20%" }}>UsedFor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row) => (
                            <tr key={row.name}>
                              <td>{row.Sno}</td>
                              <td>{row.TemplateName}</td>
                              <td>{row.UsedFor}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-container-main-mailDetails">
            <div className="container-left-mailDetails">
              <div className="mailDetails-header">
                <div className="input-field" style={{ justifyContent: "center" }}>
                  <div className="input" style={{ width: "350px" }}>
                    <div className="icone">
                      <AttachEmailIcon color="action" />
                    </div>
                    <TextField
                      size="small"
                      id="templatename"
                      label="Template Name"
                      name="templatename"
                      sx={{ width: "200ch" }}
                    />
                  </div>
                  <div className="input">
                    <div className="icone">
                      <BookIcon />
                    </div>
                    <TextField
                      size="small"
                      id="usedfor"
                      label="Used For"
                      name="usedfor"
                    />
                  </div>
                </div>
                <div className="input-field ">
                  <div className="input" style={{ width: "630px" }}>
                    <div className="icone">
                      <SmsIcon color="action" />
                    </div>
                    <TextField
                      multiline
                      rows={4}
                      name="CreateMailTemplate"
                      label="Create Mail Template"
                      id="CreateMailTemplate"
                      sx={{ m: 1, width: "200ch" }}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <div className="input" style={{ width: "230px" }}>
                    <Button variant="contained">Update List</Button>
                  </div>
                  <div className="input" style={{ width: "20px" }}>
                    <Button variant="outlined">Clear</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Box sx={{ position: "relative", mt: 3, height: 320 }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              icon={<SpeedDialIcon />}
              direction="left"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </StyledSpeedDial>
          </Box>
        </form>
      </div>
    </div>
  )
}

export default MailDetails