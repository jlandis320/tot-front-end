import { useState, useEffect } from "react";

import SearchResults from "../../components/SearchResults/SearchResults.jsx";
import { search } from "../../services/searchService.js";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeQuery, setTypeQuery] = useState("restaurant");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const getSearchResults = async () => {
      const data = await search(searchTerm, typeQuery);
      setResults(data);
    };

    getSearchResults();
  }, [searchTerm, typeQuery]);

  return (
    <main>
      <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label htmlFor="type">Search By</label>
      <select
        name="type"
        id="type"
        onChange={(e) => setTypeQuery(e.target.value)}
      >
        <option value="restaurant">Restaurant</option>
        <option value="profile">Profile</option>
        <option value="tags">Tags</option>
        <option value="cuisine">Cuisine</option>
      </select>

      {results.length !== 0 && (
        <SearchResults results={results} typeQuery={typeQuery} />
      )}
    </main>
  );
};

export default Search;
