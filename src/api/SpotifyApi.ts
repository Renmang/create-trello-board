import axios from "axios";

export default class SpotifyApi {
  spotifyToken: string;

  constructor() {
    this.spotifyToken = import.meta.env.VITE_SPOTIFY_TOKEN;
  }

  async getAlbumImage(album: string): Promise<string | null> {
    const name = album.slice(5);
    const url = `https://api.spotify.com/v1/search?q=album:${encodeURI(
      name
    )}%20artist:bob%20dylan&type=album`;

    return await axios
      .get(url, { headers: { Authorization: `Bearer ${this.spotifyToken}` } })
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
