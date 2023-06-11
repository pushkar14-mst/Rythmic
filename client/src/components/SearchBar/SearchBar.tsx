import { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import { useSelector } from "react-redux";

interface SearchBarProps {
  access_token: string;
}
const SearchBar = ({ access_token }: SearchBarProps) => {
  const [search, setSearch] = useState<string>("");
  console.log(access_token);

  const searchHandler = async () => {
    await axios
      .get("https://api.spotify.com/v1/search/", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        params: {
          q: "track:" + search,
          type: "track",
          limit: 8, // Number of tracks to retrieve
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  useEffect(() => {
    searchHandler();
  }, [search]);

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-results"></div>
      </div>
    </>
  );
};
export default SearchBar;
