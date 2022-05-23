# create-trello-board

This project allows you to upload a "Discography.txt" file with the Bob Dylan albums in each line, 
and then create a trello board with each album separated by decade, sorted by name, and if possible have 
the album image attached as cover.

Small example file:

```
1974 Planet Waves
1975 Blood on the Tracks
1975 The Basement Tapes
1976 Desire
1978 Street-Legal
1979 Slow Train Coming
1980 Saved
```

## How to run?

```yarn install```

```yarn dev```

> Be sure to have setted up the .env file first with the following keys or the app wont work:
> ```
> VITE_APP_KEY=TRELLO APP KEY
> VITE_TOKEN=TRELLO TOKEN
> VITE_SPOTIFY_TOKEN=SPOTIFY TOKEN
> ```

### Where to get the credentials?

- APP_KEY & TOKEN: https://trello.com/app-key/
- SPOTIFY_TOKEN: https://developer.spotify.com/console/get-track/

  > Click on the 'get token' button
