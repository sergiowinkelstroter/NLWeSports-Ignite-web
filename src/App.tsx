import Logo from "./assets/Logo.svg";
import * as Dialog from "@radix-ui/react-dialog";

import { useEffect, useState } from "react";

import GamerBanner from "./components/GamerBanner";
import CreateAdBanner from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

export interface Games {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Games[]>([]);

  useEffect(() => {
    axios
      .get("https://app-ignite-backend.herokuapp.com/games")
      .then((response) => setGames(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col items-center my-12">
      <img src={Logo} alt="" />
      <h1 className="text-6xl text-white font-black mt-12">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-14">
        {games.map((game) => {
          return (
            <GamerBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
