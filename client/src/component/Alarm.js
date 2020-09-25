import React from "react"
import { fakeData } from "./fakeData"
import "./Alarm.css"
import Tab from "./Tab"

export default function Alarm() {

  return (
    <div className="alarm">
      {
        fakeData.map((data) => {
          const { id, time, question } = data;
          return (
            <li key={id}>
              <div>
                <span className="time">{time}</span>
                <label className="switch">
                  <input type="checkbox" onClick={() => { console.log('hi!') }} />
                  <span className="slider"></span>
                </label>
                <button className="delete">&#10060;</button>
                <span className="question">{question}</span>
              </div>
            </li>
          )
        })
      }
    <button className = "add">+</button>
    </div>

  )
}