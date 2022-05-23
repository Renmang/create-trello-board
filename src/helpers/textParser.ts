export type Board = [string, string[]][];

type NumberOfCards = number;

interface Parser {
  board: Board;
  numberOfCards: NumberOfCards;
}

type AlbumsMap = { [key: string]: string[] };

const getDecade = (line: string) => line.substring(2, 3) + "0s";

const textParser = (text: string): Parser => {
  const lines = text.split("\n").sort();
  const decades: AlbumsMap = {};
  lines.forEach((line) => {
    if (line !== "") {
      const decade = getDecade(line);
      if (decades[decade]) {
        decades[decade].push(line);
      } else {
        decades[decade] = [line];
      }
    }
  });
  return { board: Object.entries(decades), numberOfCards: lines.length };
};

export default textParser;
