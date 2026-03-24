function SearchBar({ searchName, setSearchName, searchUser, reset }) {

  return (

    <div>

      <h2>Search User</h2>

      <input
        placeholder="search name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <button onClick={searchUser}>Search</button>

      <button onClick={reset}>Reset</button>

    </div>

  );
}

export default SearchBar;