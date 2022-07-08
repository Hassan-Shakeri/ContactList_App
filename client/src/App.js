import React, { useState, useEffect } from "react";
import Contacts from "./components/Contacts";
import NewContact from "./components/NewContact";
import contactsService from "./services/contcts";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Menu, MenuItem } from "@mui/material";
import "./App.css";

const App = () => {
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // rendering data from server
  useEffect(() => {
    contactsService
      .getAll()
      .then((initialList) => {
        setPersons(initialList);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  //passing the person obj to the state and opening the modal
  const selectedPersonObj = (person) => {
    setEdit((prev) => !prev);
    setShowModal((prev) => !prev);
    setSelectedPerson(person);
  };
  //setting the anchor to null
  const handleClose = () => {
    setAnchorEl(null);
  };
  //dark mode handler
  const dmHandler = (e) => {
    setDarkMode((prev) => !prev);
    setAnchorEl(null);
  };

  return (
    <div className={darkMode ? "App dark" : "App light"}>
      <NewContact
        edit={edit}
        setEdit={setEdit}
        showModal={showModal}
        setShowModal={setShowModal}
        persons={persons}
        setPersons={setPersons}
        selectedPerson={selectedPerson}
      />
      <div className="left">
        <div className="sm cell"></div>
        <div className="sm cell arrow">
          <Button>
            <ArrowBackIcon />
          </Button>
        </div>
        <div className="lg cell"></div>
      </div>
      <div className="middle">
        <div className="sm cell"></div>
        <div className="nav cell">
          <div className="title">
            <h1>Contacts</h1>
          </div>
          <div className="icons">
            <Button
              id="resources-btn"
              aria-controls={open ? "resources-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <SettingsIcon />
            </Button>
            <Menu
              id="resources-settingMenu"
              MenuListProps={{ "aria-labelledby": "resources-btn" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <ArrowBackIcon
                  onClick={handleClose}
                />
              </MenuItem>
              <MenuItem onClick={(e) => dmHandler()} >
                <LightModeOutlinedIcon />
              </MenuItem>
            </Menu>
            <div className="profile">
              <img
                src="https://media-exp2.licdn.com/dms/image/C4D0BAQGCcl-zyPZ9vA/company-logo_200_200/0/1629699223190?e=1663804800&v=beta&t=z4XrRC3sxJyzlp7Lk82tp3auE1MkRHYV2DZ59LtY8jU"
                alt=""
              />
            </div>
            <button
              className="plus-btn"
              onClick={() => setShowModal((prev) => !prev)}
            >
              +
            </button>
            <button
              className="add-btn"
              onClick={() => setShowModal((prev) => !prev)}
            >
              <span>+</span>Add new
            </button>
          </div>
        </div>
        <div className="lg cell">
          <Contacts
            persons={persons}
            setPersons={setPersons}
            selectedPersonObj={selectedPersonObj}
          />
        </div>
      </div>
      <div className="right">
        <div className="sm cell"></div>
        <div className="sm cell sun">
          <Button onClick={() => setDarkMode((prev) => !prev)}>
            <LightModeOutlinedIcon />
          </Button>
        </div>
        <div className="lg cell"></div>
      </div>
    </div>
  );
};

export default App;
