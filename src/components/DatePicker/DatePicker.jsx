import React, { useState, useMemo, useCallback } from "react";
import "./DatePicker.css";

const DatePicker = ({ onClose, onSelect }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(new Date(today));

  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  /* =============================
     MEMOIZED DAY GRID (NO LAG)
  ============================== */
  const daysArray = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year + (month === 11 ? 1 : 0), (month + 1) % 12, 0).getDate();

    const arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let i = 1; i <= daysInMonth; i++) arr.push(i);

    return arr;
  }, [year, month]);

  /* =============================
      NEXT / PREV MONTH (OPTIMIZED)
  ============================== */
  const goToNextMonth = useCallback(() => {
    setCurrentDate(new Date(year, month + 1, 1));
  }, [year, month]);

  const goToPrevMonth = useCallback(() => {
    setCurrentDate(new Date(year, month - 1, 1));
  }, [year, month]);

  /* =============================
     DISABLE PAST DAYS
  ============================== */
  const isPastDay = (day) => {
    if (!day) return false;
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate <= today;
  };

  /* =============================
      SELECT DATE
  ============================== */
  const handleDateSelect = (day) => {
    const selected = new Date(year, month, day);

    const formatted =
      selected.getDate() +
      " " +
      selected.toLocaleString("en-US", { month: "long" }) +
      " " +
      selected.getFullYear();

    onSelect(formatted);
    onClose();
  };

  /* =============================
       CLOSE WHEN CLICK OUTSIDE
  ============================== */
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("datepicker-overlay")) {
      onClose();
    }
  };

  return (
    <div className="datepicker-overlay" onClick={handleOverlayClick}>
      <div className="datepicker-container">

        {/* Header */}
        <div className="dp-header">
          <button className="dp-arrow" onClick={goToPrevMonth}>←</button>

          <h2 className="dp-month">
            {monthName} <span>{year}</span>
          </h2>

          <button className="dp-arrow" onClick={goToNextMonth}>→</button>
        </div>

        {/* Weekdays */}
        <div className="dp-weekdays">
          <span>SUN</span><span>MON</span><span>TUE</span>
          <span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
        </div>

        {/* Calendar Grid */}
        <div className="dp-grid">
          {daysArray.map((day, index) => {
            const disabled = isPastDay(day);

            return (
              <button
                key={index}
                className={`dp-day ${day === null ? "empty" : ""} ${disabled ? "disabled" : ""}`}
                disabled={disabled || day === null}
                onClick={() => !disabled && handleDateSelect(day)}
              >
                {day}
              </button>
            );
          })}
        </div>

        <button className="dp-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DatePicker;
