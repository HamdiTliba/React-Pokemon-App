import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./Components/PokemonList";
import Pagination from "./Components/Pagination";
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  useEffect(() => {
    let cancel;
    setLoading(true);
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setPokemon(response.data.results.map((p) => p.name));
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    return () => {
      cancel();
    };
  }, [currentPageUrl]);
  if (loading) {
    return "loading...";
  }
  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }
  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}
export default App;
