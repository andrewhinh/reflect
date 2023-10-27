// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/home/FunFact.css";
// eslint-disable-next-line no-unused-vars
import SubmitButton from "../util/SubmitButton";

function FunFact({ heading }) {
  // eslint-disable-next-line no-unused-vars
  const [text, setText] = useState("");

  // useEffect(() => {
  //   let timeout = null;
  //   const timeOutError = "Connection timed out";

  //   const websocket = new WebSocket(
  //     "ws://" +
  //       import.meta.env.VITE_API_URL.replace(/(^\w+:|^)\/\//, "").replace(
  //         /\/$/,
  //         ""
  //       ) +
  //       ":" +
  //       import.meta.env.VITE_API_PORT +
  //       "/fact"
  //   ); // remove protocol + trailing slash from url

  //   websocket.onopen = () => {
  //     timeout = setTimeout(() => {
  //       console.error(timeOutError);
  //       websocket.close(1011, "timeout");
  //     }, 15000);
  //     console.log("Connected to the WebSocket");
  //   };

  //   websocket.onmessage = (event) => {
  //     clearTimeout(timeout);
  //     const data = JSON.parse(event.data);
  //     const message = data.message;
  //     const status = data.status;
  //     const result = data.result;
  //     const error_message = data.error_message;

  //     if (status == "ERROR") {
  //       console.error(error_message);
  //       websocket.close(1011, "error"); /* close connection if error occurs */
  //     } else if (status == "DONE") {
  //       console.log("WebSocket received: ", result);
  //       websocket.close(
  //         1000,
  //         "success"
  //       ); /* close connection if result is received */
  //     } else setText((prevMessage) => `${prevMessage}${message}`);
  //   };

  //   websocket.onclose = (event) => {
  //     if (event.reason === "timeout") {
  //       console.error(timeOutError);
  //     } else if (event.reason === "error") {
  //       console.error("Connection closed due to error");
  //     } else if (event.reason === "success") {
  //       console.log("Connection closed successfully");
  //     }
  //   };

  //   websocket.onerror = (event) => {
  //     console.error("WebSocket encountered an error:", event);
  //   };

  //   return () => {
  //     websocket.close();
  //   };
  // }, []);

  return (
    <aside>
      <h2>{heading}</h2>
      <p className="tal">Something is in the works...</p>
      {/* <p className="tal">{text}</p> */}
      {/* <SubmitButton onClick={() => setText("")} label="Another!" /> */}
    </aside>
  );
}

FunFact.propTypes = {
  heading: PropTypes.string.isRequired,
};

FunFact.defaultProps = {
  heading: "Did you know?",
};

export default FunFact;
