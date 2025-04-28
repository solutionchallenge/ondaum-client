import ListItem from ".";

export default function InitChatList() {
  return (
    <div className="flex flex-col gap-3">
      <ListItem
        contents={[{ text: "Hello, do you have any concerns?", bold: false }]}
      />
      <ListItem
        contents={[
          {
            text: "Would you like to ",
            bold: false,
          },
          {
            text: "pick something",
            bold: true,
          },
          {
            text: " you like during the conversation or test?",
            bold: false,
          },
        ]}
      />
      <ListItem
        contents={[
          {
            text: "If you choose Chat, ",
            bold: false,
          },
          {
            text: "I will talk to you and find a solution.",
            bold: true,
          },
        ]}
      />
      <ListItem
        contents={[
          {
            text: "If you choose Test, ",
            bold: false,
          },
          {
            text: "I will give you the tests you want.",
            bold: true,
          },
        ]}
      />
    </div>
  );
}
