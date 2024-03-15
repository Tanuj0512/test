import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import { setDoc, collection, addDoc, deleteDoc, updateDoc, doc, Timestamp,} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, lisAll, list,} from "firebase/storage";
import { v4 } from "uuid";
import Header from "../header/header";
import "./details.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import banner from "../auth/Signup/overlay-background.jpg";
import { addEventToDatabase } from "../utils/fireStoreUtils";
//import { eventIdValue, usertype } from "../auth/Signup/Slice";
import { Link } from 'react-router-dom';
import { flushSync } from "react-dom";
import Aside from "../aside/aside"

function Details() {
  let eventId = "";
  const defaultFile = banner;
  const [fileAddress, setFileAddress] = useState(defaultFile);

  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [plannerFirstName, setPlannerFirstName] = useState("");
  const [plannerLastName, setPlannerLastName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [notification, setNotification] = useState(false);
  const [file, setFile] = useState();
  const [mobile,setMobile] = useState("");
  const [email,setEmail] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  //const idValue = useSelector((state) => state.id.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewEventId =sessionStorage.getItem("viewEventId");
  const handleAddSchedule = () => {
    // Logic to add schedule

    //if (file == null) return null;
    const imageRef = ref(storage, `testingphoto/${viewEventId}`);
    
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("imageref", url);
        setImageUrls([url]);
      });
    });

    let eventData = {
      eventTitle,
      plannerFirstName,
      plannerLastName,
      eventCategory,
      venue,
      notification,
      imageUrls,
      eventAbout,
      startDate,
      endDate,
      mobile,
      email,
    };
    console.log("recheck",eventData.imageUrls);
    addEventToDatabase(eventData);
    navigate("/schedule");
  };
  const sessionId = sessionStorage.getItem("idValue");
  useEffect(() => {
    console.log(sessionId);
    if (imageUrls.length > 0) {
      // addEventToDatabase();
    }
    console.log();
  }, [imageUrls, eventId]);
  //console.log(usertype);

  //var createId=idValue + eventTitle;

  const handleUpload = () => {
    
    
    //if (file == null) return null;
    const imageRef = ref(storage, `event/${viewEventId}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls([url]);
      });
    });

    let eventData = {
      eventTitle,
      plannerFirstName,
      plannerLastName,
      eventCategory,
      venue,
      notification,
      imageUrls,
      eventAbout,
      startDate,
      endDate,
      mobile,
      email,
    };

    addEventToDatabase(eventData);
    console.log("Event Created!");
    navigate("/orghome");
  };

  const handleFileSelection = (event) => {
    setFile(event.target.files[0]);
    if (file) {
      console.log(file);
      console.log(URL.createObjectURL(file));
      const address = URL.createObjectURL(file);

      setFileAddress(address);
    }
  };

  return (
    <div>
     
<div className="details-whole">  

 {/* <div>
      <Aside/>
    </div> */}


<div className="D-right">
<div className="D-outerbox">
  <div className="D-tophead1" >
            <div className="details-img">
              <img src = "organiser.png"
              style={{opacity:"60%", height:"65px"}}/>
            </div>
            <div className="sp">
              <div className="CE-heading" >
              Details
              </div>
              <div className="CE-subHeading" >
              Let your attendees know about organiser.
            </div>
          </div>
          </div>
          
        
            <div className="D-name">
              <label class="D-label"> 
                Name</label>
              <input
                placeholder="Name"
                type=" text"
                class="D-input-name"
                value={plannerFirstName}
                onChange={(e) => setPlannerFirstName(e.target.value)}
              />
            </div>

            <div className="D-name">
              <label class="D-label"> 
                Address</label>
              <input
                placeholder="Name"
                type=" text"
                class="D-input-name"
               
              />
            </div>

          
       <div className="D-space">
            <div className="D-name">
              <label class="D-label"
              >Contact Number</label>
              <input
                placeholder=" Contact"
                type="tel"
                class="D-input-phone"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>


            <div className="D-name">
              <label class="D-label"
              >Email</label>
              <input
                class="D-input-phone"
                placeholder=" Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            </div>
         <div className="D-space">

          <div className="D-name">
          <label class="D-label"
              >Linkdein</label>
            <input 
            class="D-input-phone"
            placeholder="Linkdein" type="text"/>
          </div>
          
          <div className="D-name">
          <label class="D-label"
              >Twitter</label>
            <input class="D-input-phone"
            placeholder="Twitter" type="text"/>
          </div>
        </div>
        
        <div style={{paddingBottom:"5vh"}}></div>
                 
         
     </div>     
        
    </div>
    
  </div>
</div> 


  );
}

export default Details;