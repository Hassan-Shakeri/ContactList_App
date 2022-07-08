import React, { useState } from "react";
import "./Contacts.css";
import contactsService from "../services/contcts";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import { Button, Menu, MenuItem } from "@mui/material";

const Contacts = ({ persons, selectedPersonObj, setPersons }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [personData, setPersonData]= useState('')
  const open = Boolean(anchorEl);

  //deleting the contact
  const handleDelete = () => {
    if (window.confirm(`are you sure you want to delete '${personData.name}'`))
      contactsService
        .remove(personData.id)
        .then((res) => {
          setPersons(persons.filter((p) => p.id !== personData.id));
          setAnchorEl(null);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  };

  //setting the anchor to null
  const handleClose = () => {
    setAnchorEl(null)
  }

  //getting the person obj
  const handleMenu = (e,person) => {
    setAnchorEl(e.currentTarget)
    setPersonData(person)
  }

  //lifting up the data
  const handlePersonObj = () => {
    selectedPersonObj(personData);
    setAnchorEl(null);
  };

  return (
    <>
      {persons.map((person) => (
        <div key={person.id} person={person} className="contact">
          <div className="profile-pic">
            <img src={person.image} alt="" />
          </div>
          <div className="details">
            <h3>{person.name}</h3>
            <p>{person.number}</p>
          </div>
          <div className="mini-options">
          <Button
             id="resources-btn"
              aria-controls={ open ? 'resources-miniMenu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => handleMenu(e, person)}
            >
              <MoreHorizIcon />
            </Button>
            <Menu 
            id= "resources-miniMenu"
            MenuListProps={{"aria-labelledby": "resources-btn"}}
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
              <MenuItem onClick={handleClose}>
                <NotificationsOffOutlinedIcon />
              </MenuItem >
              <MenuItem onClick={handleClose}>
                <HeadphonesOutlinedIcon />
              </MenuItem>
              <MenuItem onClick={handlePersonObj}>
                <SettingsIcon />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <FavoriteBorderRoundedIcon />
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteOutlineSharpIcon />
              </MenuItem>
            </Menu>
          </div>
          <div className="options">
            <Button>
              <NotificationsOffOutlinedIcon />
            </Button>
            <Button>
              <HeadphonesOutlinedIcon />
            </Button>
            <Button
             id="resources-btn"
              aria-controls={ open ? 'resources-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(e) => handleMenu(e, person)}
            >
              <MoreHorizIcon />
            </Button>
            <Menu 
            id= "resources-menu"
            MenuListProps={{"aria-labelledby": "resources-btn"}}
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
              <MenuItem onClick={handlePersonObj}>
                <SettingsIcon id='mui-icon'/>
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <FavoriteBorderRoundedIcon id='mui-icon'/>
                Favorite
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteOutlineSharpIcon id='mui-icon'/>
                Remove
              </MenuItem>
            </Menu>
          </div>
        </div>
      ))}
    </>
  );
};

export default Contacts;
