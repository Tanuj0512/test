import React, { useState, useEffect, useRef } from "react";
import "./ViewEvent.css";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  documentId,
} from "firebase/firestore";
import Header from "../header/header";
import { setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShareBtn from "../share/share.js";

import Modal from "../Modal/Modal.jsx";

import education from "../view_event/images/education.png";
import abstract from "./images/abstract.png";
import location from "./images/venue.png";
import date from "./images/schedule.png";
import sider from "./images/sider.png";
import background from "./images/bg.jpg";

const View_event = () => {
  const [openModal, setOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventaddress, setEventAddress] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [eventStart, setEventStart] = useState(null); // Initialize with null
  const [eventCategory, setEventCategory] = useState("");
  const [schedule, setSchedule] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventContact, setEventContact] = useState("");
  const [eventMobile, setEventMobile] = useState("");
  const [eventEmail, setEventEmail] = useState("");

  const viewEventId = sessionStorage.getItem("viewEventId");
  //console.log(viewEventId);
  const navigate = useNavigate();
  useEffect(() => {
    const sessionId = sessionStorage.getItem("idValue");

    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(db, "event");
      console.log(viewEventId);
      const eventQuery = query(
        eventsCollectionRef,
        where(documentId(), "==", viewEventId)
      );
      const querySnapshot = await getDocs(eventQuery);
      if (!querySnapshot.empty) {
        const eventData = querySnapshot.docs[0].data();
        const imageUrl = eventData.Event_IMAGE;
        const eventname = eventData.Event_name;
        const eventaddress = eventData.Event_venue;
        const eventStartTimestamp = eventData.Event_start;
        const eventAbout = eventData.Event_About;
        const eventOrganizer = eventData.Event_organizor;
        const eventContact = eventData.Event_Contact;
        const eventEmail = eventData.Event_email;
        const eventMobile = eventData.Event_mobile;

        // Convert Firebase Timestamp to JavaScript Date
        const eventStartDate = eventStartTimestamp.toDate();

        setImageUrl(imageUrl);
        setEventName(eventname);
        setEventAddress(eventaddress);
        setEventStart(eventStartDate);
        setEventAbout(eventAbout);
        setEventOrganizer(eventOrganizer);
        setEventContact(eventContact);
        setEventMobile(eventMobile);
        setEventEmail(eventEmail);
        console.log(eventOrganizer);
        console.log(imageUrl);
        sessionStorage.setItem("currEvent", eventname);
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
      console.log(viewEventId);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="container">
      <div className="navbar">
        <div>
          <Header />
        </div>
      </div>
      <div className="VE-imgOverlay">
        <img src={education} className="VE-generalImg" />

        <div className="outerBox">
          <div className="Title">
            <span className="tag ">{eventName}</span>
          </div>

          <div className="VE-upperBox">
            <div className="VE-internalLeft">
              <img className="blur-bg" src={abstract} />
              <div className="VE-Image">
                {imageUrl ? (
                  <img src={imageUrl} className="VE-Image" alt="Event" />
                ) : (
                  <img
                    className="VE-Image"
                    src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
                    alt="Placeholder"
                  />
                )}
              </div>
            </div>

            <div className="VE-contentLeft">
              <b className="desc-head">Description</b>
              <div className="VE1">
                <label className="VE-Heading1" for="Organiser">
                  Organiser
                </label>
                <span className="tag1 "> {eventOrganizer}</span>
              </div>
              <div className="VE-content">
                <div className="VE2">
                  <label className="VE-Heading1" for="EventCategory">
                    Type
                  </label>
                  <span className="tag1">{eventCategory}</span>
                </div>

                <div className="VE-Nop">
                  <label className="VE-Heading1" for="Nop">
                    No. of participants
                  </label>
                  <span className="tag1"></span>
                </div>
              </div>

              <div className="Description">
                <img
                  className="VE-Heading1"
                  src={location}
                  style={{
                    width: "6vh",
                    marginLeft: "-1vw",
                    paddingTop: "10px",
                  }}
                />
                <span className="tag1">{eventaddress}</span>
              </div>

              <div style={{ height: "3vh" }}></div>

              <div className="Description">
                <img
                  className="VE-Heading1"
                  src={date}
                  style={{ width: "4vh", paddingTop: "10px" }}
                />

                <div className="VE-dateInner">
                  <div className="VE1">
                    <span className="tag1">{formatDate(eventStart)}</span>
                    <span className="tag1">time</span>
                  </div>

                  {/* Event end  */}
                  <div className="VE1">
                    <span className="tag1">{formatDate(eventStart)}</span>
                    <span className="tag1">time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="VE-lowerbox">
            <div className="VE-internalRight">
              <b className="desc-head" style={{ marginLeft: "1vw" }}>
                About Event
              </b>
              <div className="VE-About">
                <span className="viewtag11">{eventAbout}</span>
              </div>

              <div className="VE-contact">
                <b className="desc-head">Contact Details</b>

                <div className="CD">
                  <div className="VE-flex">
                    <div className="VE1">
                      <label className="VE-Heading1" for="Phone">
                        Mobile
                      </label>

                      <span
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        className="tag1"
                      >
                        {eventMobile}{" "}
                      </span>
                    </div>

                    <div className="VE2">
                      <label className="VE-Heading1" for="email">
                        Email{" "}
                      </label>
                      <span className="tag1">{eventEmail}</span>
                    </div>
                  </div>

                  <div className="VE-flex">
                    <div className="VE2">
                      <label className="VE-Heading1" for="linkdein">
                        Linkdein{" "}
                      </label>
                      <span className="tag1">Linkdein</span>
                    </div>

                    <div className="VE2">
                      <label className="VE-Heading1" for="twitter">
                        Twitter{" "}
                      </label>
                      <span className="tag1">Twitter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="VE-contentRight">
              <img className="VE-contentRight" src={sider} />
            </div>
          </div>
          <div className="VE-scheduleBlock">
            <div className="VE-schedule">
              <b className="desc-head">Agenda</b>
              <p className="VE-subHeading">
                Get the chronologically ordered list of schedules planned for
                your event.
              </p>
            </div>
            <div className="VE-Show">
              <button onClick={() => setOpenModal(true)} className="VE-button">
                {openModal ? "Hide " : "Show "}
              </button>
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
            {/* {show && <div>Toggle Challenge</div>} */}
            <div className="sharebtn">
              <ShareBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_event;
