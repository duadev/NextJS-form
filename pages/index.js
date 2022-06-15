import React, { useState } from "react";
import styles from '../styles/Home.module.css'

export default function App() {
  const [query, setQuery] = useState({
    name: "",
    email: ""
  });

  // Update inputs value
  const handleParam = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  // Form Submit function
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    fetch("https://getform.io/f/315f42f-188d07c40", {
      method: "POST",
      body: formData
    }).then(() => setQuery({ name: "", email: "", message: "" }));
  };
  return (
    <div className="App">
      <h1>NextJS form using Getform.io</h1>
      <form onSubmit={formSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="form-control"
            value={query.name}
            onChange={handleParam()}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="form-control"
            value={query.email}
            onChange={handleParam()}
          />
        </div>
        <div>
          <label>Message</label>
          <input
            type="text"
            name="message"
            required
            placeholder="Message"
            className="form-control"
            value={query.message}
            onChange={handleParam()}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
