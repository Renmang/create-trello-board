import TrelloApi from "@/api/TrelloApi";
import SpotifyApi from "@/api/SpotifyApi";
import { Board } from "./textParser";
import { Action } from "@/reducers/boardReducer";
import axios from "axios";

const Trello = TrelloApi.getInstance();
const Spotify = new SpotifyApi();

const createBoard = async (
  name: string,
  boardData: Board,
  dispatch: React.Dispatch<Action>
): Promise<boolean> => {
  try {
    dispatch({ type: "start-loading" });
    //initialize spotify token
    await Spotify.getSpotifyToken();
    await Trello.createBoard(name);
    await createLists(boardData, boardData.length - 1, dispatch);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error?.response?.data);
    } else {
      console.log(error);
    }
    dispatch({ type: "end-loading" });
    return false;
  }
};

const createLists = async (
  boardData: Board,
  index: number,
  dispatch: React.Dispatch<Action>
): Promise<boolean | null> => {
  if (boardData[index]) {
    const [listName, cards] = boardData[index];
    const listId = await Trello.createList(listName);

    createCards(cards, listId, 0, dispatch);

    createLists(boardData, index - 1, dispatch);
  }
  return true;
};

const createCards = async (
  cards: string[],
  listId: string,
  index: number,
  dispatch: React.Dispatch<Action>
): Promise<boolean | null> => {
  if (cards[index]) {
    const id = await Trello.createCard(cards[index], listId);
    const albumCoverUrl = await Spotify.getAlbumImage(cards[index]).then();

    dispatch({ type: "update-progress" });

    if (albumCoverUrl && id) {
      Trello.uploadCover(albumCoverUrl, id);
    }
    createCards(cards, listId, index + 1, dispatch);
  }
  return true;
};

export default createBoard;
