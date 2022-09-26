interface Props {
  label: string;
  value: string;
}

const DuoInfo = ({ label, value }: Props) => {
  return (
    <div className="w-full mb-6">
      <h4 className="text-[#D4D4D8] text-sm font-normal ">{label}</h4>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
};

export default DuoInfo;
