import React, { useState, useEffect, useRef } from "react";
import { db } from "../../config/firebase";
import { collection, query, getDocs,doc } from "firebase/firestore";
import Header from "../header/header";
import ShareBtn from "../share/share";
import Calendar from "../Calendar/Calendar";
import "./event_dis.css";
import {useDispatch, useSelector} from "react-redux";
import { idValue,viewEventId } from "../auth/Signup/Slice";
import { useNavigate } from "react-router-dom";
import { mapEvent } from "../utils/mapEvent";
import { Button } from "@mui/material";


function Event_dis() {

 



  const [events, setEvents] = useState([]);
  const idValue= useSelector((state)=> state.id.value);
  const eventId = useSelector((state)=> state.id.eventIdValue);
  const [buffer,setBuffer] = useState(true);
  const navigate= useNavigate();
  const dispatch= useDispatch();


  useEffect(() => {
      
  fetchEventData();
  
  }, []);
  
  
  const fetchEventData = async () => {
    try {
      const eventsCollectionRef = collection(db, "event");
      const eventQuerySnapshot = await getDocs(eventsCollectionRef);
      
      if (!eventQuerySnapshot.empty) {
        const eventList = [];
        eventQuerySnapshot.forEach((doc) => {
          const eventData = doc.data();
          const imageUrl = eventData.Event_IMAGE;
          const eventname = eventData.Event_name;
          const eventaddress = eventData.Event_address;
          const eventStartTimestamp = eventData.Event_start;
          const eventStartDate = eventStartTimestamp.toDate();
          const eventId = eventData.Event_id;
          const eventAbout= eventData.Event_About;
          // console.log("Empty !");
          // console.log(sessionStorage.getItem("viewEventId"));
          eventList.push({
            imageUrl,
            eventname,
            eventaddress,
            eventStartDate,
            eventId,
          });
        });

        setEvents(eventList);
      }
      else{
        sessionStorage.setItem("viewEventId","None");
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
    }
  };

//   if (usertype===true){
//   await setDoc(doc(db, "user",sessionId,"OrgEvents", eventId),{
//     ID: eventId,}
//   )
//   console.log("Set to org");    
// };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };


  



  return (
  
    <div
      className="Event_dis"
      style={{ display: "flex", flexDirection: "column",    backgroundColor:" white",
      width: "100%" ,height:"-webkit-fill-available ",paddingBottom:"10vh"}}
    >
      <div className="header">
        <Header />
      </div>
      <div className="headd"><h1>Events </h1></div>

      <div className="innerhead">
        <div class="group">
          <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input placeholder="Search" type="search" class="input-orgsrch" />
        </div>
        </div>
        <div className="threebt">
         <div className="twobt">

        
            <div className="buttn" id = "list" >
              <button  class="btn" onClick= {()=>{
                        navigate("")
                      }}
              >List </button>
            </div>
            
            <div className="buttn" id = "calendarr" >
              <button class="btn" onClick={()=>{
                        navigate("/Calendaratnd")
                      }} 
              >Calendar</button>
            </div>
          </div> 


          <button class="cssbuttons-io-button" onClick= {()=>{
                        navigate("/headerevent")
                      }}>
            All Events
            <div class="iconn">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
      
      </div>





 <div className="no-events-to-show-img" style={{marginRight:"-3vw",paddingBottom:"5vh"}} >
       
  {/* Event Grey Header  */}
      <div className="event-des-header">
        <div className="event-des-header-left">
          <h3 style={{color:" rgb(61, 61, 61)"}}>Event</h3>
        </div>

        <div className="event-des-header-right">
          <div><h3 id="cd"> Date</h3></div>
          <div><h3 id="cdd">Mode</h3></div>
          <div><h3 id="cddd">Slots</h3></div>
        </div>
      </div>


{/* Event description  */}

            {buffer ? (
              <div className="outerBut">
                   {events.map((event, index) => (
                
                <div className="testi" style={{ display:"flex", flexDirection:"row"}}> 
                <button
              
                    onClick={()=>{
                      console.log(events[index]);
                      console.log(event.eventId)
                      sessionStorage.setItem("viewEventId",event.eventId);
                      navigate("/viewevent");
                    }}
                      className="event_item" 
                      key={index}>
                    
                    
                      {event.imageUrl ? (
                        <img
                          src={event.imageUrl}
                          style={{
                            display: "unset",
                            margin: "auto 2vw",
                            width: "13vh",
                            height: "11vh",
                            border: "1px solid black",
                            borderRadius: "5px",
                            objectFit: "fit",
                          }}
                          alt="Event"
                        />
                      ) : (
                        <img className="eventimg"
                          src="https://firebasestorage.googleapis.com/v0/b/event-o-4e544.appspot.com/o/event%2Fdownload.png?alt=media&token=97505771-db30-410d-80af-a6ff564e1066"
                          style={{
                          
                          }}
                        />
                      )}
                      <div classname = "event-des-org"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "72vw",
                          height: "12vh",
                          margin:" 2vh 0vw -1vh 1vw",
                         
                          alignItems: "center",
                         
                      }}
                      >
                        <div className="evtName" style={{ width:"30vw"}}>
                        <p className="event-name-org"
                          style={{
                            color: "red",
                            fontSize: "20px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "start",
                            textTransform: "uppercase",
                          }}
                        >
                          {event.eventname}
                        </p>
                        </div>
                         <p 
                          style={{
                            fontSize: "23px",
                            fontWeight: "600",
                            marginTop: "-1vh",
                            textTransform: "capitalize",
                          }}
                        >
                          {event.eventaddress}
                        </p> 
                        {event.eventStartDate && (
                          <p className="event-date-org"
                            style={{
                              fontSize: "16px",
                              marginLeft: "5.5vw",
                              
                            }}
                          >
                            {formatDate(event.eventStartDate)}
                          </p>
                        )}

                          <p className="event-mode-org"
                            style={{
                              fontSize: "16px",
                              marginLeft: "8vw",
                              
                            }}
                          >online</p>

                          <p className="event-slot-org"
                            style={{
                              fontSize: "16px",
                              marginLeft: "11.5vw",
                              
                            }}
                          >500</p>



                {/* <div>
                  <button onClick={mapEvent}>
                    Map Event
                  </button>
                </div> */}
                          
            </div>


           
        </button>
        {/* <button onClick={ShareBtn}>Share</button> */}
        <button id="container" style={{border:"none"}}>
            
            <div id="menu-wrap">
              <input type="checkbox" class="toggler" />
              <div class="dots">
                <div></div>
              </div>
              <div class="menu">
                <div>
                  <ul>
                    <li><b><div onClick={() => {<ShareBtn/>}} class="link" style={{fontSize:"medium",cursor:"pointer" }}>Share</div></b></li>
                    <li><b><a href="#" class="link" style={{fontSize:"medium", cursor:"pointer"}}>Download</a></b></li>
                    <li><b><a href="#" class="link" style={{fontSize:"medium", cursor:"pointer",}}>Map Event</a></b></li>
                  </ul>
                </div>
              </div>
            </div>
          </button>   
           
        </div> 
        ))}
        

       
              
         </div>
 
):(
  <div className="noEvents">
    
      <img src= "noEvent.png" style={{
                      width: "8vw",
                      height: "16vh",
                      margin: "8vh",
                      marginBottom:"0vh"
                  }}></img>
      <div className="no-events-to-show-text" >
        <h3 style={{color:"gray"}}><h2 style={{color:"#0f0f0f", marginBottom:"1vh"}}>Oops!!</h2> You don't have any events yet,
        let's get some !</h3>
      </div>
  </div>
)}
      </div>

      
    </div>
  );
}

export default Event_dis;
