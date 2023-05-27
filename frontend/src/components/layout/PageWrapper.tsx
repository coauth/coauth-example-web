import {ReactNode, useEffect} from "react";
import {useAtom} from "jotai";
import {appState} from "../../state/AppState.ts";

type Props = {
  state?: string,
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const [, setApplicationState] = useAtom(appState);

  useEffect(() => {
    if (props.state) {
      setApplicationState(props.state);
    }
  }, [props]);

  return (
      <>{props.children}</>
  );
};

export default PageWrapper;