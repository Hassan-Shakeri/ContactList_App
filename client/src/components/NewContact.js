import React from "react";
import { useSpring, animated } from "react-spring";
import Form from "./Form";

const NewContact = ({
  edit,
  setEdit,
  selectedPerson,
  persons,
  setPersons,
  showModal,
  setShowModal,
}) => {
  //setting the modal animation
  const animation = useSpring({
    
    config: {
      duration: 200,
    },
    zIndex: 20,
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  return (
    <>
      {showModal ? (
        <animated.div style={animation}>
          <Form
            edit={edit}
            setEdit={setEdit}
            showModal={showModal}
            setShowModal={setShowModal}
            persons={persons}
            setPersons={setPersons}
            selectedPerson={selectedPerson}
          />
        </animated.div>
      ) : null}
    </>
  );
};

export default NewContact;
