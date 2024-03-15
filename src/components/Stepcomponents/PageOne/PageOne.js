import React from "react";
import "./PageOne.css";
import Orghome from "../../event/event"
import Header  from "../../header/header";

const PageOne = ({ onButtonClick}) => {

  return (
    <div className="PG-one-whole" >
    <div>
        <Orghome />
    </div>
        <div>
           {/* <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{
              borderStyle: "none",
              width: "20%",
              backgroundColor: "#664DE5",
            }}
            type="submit"
            value="Create Workspace"
            onClick={() => onButtonClick("pagetwo")}
          /> */}
          <footer>
          <div className="footer-butn">
        <div className="footer-twobt">

        
         <button className="evtBack" > Back </button> 
         <button 
         type="submit" id="submit"
         className="evtSave" value="Create Workspace"
         onClick={() => onButtonClick("pagetwo")} >
          Save & Continue 
        </button > 
      
          </div>
         
        </div>
        </footer>
        </div>
    </div>  
  );
};

export default PageOne;
