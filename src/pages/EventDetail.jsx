import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EventDetailCard = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        console.log(data);
      });
  }, [id]);

  const handleSave = () => {
    fetch(`http://localhost:3001/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Event updated: ", data);
        setEvent(data);
        setIsEditMode(false);
      });
  };

  if (!event) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {isEditMode ? (
        <div>
          <h1>Edit Event</h1>
          <input
            type="text"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
          <input
            type="text"
            value={event.location}
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
          />
          <input
            type="text"
            value={event.date}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
          />
          <input
            type="text"
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <button onClick={() => setIsEditMode(true)}>Edit</button>
          <h1>{event.title}</h1>
          <h3>Location: {event.location}</h3>
          <h3>Date: {event.date}</h3>
          <h3>Created At: {event.createdAt}</h3>
          <h3>Last Update: {event.updatedAt}</h3>
          <h3>Organizer ID: {event.organizerId}</h3>
          <h3>Event ID: {event.id}</h3>
          <h3>Description</h3>
          <p>{event.description}</p>
        </>
      )}
    </div>
  );
};

export default EventDetailCard;
