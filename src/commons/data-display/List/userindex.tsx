interface UserListItemProps {
  contents: { text: string; bold: boolean }[];
}

export default function UserListItem({ contents }: UserListItemProps) {
  return (
    <div className="px-4 py-2 max-w-[100%] bg-third outline-second rounded-tl-[15px] rounded-tr-[15px] rounded-bl-[15px] outline outline-1 outline-offset-[-0.5px] inline-flex gap-3 overflow-hidden">
      <div className="justify-start text-font-color text-sm font-pretendard leading-tight">
        {contents.map((item, index) => (
          <span key={index} className={item.bold ? "font-bold" : "font-normal"}>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
