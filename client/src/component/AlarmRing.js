import React from "react";
import "./AlarmRing.css"

export default function AlarmRing({ isAlarm, isAlarmHandler}) {

    return (
        <div className={isAlarm ? "isAlarm" : "none"}>
          <div className="content">
          <button className="alarm_cancel" onClick={isAlarmHandler}>알람해제</button>
          <h2>01:34</h2>  
          </div>
        </div>
    )

}