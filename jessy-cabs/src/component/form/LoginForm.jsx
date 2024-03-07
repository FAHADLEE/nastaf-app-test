import React, { useState, useEffect } from "react";
import "./Form.css";
import axios from "axios";
import { useUser } from './UserContext';
import { useNavigate } from "react-router-dom";

// ICONS
import ClearIcon from '@mui/icons-material/Clear';
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { BiHide } from "@react-icons/all-files/bi/BiHide";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { RiFacebookCircleFill } from "@react-icons/all-files/ri/RiFacebookCircleFill";
import { APIURL } from "../url.js";


const Login = () => {
  const apiUrl = APIURL;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const [input, setInput] = useState({ username: "", userpassword: "" });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);
  const { loginUser } = useUser();
  const [successMessage, setSuccessMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [warningMessage] = useState({});
  const [infoMessage] = useState({});

  const hidePopup = () => {
    setSuccess(false);
    setError(false);
    setInfo(false);
    setWarning(false);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);
  useEffect(() => {
    if (info) {
      const timer = setTimeout(() => {
        hidePopup();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [info]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) navigate("/");
  });

  const formSubmitter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${apiUrl}/login`, input);
      if (response.status === 200) {
        loginUser(input.username);
        setSuccessMessage("Successfully Added");
        navigate("/home/dashboard");
        localStorage.setItem("auth", true);
      } else {
        setError(true);
        setErrorMessage("Check your Network Connection");
      }
    } catch {
      setError(true);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="portal-container">
      <div className="glasses">
        <div className="right-col">
          <form className="portal"  >
            <div className="title">login</div>
            {error &&
              <div className='alert-popup Error' >
                <div className="popup-icon"> <ClearIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{errorMessage}</p>
              </div>
            }
            {warning &&
              <div className='alert-popup Warning' >
                <div className="popup-icon"> <ErrorOutlineIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{warningMessage}</p>
              </div>
            }
            {success &&
              <div className='alert-popup Success' >
                <div className="popup-icon"> <FileDownloadDoneIcon style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{successMessage}</p>
              </div>
            }
            {info &&
              <div className='alert-popup Info' >
                <div className="popup-icon"> <BsInfo style={{ color: '#fff' }} /> </div>
                <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' style={{ fontSize: '14px' }} /> </span>
                <p>{infoMessage}</p>
              </div>
            }
            <div className="user-input">
              <input
                type="text"
                name="username"
                autoComplete="off"
                onChange={handleChange}
                required
              />
              <div className="under-line" required></div>

              <label>Username</label>
            </div>
            <div className="user-input">
              <input
                type={open === false ? "password" : "text"}
                name="userpassword"
                autoComplete="off"
                onChange={handleChange}
                required
              />
              <div className="under-line" required></div>
              <label>Password</label>
              <div className="pass-hide">
                {open === false ? (
                  <BiHide onClick={toggle} />
                ) : (
                  <AiOutlineEye onClick={toggle} />
                )}
              </div>
            </div>
            <div className="forget-link">
              <a href="/">forget password !</a>
            </div>
            <div className="group button-group">
              <button type="submit" className="signup-btn" onClick={formSubmitter}>
                Login
              </button>
            </div>
            <div className="social_media_container">
              <a href="/" className="social facebook">
                <i>
                  <RiFacebookCircleFill />
                </i>
              </a>
              <a href="/" className="social instagram">
                <i>
                  <AiOutlineInstagram />
                </i>
              </a>
              <a href="/" className="social linkedin">
                <i>
                  <FaLinkedin />
                </i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
