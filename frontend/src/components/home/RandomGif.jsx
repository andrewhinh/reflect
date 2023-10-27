import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/home/RandomGif.css";
import SubmitButton from "../util/SubmitButton";

function RandomGif({ default_rating, default_tag }) {
  const [url, setUrl] = useState(null); // Declare a state for the URL
  const [rating, setRating] = useState(default_rating); // Declare a state for the rating
  const [tag, setTag] = useState(default_tag); // Declare a state for the tag interally

  let giphyURL = encodeURI(
    `https://api.giphy.com/v1/gifs/random?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&rating=${rating}&tag=${tag}`
  );

  const handleTag = (event) => {
    event.preventDefault();
    let tag = event.currentTarget.value;
    setTag(tag);
  };

  const handleRating = (event) => {
    event.preventDefault();
    let rating = event.currentTarget.value;
    if (rating !== "") {
      setRating(rating);
    }
  };

  const getGifURL = async () => {
    let response = await fetch(giphyURL, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    response = await response.json();
    const fetchedUrl = response.data.images.original.url;
    setUrl(fetchedUrl); // Set the state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(null); // Reset the state
    getGifURL();
  };

  useEffect(() => {
    getGifURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside>
      {url ? <img src={url} alt="Random Gif" /> : "Loading..."}
      <form>
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={tag}
          onChange={(e) => handleTag(e)}
        />
        <label htmlFor="rating">Rating</label>
        <span>{rating.toUpperCase()}</span>
        <div className="rating-container">
          <button
            type="hidden"
            id="g"
            name="g"
            value="g"
            onClick={(e) => handleRating(e)}
          >
            <span>G</span>
          </button>
          <button
            type="hidden"
            id="pg"
            name="pg"
            value="pg"
            onClick={(e) => handleRating(e)}
          >
            <span>PG</span>
          </button>
          <button
            type="hidden"
            id="pg-13"
            name="pg-13"
            value="pg-13"
            onClick={(e) => handleRating(e)}
          >
            <span>PG-13</span>
          </button>
          <button
            type="hidden"
            id="r"
            name="r"
            value="r"
            onClick={(e) => handleRating(e)}
          >
            <span>R</span>
          </button>
        </div>
        <SubmitButton onClick={(e) => handleSubmit(e)} />
      </form>
    </aside>
  );
}

RandomGif.propTypes = {
  default_rating: PropTypes.string.isRequired,
  default_tag: PropTypes.string.isRequired,
};

RandomGif.defaultProps = {
  default_rating: "r",
  default_tag: "dog",
};

export default RandomGif;
