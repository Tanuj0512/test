import React from 'react';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const mapEvent = async () =>{
    
    const sessionId = sessionStorage.getItem("idValue");
    const eventId = sessionStorage.getItem("eventId");
    console.log("User",sessionId);
    console.log("Event",eventId);
    await setDoc(doc(db, "user",sessionId,"AttendEvents", eventId),{Id: eventId});
    
    console.log("Event Mapped");

}

