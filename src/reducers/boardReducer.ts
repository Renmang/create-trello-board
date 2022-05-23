type State = {
  isLoading: boolean;
  progress: number;
  totalProgress: number | null;
  finished: boolean;
};

export type Action =
  | { type: "start-loading" }
  | { type: "end-loading" }
  | { type: "set-total-progress"; payload: number }
  | { type: "update-progress" }
  | { type: "finish" };

export const initialState = {
  isLoading: false,
  progress: 0,
  totalProgress: null,
  finished: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "start-loading": {
      return { ...state, progress: 0, isLoading: true };
    }
    case "set-total-progress": {
      // last line is an empty line
      return { ...state, totalProgress: action.payload - 1, finished: false };
    }
    case "update-progress": {
      return { ...state, progress: state.progress + 1 };
    }
    case "end-loading": {
      return { ...state, finished: true, isLoading: false };
    }
    default:
      return initialState;
  }
};

export default reducer;
