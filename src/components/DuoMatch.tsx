import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle, Copy, X } from "phosphor-react";
import { useState } from "react";

interface Props {
  discord: string;
}

const DuoMatch = ({ discord }: Props) => {
  const [textCopy, setTextCopy] = useState("");

  function handleCopyDiscord() {}

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] h-[400px] flex flex-col items-center gap-5  py-8  px-5 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg  w-[350px] md:w-[480px] shadow-lg shadow-black/25 my-4">
        <Dialog.Close className="self-end">
          <X size={24} color={"white"} />
        </Dialog.Close>
        <CheckCircle size={64} color={"green"} weight="bold" />
        <header className="flex flex-col items-center mt-4">
          <h1 className="text-2xl text-white font-bold">Let’s play!</h1>
          <p className="text-base   text-[#D4D4D8]">
            Agora é só começar a jogar!
          </p>
        </header>
        <main className="flex flex-col items-center text-white mt-4">
          <p className="font-bold text-lg">Adicione no Discord</p>
          <button
            onClick={handleCopyDiscord}
            className="bg-black p-3 rounded-md hover:opacity-70 w-full"
          >
            {discord}
          </button>
        </main>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default DuoMatch;
