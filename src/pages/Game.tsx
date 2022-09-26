import axios from "axios";
import { CaretLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LogoImg from "../assets/Logo.svg";
import DuoCard from "../components/DuoCard";
import * as Dialog from "@radix-ui/react-dialog";
import DuoMatch from "../components/DuoMatch";

export interface DuoCardProps {
  id: string;
  name: string;
  weekDays: string[];
  yearsPlaying: number;
  useVoiceChannel: boolean;
  hourStart: string;
  hourEnd: string;
}

const Game = () => {
  const [info, setInfo] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  const { id, title } = useParams();

  async function getDiscordUser(adsID: string) {
    await fetch(`https://app-ignite-backend.herokuapp.com/ads/${adsID}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`https://app-ignite-backend.herokuapp.com/games/${id}/ads`)
      .then((response) => response.json())
      .then((data) => setInfo(data));
  }, []);
  console.log(info);

  return (
    <div className="px-8">
      <header className="w-full flex items-center  mt-7 justify-between">
        <Link to="/">
          <CaretLeft size={32} color={"white"} />
        </Link>

        <img src={LogoImg} alt="" />
        <div></div>
      </header>
      <main className="pt-14">
        <h2 className="text-white text-4xl font-black">{title}</h2>
        <p className="text-[#A1A1AA] text-sm font-normal">
          Conecte-se e comece a jogar!
        </p>
        <Dialog.Root>
          <div className=" text-white flex items-center justify-center mt-12">
            {info.map((info) => (
              <DuoCard data={info} onConnect={() => getDiscordUser(info.id)} />
            ))}
          </div>
          <DuoMatch discord={discordDuoSelected} />
        </Dialog.Root>
      </main>
    </div>
  );
};

export default Game;
