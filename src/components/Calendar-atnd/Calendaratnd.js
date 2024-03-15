import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./util/calendar-atnd";
import cn from "./util/cnatnd";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "./Calendar-atnd.css";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

import { db } from "../../config/firebase";
import { collection, query, getDocs,doc, documentId, where  } from "firebase/firestore";

import ShareBtn from "../share/share";

import {useDispatch, useSelector} from "react-redux";
import { idValue,viewEventId } from "../auth/Signup/Slice";


export default function Calendaratnd() {
	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
	const navigate = useNavigate();
	return (
		
		<div
			className="Event_dis"
			style={{ display: "flex", flexDirection: "column",marginLeft:"3vw", height:"fit-content" }}
			>
			<div className="header">
				<Header />
			</div>
			<div className="headd"><h1>Events</h1></div>

			<div className="innerhead">
				<div class="group">
				<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
				<input placeholder="Search" type="search" class="inputt"/>
				</div>
				</div>
				<div className="threebt">
				<div className="twobt">

				
					<div className="buttn" id = "list" >
					<button  class="btn" onClick= {()=>{
								navigate("/attendevents")
							}}
					>List </button>
					</div>
					
					<div className="buttn" id = "calendarr" >
					<button class="btn" 
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
				

		<div className="no-events-to-show-img" >
			<div className="main">
				<div className="outline">
					<div className="date">
						<p className="select-none font-semibold">
							{months[today.month()]}, {today.year()}
						</p>
						<div className="flex gap-10 items-center ">
							<GrFormPrevious
								className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
								onClick={() => {
									setToday(today.month(today.month() - 1));
								}}
							/>
							<p
								className=" cursor-pointer hover:scale-105 transition-all text-gray"
								onClick={() => {
									setToday(currentDate);
								}}
							>
								Today
							</p>
							<GrFormNext
								className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
								onClick={() => {
									setToday(today.month(today.month() + 1));
								}}
							/>
						</div>
					</div>
					<div className="months ">
						{days.map((day, index) => {
							return (
								<p
									key={index}
									className=" text-center h-18 w-18 grid place-content-center text-grey-500 select-none"
								>
									{day}
								</p>
							);
						})}
					</div>

					<div className=" digits ">
						{generateDate(today.month(), today.year()).map(
							({ date, currentMonth, today }, index) => {
								return (
									<div
										key={index}
										className=" digits1"
									>
										<h2
											className={cn(
												currentMonth ? "" : "text-gray-400",
												today
													? "bg-red-600 text-white"
													: "",
												selectDate
													.toDate()
													.toDateString() ===
													date.toDate().toDateString()
													? "bg-black text-white"
													: "",
												"h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
											)}
											onClick={() => {
												setSelectDate(date);
											}} 
										>
											{date.date()}
										</h2>
									</div>
								);
							}
						)}
					</div>
				</div>
			</div>
		  </div>
		</div> 
	);
}
