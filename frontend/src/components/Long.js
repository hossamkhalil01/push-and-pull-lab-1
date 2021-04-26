import { useState, useEffect } from "react";
import * as longService from "../services/longService";

export default function Long() {
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    longService.postMessage(message).then(() => setMessage(""));
  };

  useEffect(() => {
    longService.getMessages().then((newNotification) => {
      setNotifications([...notifications, newNotification]);
    });
  }, [notifications]);

  return (
    <div className="mt-5 container">
      <h3> Using Long pooling</h3>
      <form onSubmit={handleSubmit}>
        <div className="">
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
