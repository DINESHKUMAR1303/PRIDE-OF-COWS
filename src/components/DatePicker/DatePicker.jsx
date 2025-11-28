import React, { useState } from "react";
import "./DatePicker.css";

const DatePicker = ({ onClose, onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // December 2025
  const [selectedDay, setSelectedDay] = useState(null);

  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
  };

  const handleDateSelect = (day) => {
    setSelectedDay(day);
    onSelect(`${day} ${monthName} ${year}`);
    onClose();
  };

  return (
    <div className="datepicker-overlay">
      <div className="datepicker-container">
        {/* Header */}
        <div className="dp-header">
          <button className="dp-arrow" onClick={goToPrevMonth}>←</button>
          <h2 className="dp-month">{monthName} <span>{year}</span></h2>
          <button className="dp-arrow" onClick={goToNextMonth}>→</button>
        </div>

        {/* Weekdays */}
        <div className="dp-weekdays">
          <span>SUN</span>
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
          <span>THU</span>
          <span>FRI</span>
          <span>SAT</span>
        </div>

        {/* Days Grid */}
        <div className="dp-grid">
          {daysArray.map((day, index) => (
            <button
              key={index}
              className={`dp-day ${day === selectedDay ? "selected" : ""} ${
                day === null ? "empty" : ""
              }`}
              disabled={day === null}
              onClick={() => day && handleDateSelect(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Close Button */}
        <button className="dp-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DatePicker;
