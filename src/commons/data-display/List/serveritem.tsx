interface ServerItemProps {
  contents: { text: string; bold: boolean }[];
}

export default function ServerItem({ contents }: ServerItemProps) {
  return (
    <div className="px-4 py-2 max-w-[80%] bg-gray-2 rounded-tl-[15px] rounded-tr-[15px] rounded-br-[15px] outline outline-1 outline-offset-[-0.5px] outline-gray-1 inline-flex gap-3 overflow-hidden">
      <div className="justify-start text-font-color text-sm font-['Pretendard'] leading-tight">
        {contents.map((item, index) => (
          <span key={index} className={item.bold ? "font-bold" : "font-normal"}>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
