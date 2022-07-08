import React, { useCallback, useEffect, useRef, useState } from "react";
import contactsService from "../services/contcts";
import AddIcon from "@mui/icons-material/Add";
import ChangeCircleSharpIcon from "@mui/icons-material/ChangeCircleSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import FileBase from "react-file-base64";
import "./Form.css";

const Form = ({
  edit,
  setEdit,
  persons,
  setPersons,
  selectedPerson,
  showModal,
  setShowModal,
}) => {
  const defaultImg = require("../images/0.png");
  const [itemData, setItemData] = useState({
    name: "",
    number: "",
    email: "",
    img: defaultImg,
  });

  //closing the modal with Esc key
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setEdit(false);
      }
    },
    [setEdit, setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // in case of edit passing person's obj data to states
  useEffect(() => {
    if (edit) {
      setItemData({
        ...selectedPerson,
        name: selectedPerson.name,
        number: selectedPerson.number,
        email: selectedPerson.email,
        img: selectedPerson.image,
      });
    }
  }, [selectedPerson, edit]);

  //canceling edit and modal
  const falseEditModal = () => {
    setShowModal(false);
    setEdit(false);
  };
  // closing modal by clicking on the screen
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      falseEditModal();
    }
  };

  //updating current contact
  const editPerson = (e) => {
    e.preventDefault();
    const personData = persons.find(
      (person) => person.name === selectedPerson.name
    );
    const editedPerson = {
      ...personData,
      name: itemData.name,
      number: itemData.number,
      email: itemData.email,
      image: itemData.img,
    };
    const id = editedPerson.id;
    contactsService
      .update(id, editedPerson)
      .then((response) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : response))
        );
        falseEditModal();
      })
      .catch((error) => {});
  };
  //adding a new contact
  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: itemData.name,
      number: itemData.number,
      email: itemData.email,
      image: itemData.img,
    };
    contactsService
      .create(personObject)
      .then((returnedList) => {
        setPersons(persons.concat(returnedList));
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="modal" ref={modalRef} onClick={closeModal}>
      <form onSubmit={(e) => (edit ? editPerson(e) : addPerson(e))}>
        <p>{edit ? "Edit Contact" : "Add Contact"}</p>
        <div className="profile-img">
          <div className="img-container">
            <img src={itemData.img} alt="" />
          </div>
          <div className="filebase">
            <button className="addImg-btn" type="button">
              {itemData.img === defaultImg ? (
                <AddIcon style={{ paddingRight: 20 }} />
              ) : (
                <ChangeCircleSharpIcon style={{ paddingRight: 10 }} />
              )}
              {itemData.img === defaultImg ? "Add Photo" : "Change Photo"}
            </button>
            <FileBase
              accept="image/*"
              type="file"
              multiple={false}
              onDone={({ base64 }) => setItemData({ ...itemData, img: base64 })}
            />
          </div>
          {itemData.img !== defaultImg ? (
            <button
              className="delete-btn"
              type="button"
              onClick={() => setItemData({ ...itemData, img: defaultImg })}
            >
              <DeleteOutlineSharpIcon />
            </button>
          ) : null}
        </div>
        <div className="items">
          <div className="item">
            <label>Name</label>
            <input
              value={itemData.name}
              onChange={(e) =>
                setItemData({ ...itemData, name: e.target.value })
              }
              type="text"
              minLength="3"
              placeholder="Jamie Wright"
            />
          </div>
          <div className="item">
            <label>Number</label>
            <input
              value={itemData.number}
              onChange={(e) =>
                setItemData({ ...itemData, number: e.target.value })
              }
              type="text"
              minLength="8"
              placeholder="+012345678"
            />
          </div>
          <div className="item">
            <label>Email address</label>
            <input
              value={itemData.email}
              onChange={(e) =>
                setItemData({ ...itemData, email: e.target.value })
              }
              type="email"
              placeholder="jamie.wright@mail.com"
              required
            />
          </div>
        </div>
        <div className="buttons-container">
          <button type="button" onClick={falseEditModal}>
            Cancel
          </button>
          <button type="submit">Done</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
