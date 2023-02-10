import { useEffect, useRef, useState } from "react";
import "./App.css";

const BASE_URL = `https://pokeapi.co/api/v2`;

function App() {
  const [list, setList] = useState([]);

  const fetchData = () => {
    const URL = BASE_URL + `/pokemon?limit=51`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setList(data?.results));
  };

  useEffect(fetchData, []);

  return (
    <div className="App">
      <Banner list={list} />
      <List list={list} />
    </div>
  );
}

const Banner = ({ list }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && list.length) {
      setTimeout(() => {
        window?.scroll?.({ top: ref.current.offsetHeight, left: 0, behavior: "smooth" });
      }, 5000);
    }
  }, [list?.length]);

  return (
    <div className="banner" ref={ref}>
      <h2>
        Progressive Web
        <br />
        Application
        <br />
        Demo
      </h2>
    </div>
  );
};

const List = ({ list }) => {
  const [search, setSearch] = useState("");

  const searchPokemon = ({ name }) => name?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase());

  return (
    <section>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for Pokemon" />

      <div className="card-list">
        {list?.filter(searchPokemon).map((pokemon) => (
          <Card key={pokemon.url} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <img loading="lazy" alt={pokemon.name} width="100%" height="auto" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} />
      <h3> {pokemon.name}</h3>
    </div>
  );
};

export default App;
