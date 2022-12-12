import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/Logo2.png";
import { BsCoin, BsFillChatLeftTextFill } from "react-icons/bs";
import { FaHome, FaRegSun, FaUserAlt } from "react-icons/fa";
import { BiCategoryAlt, BiLogOut } from "react-icons/bi";
import { currentContext } from "../../context/CurrentUser";
import "./Navbar.scss";
import { FirebaseContext } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoMdNotificationsOutline } from "react-icons/io";
import Notification from "../notification/Notification";

const Header = () => {
  const { userData, currentUser, userLoading } = useContext(currentContext);
  const { auth, users } = useContext(FirebaseContext);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [opened, Setopened] = useState(false);
  useEffect(() => {
    if (userData) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [userData]);
  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };
  const [mobNav, setMobNav] = useState(false);
  const handleMobileNav = () => {
    setMobNav((prev) => !prev);
  };
  useEffect(() => {
    if (currentUser?.length !== 0 && userData) {
      const recived = users?.filter((user) => {
        return currentUser[0].receivedRequests.includes(user.uid);
      });
      setRequestedUsers(recived);
      Setopened(false);
    }
  }, [currentUser]);

  return (
    <section className="nav bg-tranparent">
      <div className="container">
        <header className="d-flex align-items-center justify-content-between w-100 h-100">
          <div className="brand">
            <Link to={`${logged ? "/home" : "/"}`}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <nav>
            <div className="nav-mobile ">
              <div
                id="nav-toggle"
                onClick={handleMobileNav}
                className={mobNav ? "active" : undefined}
              >
                <span></span>
              </div>
            </div>
            {logged && !userLoading ? (
              <ul
                className={`nav-list list-unstyled  d-flex  d-flex gap-4 align-items-center justify-content-center ${
                  mobNav && "show"
                }`}
              >
                <li className="link">
                  <NavLink to="/home">
                    <FaHome className="me-2" />
                    Home
                  </NavLink>
                </li>
                <li className="link">
                  <NavLink to="/categories">
                    <BiCategoryAlt className="me-2" />
                    Categories
                  </NavLink>
                </li>
                <li className="link">
                  <NavLink to="/messages">
                    <BsFillChatLeftTextFill className="me-2" />
                    Messages
                  </NavLink>
                </li>

                <li className="notification position-relative">
                  <span className="fs-6  position-absolute bill-wrapper">
                    {requestedUsers && currentUser && requestedUsers.length ? (
                      <div className="bill"></div>
                    ) : (
                      ""
                    )}
                  </span>
                  <Dropdown>
                    <Dropdown.Toggle variant="tranparent" id="notification">
                      <IoMdNotificationsOutline className="position-relative fs-5" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      align="end"
                      className="dropdown-notification"
                    >
                      {requestedUsers.length > 0 ? (
                        <>
                          {requestedUsers?.map((user) => {
                            return (
                              <Dropdown.Item
                                className="noti-item"
                                key={user.uid}
                              >
                                <Notification
                                  name={user.name}
                                  photoURL={user.photoUrl}
                                  uid={user.uid}
                                />
                              </Dropdown.Item>
                            );
                          })}
                        </>
                      ) : (
                        <h6 className="text-center">No Notifications</h6>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="transparent"
                      id="dropdown-basic"
                      className="border-0"
                    >
                      <img
                        className="rounded-circle"
                        src={currentUser[0]?.photoUrl}
                        alt="user"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="bg-body">
                      <Dropdown.Item className="d-flex align-items-center justify-content-around">
                        <Link role="link" to="/profile">
                          <span>Profile</span>
                        </Link>
                        <FaUserAlt />
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        className="d-flex align-items-center justify-content-around"
                      >
                        <span>Settings</span>
                        <FaRegSun />
                      </Dropdown.Item>

                      {/* <Dropdown.Item
                        href="#/action-3"
                        className="d-flex align-items-center justify-content-around"
                      >
                        <span>{currentUser[0]?.points}</span>
                        <BsCoin />
                      </Dropdown.Item> */}

                      <Dropdown.Item
                        onClick={handleSignOut}
                        className="d-flex align-items-center justify-content-around"
                      >
                        <span>Logout</span>
                        <BiLogOut />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            ) : (
              <ul className="nav-list list-unstyled  d-flex gap-4  align-items-center justify-content-center">
                <li className="link">
                  <NavLink to="/about">Why Challe.go</NavLink>
                </li>
                <li>
                  <Button variant="outline-primary">Get Started</Button>
                </li>
              </ul>
            )}
          </nav>
        </header>
      </div>
    </section>
  );
};

export default Header;
