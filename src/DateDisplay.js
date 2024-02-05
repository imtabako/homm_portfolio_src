import React, { useState, useEffect } from 'react';
import { format, startOfWeek, startOfMonth, startOfDay, getWeek, getDay } from 'date-fns';
import './DateDisplay.css';

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  const currentMonth = format(currentDate, 'M');
  const currentWeek = getWeek(currentDate, { weekStartsOn: 1 }); // Assuming week starts on Monday
  const currentDay = getDay(currentDate);

  return (
    <div className="date-inner">
      <p className="date-m">{currentMonth}</p>
      <p className="date-w">{currentWeek}</p>
      <p className="date-d">{currentDay}</p>
    </div>
  );
};

export default DateDisplay;
