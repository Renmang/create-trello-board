import { useState } from "react";
import { Row, Col, Button } from "antd";
import FileUploader from "@/components/FileUploader";
import createBoard from "@/helpers/createBoard";
import textParser, { Board } from "@/helpers/textParser";
import { Action } from "@/reducers/boardReducer";

interface CBProps {
  dispatch: React.Dispatch<Action>;
}

const CreateBoard = ({ dispatch }: CBProps) => {
  const [board, setBoard] = useState<Board | null>(null);

  const handleClick = async () => {
    if (board) {
      await createBoard("Bob Dylan", board, dispatch);
    }
  };

  const handleLoad = (text: string) => {
    const { board, numberOfCards } = textParser(text);
    dispatch({ type: "set-total-progress", payload: numberOfCards });
    setBoard(board);
  };

  return (
    <>
      <Row justify="center">
        <Col
          span={12}
          className="centered"
          style={{ height: 300, marginBottom: "4em" }}
        >
          <FileUploader onLoad={handleLoad} />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Button
            type="primary"
            disabled={board === null}
            onClick={handleClick}
          >
            Create board!
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CreateBoard;
