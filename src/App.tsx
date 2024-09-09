import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import apiClient from "./services/api-client";

interface Game {
  id: number;
  name: string;
}

interface GamesResponse {
  count: number;
  results: Game[];
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<GamesResponse>("/games")
      .then((response) => setGames(response.data.results))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <Grid
      templateAreas={{
        lg: `"nav nav"
             "aside main"`,
        base: `"nav" "main"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem bg="pink.300" area={"aside"}>
          Aside
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </GridItem>
    </Grid>
  );
}

export default App;