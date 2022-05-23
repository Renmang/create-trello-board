import { useEffect, useReducer } from "react";
import { Layout } from "antd";
import reducer, { initialState } from "@/reducers/boardReducer";
import CreateBoard from "@/components/CreateBoard";
import Loading from "@/components/Loading";
import BoardUrl from "@/components/BoardUrl";
import "./App.css";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, progress, totalProgress, finished } = state;

  useEffect(() => {
    if (progress === totalProgress) {
      dispatch({ type: "end-loading" });
    }
  }, [progress]);

  return (
    <Layout className="layout">
      {isLoading && totalProgress ? (
        <Loading progress={progress} totalProgress={totalProgress} />
      ) : !finished ? (
        <CreateBoard dispatch={dispatch} />
      ) : (
        <BoardUrl />
      )}
    </Layout>
  );
};

export default App;
