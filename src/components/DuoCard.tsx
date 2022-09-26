import DuoInfo from "./DuoInfo";
import * as Dialog from "@radix-ui/react-dialog";

export interface DuoCardProps {
  id: string;
  name: string;
  weekDays: string[];
  yearsPlaying: number;
  useVoiceChannel: boolean;
  hourStart: string;
  hourEnd: string;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

const DuoCard = ({ data, onConnect }: Props) => {
  return (
    <div className="w-[350px] bg-[#2a2634] rounded-md p-5 mr-4 items-center">
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Nao"}
      />

      <Dialog.Trigger
        className="w-full h-8 rounded bg-[#8B5CF6] items-center text-white text-lg font-semibold hover:opacity-70"
        onClick={onConnect}
      >
        Conectar
      </Dialog.Trigger>
    </div>
  );
};

export default DuoCard;
