import axios from "axios";

export default class TrelloApi {
  static instance: TrelloApi;
  appKey: string;
  token: string;
  basePath = "https://api.trello.com/1";
  boardId: string | null;
  boardUrl: string | null;

  constructor() {
    this.appKey = import.meta.env.VITE_APP_KEY;
    this.token = import.meta.env.VITE_TOKEN;
    this.boardId = null;
    this.boardUrl = null;
  }

  static getInstance(): TrelloApi {
    if (!this.instance) {
      this.instance = new TrelloApi();
    }
    return this.instance;
  }

  getAuthParams(): string {
    return `key=${this.appKey}&token=${this.token}`;
  }

  buildUrlWithAuth(url: string): string {
    return `${this.basePath}${url}&${this.getAuthParams()}`;
  }

  async createBoard(name: string): Promise<string | null> {
    const url = this.buildUrlWithAuth(
      `/boards?name=${name}&defaultLists=false&prefs_permissionLevel=public`
    );
    return axios.post(url).then((res) => {
      const { id, url } = res.data;
      this.boardId = id;
      this.boardUrl = url;
      return id;
    });
  }

  getBoardUrl(): string | null {
    return this.boardUrl ? this.boardUrl : null;
  }

  async createList(name: string, boardId?: string): Promise<string> {
    const id = boardId || this.boardId;
    const url = this.buildUrlWithAuth(`/boards/${id}/lists?name=${name}`);
    return await axios.post(url).then((res) => res.data.id);
  }

  async createCard(name: string, listId: string): Promise<string | null> {
    const url = this.buildUrlWithAuth(`/cards?idList=${listId}&name=${name}`);
    return axios.post(url).then((res) => res.data.id);
  }

  async uploadCover(coverUrl: string, cardId: string): Promise<boolean> {
    const { data: stream } = await axios.get(coverUrl, {
      responseType: "arraybuffer",
    });
    const formData = new window.FormData();
    const file = new Blob([stream]);
    formData.append("file", file);

    const url = this.buildUrlWithAuth(
      `/cards/${cardId}/attachments?setCover=true`
    );
    return await axios
      .post(url, formData)
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
