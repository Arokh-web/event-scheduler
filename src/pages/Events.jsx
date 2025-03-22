// Purpose and Usage: Contains the MAIN Events component which is the page for the Event-Preview-Card component. The Preview-Card opens the Details-Card component when clicked.

import { useContext } from "react";
import { EventData } from "../App";
import EventPreviewCard from "../components/EventPreviewCard";
import ErrorBoundary from "../components/ErrorBoundary";

const Events = () => {
  const events = useContext(EventData);

  return (
    <ErrorBoundary>
      <div className="event-list-full-container">
        <h1>Full List of Events</h1>
        <div className="event-preview-card-container">
          {events.map((event, index) => (
            <div key={index}>
              <EventPreviewCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Events;
