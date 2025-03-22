import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventPreviewCard = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="event-preview-card">
      <img
        src="https://picsum.photos/200"
        alt="Event Image"
        className="event-preview-card-img"
      />

      <div className="event-preview-card-content">
        <h3 className="event-title">Event: </h3> {event.title}
      </div>

      <div className="event-preview-card-content">
        <h3 className="event-data">Where: </h3> {event.location}
        <h3 className="event-data">When: </h3> {event.date}
      </div>

      <div className="button-container">
        <button className="button-style" onClick={handleDetails}>
          {isExpanded ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {isExpanded && (
        <div className="event-details">
          <table>
            <thead>
              <tr>
                <th>Created At</th>
                <th>Last Update</th>
                <th>Organizer ID</th>
                <th>Event ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{event.createdAt}</td>
                <td>{event.updatedAt}</td>
                <td>{event.organizerId}</td>
                <td>{event.id}</td>
              </tr>
            </tbody>
          </table>

          <div>
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
          <div>
            <h3>Coordinates</h3>
            <p>
              {event.latitude} and {event.longitude} in {event.location}
            </p>
          </div>
          <div className="button-container">
            <button
              className="button-style"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              Enlarge
            </button>
            <button
              className="button-style"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              Edit
            </button>
            <button className="button-style">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPreviewCard;
