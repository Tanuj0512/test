
import {db} from "../../config/firebase";
import {doc, setDoc,collection, query, getDocs } from "firebase/firestore";

let eventId="";
const sessionId = sessionStorage.getItem("idValue");
export const addEventToDatabase = async (data,url) => {
  console.log(data);
  console.log("entered function");
    try {
      console.log(sessionId);
      console.log(data.eventTitle);
      eventId=sessionStorage.getItem("eventId");
      console.log("in util ",data.imageUrls);
      //console.log(sessionStorage.getItem("eventId"))
      //eventId=(sessionId +"-"+ sessionStorage.getItem("eventId"));
      console.log(eventId);
      //sessionStorage.setItem("eventId",eventId);
      //dispatch(eventIdValue);
      const EventStart = new Date(data.startDate);
      const EventEnd = new Date(data.endDate);
      const usertype=sessionStorage.getItem("type");
      console.log(usertype)
      await setDoc(doc(db, "user",sessionId,"OrgEvents", eventId),{Id: eventId})
      console.log("Set to org");    
      await setDoc(doc(db, "event", eventId), {
        Event_name: data.eventTitle,
        Event_id: eventId,
        Event_category: data.eventCategory,
        Event_organizor: data.plannerFirstName + " " + data.plannerLastName,
        Event_venue: data.venue,
        Event_start: EventStart,
        Event_end: EventEnd,
        Event_notification: data.notification,
        Event_IMAGE: url,
        Event_About: data.eventAbout,
        Event_mobile: data.mobile,
        Event_email: data.email,
      });
    } catch (err) {
      console.error(err);
    }
    //sessionStorage.setItem("eventId","");
  };

//  export const fetchEventData = async () => {
//     try {
//       const eventsCollectionRef = collection(db, "event");
//       const eventQuerySnapshot = await getDocs(eventsCollectionRef);
      
//       if (!eventQuerySnapshot.empty) {
//         const eventList = [];
//         eventQuerySnapshot.forEach((doc) => {
//           const eventData = doc.data();
//           const imageUrl = eventData.Event_IMAGE;
//           const eventname = eventData.Event_name;
//           const eventaddress = eventData.Event_address;
//           const eventStartTimestamp = eventData.Event_start;
//           const eventStartDate = eventStartTimestamp.toDate();
//           const eventId = eventData.Event_id;
//           const eventAbout= eventData.Event_About;
//           // console.log("Empty !");
//           // console.log(sessionStorage.getItem("viewEventId"));
//           eventList.push({
//             imageUrl,
//             eventname,
//             eventaddress,
//             eventStartDate,
//             eventId,
//           });
//         });

//         setEvents(eventList);
//       }
//       else{
//         sessionStorage.setItem("viewEventId","None");
//       }
//     } catch (error) {
//       console.error("Error retrieving event data:", error);
//     }
//   };