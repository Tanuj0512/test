import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, getDocs,doc, documentId, where  } from "firebase/firestore";
import Header from "../header/header";
import ShareBtn from "../share/share";
import Calendar from "../Calendar/Calendar";
import "./Orghome.css";
import {useDispatch, useSelector} from "react-redux";
import { idValue,viewEventId } from "../auth/Signup/Slice";
import { useNavigate } from "react-router-dom";



function Orghome() {
  const [events, setEvents] = useState([]);
  const idValue= useSelector((state)=> state.id.value);
  const eventId = useSelector((state)=> state.id.eventIdValue);
  const [buffer,setBuffer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionId = sessionStorage.getItem("idValue");
  const [customList,setCustomList]= useState([]);


const fetchEventData = async () => {
  try {
    const collectionRef = collection(db, "user",sessionId, "OrgEvents");
    const querySnapshot = await getDocs(collectionRef);
    const idList = [];
    if (!querySnapshot.empty) {
      
      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        idList.push(eventData.Id)
      });
    console.log(idList);
    setBuffer(true);
    fetchCustomData(idList);
    setCustomList(idList);
  }
    else{
      sessionStorage.setItem("viewEventId","None");
    }

  } catch (error) {
    console.error("Error retrieving event data:", error);
  }
};
const fetchCustomData = async (customList) => {
    const eventsCollectionRef = collection(db, "event");
    const eventQuerySnapshot = await getDocs(eventsCollectionRef);
    if (eventQuerySnapshot.length !==0) {
      const eventList = [];
      eventQuerySnapshot.forEach((doc) => {
        const eventData = doc.data();
        const imageUrl = eventData.Event_IMAGE;
        const eventname = eventData.Event_name;
        const eventaddress = eventData.Event_address;
        const eventStartTimestamp = eventData.Event_start;
        const eventStartDate = eventStartTimestamp?.toDate();
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
      console.log("EEEEEEEEE",eventList,customList)
      let customEventList = [];
       eventList.forEach((custom,i1)=>{
        customList.forEach((item,i2)=>{
           if(custom.eventId === item)
           {
            customEventList.push(custom)
           }
        })
      })
      console.log("Final Array",customEventList);
      setEvents(customEventList);

  } 
}


  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  useEffect(() => {
    fetchEventData();
  }, []);



  let isEvent = true;
  let message = isEvent ? 'Welcome back!' : 'Please log in.';
   console.log(message);


  return (
    <div
      className="Event_dis"
      style={{  display: "flex", flexDirection: "column",marginLeft:"3vw", height:"fit-content",paddingBottom:"10vh"  }}
    >
      <div className="header">
        <Header />
      </div>
      <div className="headd"><h1>Events</h1></div>

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
                        navigate("/Calendar")
                      }} 
              >Calendar</button>
            </div>
          </div> 


          <button class="continue-application" onClick={()=>{
                        navigate("/crtevnets")
                      }} >
              <div>
                  <div class="pencil"></div>
                  <div class="folder">
                      <div class="top">
                          <svg viewBox="0 0 24 27">
                              <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                          </svg>
                      </div>
                      <div class="paper"></div>
                  </div>
              </div>
              Create Event
          </button>
      
      </div>
      <div className="no-events-to-show-img" style={{paddingBottom:"5vh"}}>
               
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


        {/* Event Description */}

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
                      className="event_item" key={index}>
                    
                    
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


                          
                      </div>
                    </button>
                    <button id="container" style={{border:"none"}}>
            
                      <div id="menu-wrap">
                        <input type="checkbox" class="toggler" />
                        <div class="dots">
                          <div></div>
                        </div>
                        <div class="menu">
                          <div>
                            <ul>
                              <li><b><a href="#" class="link" style={{fontSize:"medium",cursor:"pointer" }}>Edit</a></b></li>
                              <li><b><a href="#" class="link" style={{fontSize:"medium",cursor:"pointer" }}>Delete</a></b></li>
                              <li><b><a href="#" class="link" style={{fontSize:"medium", cursor:"pointer"}}>Share</a></b></li>
                              <li><b><a href="#" class="link" style={{fontSize:"medium",cursor:"pointer" }}>Download</a></b></li>
                              
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
          {/* no event */}
          <img src= "cal.png " style={{
                      width: "11vw",
                      height: "20vh",
                      margin: "8vh",
                      marginBottom:"0vh"
                  }}></img>
      <div className="no-events-to-show-text" >
        <h3 style={{color:"gray"}}>You haven't created any events yet !</h3>
      </div>
</div>
)}
          
</div>
      

       {/*  <div
        className="body_view_event"
        style={{ display: "flex", flexDirection: "row" ,height:"85vh"}}
      >
      
        
       <div
          className="event_list" id="style-2">
          
        
        
          {buffer ? (
          <div> 
          <div className="addbtn">
          <button class="cssbuttons-io-button" onClick={()=>{
            navigate("/Orgevents");
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
            <span>Add</span>
          </button>
          </div>

          
          </div>
          ):(
            
            <div className="btncontainer">
              <p style={{fontSize:"18px",fontWeight:"bolder"}}>You Haven't Created Any Events yet.</p>
              
            </div>
          )
          }
          
        </div> 
        
      </div>*/}
        {/* <div className="sharebtn"><ShareBtn />
      </div> */}
    </div> 
  );
}
export default Orghome;

