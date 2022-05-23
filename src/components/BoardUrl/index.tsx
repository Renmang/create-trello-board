import { Result, Button } from "antd";
import TrelloApi from "@/api/TrelloApi";

const BoardUrl = () => {
  const Trello = TrelloApi.getInstance();
  const boardUrl = Trello.getBoardUrl();
  return (
    <Result
      status="success"
      title="Successfully created Bob Dylan Trello board!"
      extra={[
        <Button type="primary" href={boardUrl!}>
          Go to board
        </Button>,
      ]}
    />
  );
};

export default BoardUrl;
