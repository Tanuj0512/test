import "./View_sch.css";
import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  query,
  where,
  documentId,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import Header from "../header/header";
import { Height, SpaRounded } from "@mui/icons-material";
import Calendar from "../Calendar/Calendar";
import { borderRadius } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import ScheduleInfo from '../specific_sch/specific_sch';


function View_sch() {
  const [show, setShow] = useState(true);
  const [schedules, setSchedule] = useState([]);

  const [file, setFile] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [scheduletitle, setscheduletitle] = useState("");
  const [Venue, setVenue] = useState("");
  const [description, setdescription] = useState("");
  const navigate = useNavigate();
  const eventRef = doc(db, "event", "8OkkhqzX1clf3U0FoZJ5");
  const scheduleRef = collection(eventRef, "schedule");
  const viewEventId = sessionStorage.getItem("viewEventId");

  useEffect(() => {
    fetchScheduleData();
  }, [imageUrls]);

  const fetchScheduleData = async () => {
    const scheduleCollectionRef = collection(
      db,
      "event",
      viewEventId,
      "schedule"
    );
    const scheduleQuerySnapshot = await getDocs(scheduleCollectionRef);
    const scheduleList = [];
    if (!scheduleQuerySnapshot.empty) {
      scheduleQuerySnapshot.forEach((doc) => {
        const scheduleData = doc.data();
        const scheduleTitle = scheduleData.schedule_title;
        const scheduleStartDate = scheduleData.schedule_startDate;
        const scheduleEndDate = scheduleData.schedule_endDate;
        const scheduleVenue = scheduleData.schedule_Venue;
        const scheduleDescription = scheduleData.schedule_description;

        scheduleList.push({
          scheduleTitle,
          scheduleStartDate,
          scheduleEndDate,
          scheduleVenue,
          scheduleDescription,
        });
      });
      setSchedule(scheduleList);
    }
  };

  const addscheduleToDatabase = async () => {
    try {
      await addDoc(scheduleRef, {
        Organizor_image: imageUrls[0],
        schedule_title: scheduletitle,
        schedule_venue: Venue,
        schedule_description: description,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = () => {
    if (file == null) return;
    const imageRef = ref(storage, `schedule/${file.name}.${v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([url]);
      });
    });
  };

  const onSubmit = () => {
    handleUpload();
  };

  return (
    <div className="scheduleright">
      {schedules.map((schedule, index) => (
        <Tabs defaultTab="vertical-tab-one" vertical>
          <TabList>
            <Tab tabFor="vertical-tab-one">Schedule 1</Tab>
          </TabList>
          <TabPanel tabId="vertical-tab-one">
            <div><ScheduleInfo/></div>
          </TabPanel>
        </Tabs>
        // <div className="con">

        //   <div className="VS-But">
        //     <button
        //       className="VS-view"
        //       onClick={() => {
        //         console.log(schedule);
        //         sessionStorage.setItem(
        //           "currScheduleId",
        //           schedule.scheduleTitle
        //         );
        //         navigate("/specificsch");
        //       }}
        //     >
        //       View
        //     </button>
        //   </div>
        // </div>
      ))}
    </div>
  );
}

export default View_sch;
