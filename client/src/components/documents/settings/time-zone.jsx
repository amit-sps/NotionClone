/* eslint-disable no-unused-vars */
import React from "react";
import moment from "moment-timezone";

const TimeZone = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  });
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const time = moment.tz.setDefault(timezone);
  console.log("timetime", time);
  return <div>Time-Zone {time}</div>;
};

export default TimeZone;
