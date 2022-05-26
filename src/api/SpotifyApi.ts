import axios from "axios";

export default class SpotifyApi {
  access_token: string | undefined;
  clientId: string;
  clientSecret: string;

  constructor() {
    this.clientId = import.meta.env.VITE_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  }

  async getSpotifyToken(): Promise<string | null> {
    if (this.access_token) {
      return this.access_token;
    } else {
      return await axios
        .post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          { headers: this.buildHeader() }
        )
        .then((res) => {
          const { access_token } = res.data;
          this.access_token = access_token;
          return access_token;
        })
        .catch((res) => {
          console.error(res);
          return null;
        });
    }
  }

  buildHeader(): { Authorization: string; "Content-Type": string } {
    const auth = btoa(`${this.clientId}:${this.clientSecret}`);
    return {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  async getAlbumImage(album: string): Promise<string | null> {
    const name = album.slice(5);
    const url = `https://api.spotify.com/v1/search?q=album:${encodeURI(
      name
    )}%20&type=album`;

    const access_token = await this.getSpotifyToken();

    return await axios
      .get(url, { headers: { Authorization: `Bearer ${access_token}` } })
      .then((res) => {
        const albumUrl = res.data.albums.items[0].images[1].url;
        return albumUrl;
      })
      .catch(() => {
        console.log("Could not find album image for:", album);
        return null;
      });
  }
}
