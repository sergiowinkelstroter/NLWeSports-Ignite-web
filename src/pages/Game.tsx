import axios from "axios";
import { CaretLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LogoImg from "../assets/Logo.svg";
import DuoCard from "../components/DuoCard";
import * as Dialog from "@radix-ui/react-dialog";
import DuoMatch from "../components/DuoMatch";
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

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
    await axios
      .get(`https://app-ignite-backend.herokuapp.com/ads/${adsID}/discord`)
      .then((response) => setDiscordDuoSelected(response.data.discord));
  }

  useEffect(() => {
    axios
      .get(`https://app-ignite-backend.herokuapp.com/games/${id}/ads`)
      .then((response) => setInfo(response.data));
  }, []);

  return (
    <div className="px-8">
      <header className="w-full flex items-center  mt-7 justify-between">
        <Link to="/">
          <CaretLeft size={32} color={"white"} />
        </Link>

        <img className="w-36 md:w-52" src={LogoImg} alt="" />
        <div></div>
      </header>
      <main className="pt-14">
        <h2 className="text-white text-4xl font-black">{title}</h2>
        <p className="text-[#A1A1AA] text-sm font-normal">
          Conecte-se e comece a jogar!
        </p>
        <Dialog.Root>
          <Swiper
            breakpoints={{
              375: {
                width: 375,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 2,
              },
              1024: {
                width: 1024,
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
            spaceBetween={300}
            className="text-white flex items-center justify-center my-8 md:flex-row"
          >
            {info.map((info) => {
              return (
                <SwiperSlide key={info.id}>
                  <DuoCard
                    data={info}
                    onConnect={() => getDiscordUser(info.id)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <DuoMatch discord={discordDuoSelected} />
        </Dialog.Root>
      </main>
    </div>
  );
};

export default Game;
