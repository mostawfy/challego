import React from "react";
import ChallengerShortcut from "../ChallengerShortcut/ChallengerShortcut";
import { Link } from "react-router-dom";
import { FirebaseContext } from "./../../context/FirebaseContext";
import { currentContext } from "../../context/CurrentUser";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion";

const RecommendedChallengers = () => {
  const { users } = useContext(FirebaseContext);
  const { currentUser } = useContext(currentContext);
  let currentUserInterests = [];
  let currentUserFriends = [];
  let strangeUsers = [];
  let mayKnowUsersIDs = [];
  let mayKnowUsers = [];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (users && currentUser && currentUser.length > 0) {
    currentUser[0].interests.forEach((interest) => {
      currentUserInterests.push(interest.value);
    });

    currentUserFriends = currentUser[0].friends;
    strangeUsers = users.filter(
      (user) =>
        !currentUserFriends.includes(user.uid) &&
        user.uid !== currentUser[0].uid
    );
    strangeUsers.forEach((user) => {
      user.interests.forEach((interest) => {
        currentUserInterests.includes(interest.value) &&
          mayKnowUsersIDs.push(user.uid);
      });

      mayKnowUsersIDs = [...new Set(mayKnowUsersIDs)];
    });

    users.forEach((user) => {
      mayKnowUsersIDs.includes(user.uid) && mayKnowUsers.push(user);
    });
  }

  return (
    <motion.div
      className="  py-3 pb-2 mb-5   border-light card text-center bg-light"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-2 text-white ">
        <h5 className="text-center mb-3 border-light border-bottom pb-2 mx-2">
          Recommended Challengers
        </h5>
        {mayKnowUsers.slice(0, 4).map((usr, index) => {
          if (usr.uid !== currentUser[0].uid)
            return (
              <Link
                className=" text-decoration-none text-white"
                to={`/${usr.username}`}
              >
                <ChallengerShortcut
                  name={usr.name}
                  photoURL={usr.photoUrl}
                  key={index}
                  username={usr.username}
                />
              </Link>
            );
        })}
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={handleShow}
          className=" text-decoration-none bg-primary text-light text-center mx-5 py-2 mt-2  card d-block 
           bg-c-grey-lite-hover"
        >
          Explore all challengers
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          className="bg-body border-primary border-bottom"
        >
          <Modal.Title>Recommended Challengers</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-body border-primary border-bottom">
          {mayKnowUsers.map((user, index) => {
            return (
              <Link
                className=" text-decoration-none text-white"
                to={`/${user.username}`}
              >
                <ChallengerShortcut
                  name={user.name}
                  photoURL={user.photoUrl}
                  key={index}
                />
              </Link>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="bg-body">
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default RecommendedChallengers;
