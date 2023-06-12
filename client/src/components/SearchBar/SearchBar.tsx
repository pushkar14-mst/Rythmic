import { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import { useSelector } from "react-redux";

interface SearchBarProps {
  access_token: string;
}
const SearchBar = ({ access_token }: SearchBarProps) => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<any>([]);
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
        setResults(res.data.tracks.items);
      });
  };
  console.log(results);

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
        <div className="search-results">
          {results.map((res: any) => {
            return (
              <div className="results">
                <img src={res.album.images[0].url} />
                <div className="song-info">
                  <h3 style={{ margin: "5px 5px" }}>{res.name}</h3>
                  <p style={{ margin: "5px 5px" }}>
                    {res.artists!.map((artist: any) => {
                      return (
                        artist.name + `${res.artists!.length < 2 ? "" : ", "}`
                      );
                    })}
                  </p>
                </div>
                <button style={{ marginLeft: "auto" }}>Add</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default SearchBar;
