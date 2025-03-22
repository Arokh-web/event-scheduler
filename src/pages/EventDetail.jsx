import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EventDetail = () => {
  const { id } = useParams();
  const isCreateMode = id === "new";
  const [event, setEvent] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCreateMode) {
      setIsEditMode(true);
      setEvent({
        title: "",
        location: "",
        date: "",
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return;
    }

    fetch(`http://localhost:3001/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      });
  }, [id, isCreateMode]);

  const handleSave = () => {
    const method = isCreateMode ? "POST" : "PUT";
    const url = isCreateMode
      ? "http://localhost:3001/api/events"
      : `http://localhost:3001/api/events/${id}`;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Event updated or saved: ", data);
        setEvent(data);
        navigate(`/events/${data.id}`);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/events/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Event deleted: ", data);
      })
      .catch((error) => {
        console.log("Event delete failed: ", error);
      });
  };

  if (event === null || event.id === 0) {
    return (
      <>
        <h1>Event not found</h1>
        <h2>
          <button
            className="button-style"
            onClick={() => navigate("/events/new")}
          >
            Create an Event
          </button>
        </h2>
      </>
    );
  }

  return (
    <div className="detail-page-container">
      {isEditMode ? (
        <div className="event-detail-content">
          <h1>Edit Event</h1>
          <input
            type="text"
            value={event.title || ""}
            placeholder="Title"
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
          <input
            type="text"
            value={event.location || ""}
            placeholder="Location"
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
          />
          <input
            type="text"
            value={event.date || ""}
            placeholder="Date"
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
          />
          <input
            type="text"
            value={event.description || ""}
            placeholder="Description"
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
          <button className="button-style" onClick={handleSave}>
            Save
          </button>
          <button className="button-style" onClick={() => setIsEditMode(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="event-detail-buttons">
            <button
              className="button-style"
              onClick={() => navigate(`/events/${event.id - 1}`)}
            >
              Previous Event
            </button>
            <button
              className="button-style"
              onClick={() => navigate("/events")}
            >
              Back to Overview
            </button>
            <button
              className="button-style"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </button>
            <button
              className="button-style"
              onClick={() => {
                handleDelete(event.id);
              }}
            >
              Delete
            </button>
            <button
              className="button-style"
              onClick={() => navigate(`/events/${event.id + 1}`)}
            >
              Next Event
            </button>
          </div>
          <div className="event-detail-content-view">
            <h1>{event.title}</h1>
            <h3>Location: </h3>
            {event.location}
            <h3>Date: </h3>
            {event.date}
            <h3>Created At: </h3>
            {event.createdAt}
            <h3>Last Update: </h3>
            {event.updatedAt}
            <h3>Organizer ID: </h3>
            {event.organizerId}
            <h3>Event ID: </h3>
            {event.id}
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetail;
