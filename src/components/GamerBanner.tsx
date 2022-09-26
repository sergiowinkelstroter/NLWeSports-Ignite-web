import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";

interface GamerBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
  id: string;
}

const GamerBanner = ({ bannerUrl, title, id, adsCount }: GamerBannerProps) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(`/${title}/${id}`)}
        className="relative rounded-lg overflow-hidden"
      >
        <img src={bannerUrl} alt="" />

        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
          <strong className="font-bold text-white block">{title}</strong>
          <span className="text-zinc-300 text-sm block">
            {adsCount} anúncio(s)
          </span>
        </div>
      </button>
    </>
  );
};

export default GamerBanner;
