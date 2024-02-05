import React, { useState, useEffect } from 'react';
import { format, startOfWeek, startOfMonth, startOfDay, getWeek, getDay, getDaysInMonth, isBefore, addWeeks, getISOWeek, addMonths } from 'date-fns';
import './DateDisplay.css';

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  const currentDayOfMonth = currentDate.getDate();

  const currentMonth = format(currentDate, 'M');
  // const currentWeek = Math.ceil(currentDayOfMonth / 7);
  const currentDay = currentDate.getDay();

  if (currentDay === 0) {
    currentDay = 7; // Sunday becomes 7
  }

  let startOfCurrent = startOfMonth(currentDate);
  // let startOfNext = addMonths(startOfCurrent, 1);
  
  let currentWeek = 1;

  for (let i = startOfCurrent; isBefore(i, currentDate); i = addWeeks(i, 1)) {
    currentWeek += 1;
  }

  return (
    <div className="date-inner">
      <p className="date-m">{currentMonth}</p>
      <p className="date-w">{currentWeek}</p>
      <p className="date-d">{currentDay}</p>
    </div>
  );
};

export default DateDisplay;
