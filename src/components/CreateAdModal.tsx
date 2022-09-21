import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CaretDown, Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import { useEffect, useState, FormEvent } from "react";
import { Games } from "../App";
import axios from "axios";

export const CreateAdModal = () => {
  const [games, setGames] = useState<Games[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios
      .get("https://app-ignite-backend.herokuapp.com/games")
      .then((response) => setGames(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(
        `https://app-ignite-backend.herokuapp.com/games/${data.game}/ads`,
        {
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays.map(Number),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel: useVoiceChannel,
        }
      );

      alert("Anuncio criado com sucesso");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar o anuncio");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634]  py-8  px-5 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg  w-[350px] md:w-[480px] shadow-lg shadow-black/25 my-4">
        <Dialog.Title className="md:text-3xl text-xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-7 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">
              Qual o game?
            </label>
            <Select.Root name="game">
              <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex col-span-1 justify-between">
                <Select.Value
                  placeholder="Selecione o game que deseja jogar"
                  className="text-zinc-500"
                />
                <CaretDown size={24} className="color-zinc-300" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content>
                  <Select.SelectViewport className="bg-zinc-900 py-4 text-white rounded-lg px-6">
                    <Select.SelectGroup>
                      {games.map((game) => {
                        return (
                          <Select.SelectItem
                            value={game.id}
                            key={game.id}
                            className="mb-1 cursor-pointer rounded p-1 hover:bg-violet-300 hover:text-zinc-700 hover:border-none"
                          >
                            <Select.SelectItemText>
                              {game.title}
                            </Select.SelectItemText>
                          </Select.SelectItem>
                        );
                      })}
                    </Select.SelectGroup>
                  </Select.SelectViewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              type="text"
              id="name"
              placeholder="Como te chamam dentro do game?"
              name="name"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                id="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
                name="yearsPlaying"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                name="discord"
                type="text"
                id="discord"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Terca"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sabado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <Input
                  name="hourStart"
                  type="time"
                  id="hourStart"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  type="time"
                  id="hourEnd"
                  placeholder="Ate"
                />
              </div>
            </div>
          </div>

          <label className="mt-1 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 rounded bg-zinc-900 p-1"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>
          <footer className="mt-2 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
