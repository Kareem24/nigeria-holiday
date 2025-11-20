import React from "react";

const NigeriaHoliday = () => {
  const calendarId = "en.ng%23holiday@group.v.calendar.google.com";

  const startDate = "20251201";
  const endDate = "20260101";

  const embedUrl = `https://calendar.google.com/calendar/embed?
    height=600
    &wkst=1
    &bgcolor=%23ffffff
    &ctz=Africa%2FLagos
    &src=${calendarId}
    &color=%23f09000
    &title=Nigeria%20Public%20Holidays
    &showTitle=0
    &showNav=1
    &showDate=1
    &showTabs=1
    &showCalendars=1
    &mode=month
    &dates=${startDate}%2F${endDate}`; // <-- Added dates parameter

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <iframe
        src={embedUrl.replace(/\s/g, "")} // Remove whitespace
        style={{ border: 0 }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="Nigeria Public Holidays Calendar"
      ></iframe>
    </div>
  );
};

export default NigeriaHoliday;
