import { useState, useEffect } from "react";
import * as shortService from "../services/shortService";

export default function Short() {
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    shortService.postMessage(message).then(() => setMessage(""));
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      let newNotifications = [];
      if (notifications.length === 0) {
        newNotifications = await shortService.getMessages();
      } else {
        newNotifications = await shortService.getUpdatedMessages(
          notifications[notifications.length - 1].id
        );
      }
      setNotifications([...notifications, ...newNotifications]);
    };

    const timer = setInterval(() => {
      fetchNotifications();
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [notifications]);

  return (
    <div className="container">
      <h3> Using short pooling</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <label htmlFor="bodyArea" className="form-label">
            Message
          </label>
          <input
            type="text"
            placeholder="write the message"
            name="body"
            required
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            value={message}
            id="bodyArea"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <h3 className="mt-5 text-center"> Received Notifications </h3>

      <ul className="list-group">
        {notifications.map((notifi) => (
          <li key={notifi.id} className="list-group-item">
            {notifi.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
