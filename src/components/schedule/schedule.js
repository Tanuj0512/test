
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

import { useSelector, useDispatch } from "react-redux";
import { addEventToDatabase } from "../utils/fireStoreUtils";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Schedule() {
  let scheduleId = "";
  const [scheduletitle, setscheduletitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Venue, setVenue] = useState("");
  const [notification, setNotification] = useState(false);
  const [description, setDescription] = useState("");
  const eventId = sessionStorage.getItem("eventId");
  const navigate = useNavigate();

  useEffect(() => {
    addscheduleToDatabase();
  }, []);

  const addscheduleToDatabase = async () => {
    try {
      scheduleId = sessionStorage.getItem("scheduleId");
      console.log(scheduleId);
      await setDoc(doc(db, "event", eventId, "schedule", "Schedule"), {
        schedule_title: scheduleId,
        schedule_startDate: startDate,
        schedule_endDate: endDate,
        schedule_Venue: Venue,
        schedule_notification: notification,
        schedule_description: description,
      });

      setscheduletitle("");
      setStartDate("");
      setEndDate("");
      setVenue("");
      setNotification(false);
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSchedules = () => {
    addEventToDatabase();
    addscheduleToDatabase();
    toast.success("Schedule Saved Successfully!");
  };
  return (
    <div className="schedule-whole">
      <div className="CS-outerbox">
        <div className="schBody-right">
          <div className="CS-tophead">
            <div className="details-img">
              <img
                src="schedule.png"
                style={{ opacity: "60%", height: "6vh" }}
              />
            </div>
            <div className="sp" style={{ paddingBottom: "5vh" }}>
              <div className="CE-heading">Schdeules</div>
              <div className="CE-subHeading">Add schedules to your event.</div>
            </div>
          </div>
          <div style={{ marginLeft: "-3vw" }}>
            <div className="CE-event_title">
              <label class="CE-label" placeholder="Schedule Name">
                Schedule Name
              </label>

              <input
                placeholder="Name"
                type="text"
                class="CE-input-title"
                value={scheduletitle}
                onChange={(e) => {
                  setscheduletitle(e.target.value);
                  sessionStorage.setItem("scheduleId", e.target.value);
                }}
              />
            </div>

            <div className="CS-Schedule">
              <div className="CE-session">
                <label class="CE-label">Schedule Begin</label>

                <div className="CE-box">
                  <input
                    class="CE-input_sch"
                    placeholder=" Event Start"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <input
                    class="CE-input_sch"
                    placeholder=" Event Start"
                    type="time"
                  />
                </div>
              </div>

              <div className="CE-session">
                <label class="CE-label">Schedule End</label>
                <div className="CE-box">
                  <input
                    class="CE-input_sch"
                    placeholder=" Event End"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <input
                    class="CE-input_sch"
                    placeholder=" Event Start"
                    type="time"
                  />
                </div>
              </div>
            </div>

            <div className="CE-event_title">
              <label class="CE-label" placeholder="Schedule Name">
                Location
              </label>

              <input
                placeholder="Location"
                type="text"
                class="CE-input-title"
                value={Venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            <div className="CE-event_desc">
              <label htmlFor="Event Description" class="CE-label">
                Event Description
              </label>

              <textarea
                class="CE-textarea-desc"
                placeholder=" Event Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button className="CS-addMore" onClick={handleSchedules}>
              Add More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
