import React from "react";
import { Example } from "./pages/Example";
import { useBoolean } from "ahooks";
import { Graphs } from "./pages/Graphs";

const App: React.FC = () => {
	const [toggl, { set }] = useBoolean(true);
	return (
		<>
			<button onClick={() => set(!toggl)} style={{ marginBottom: "50px" }}>
				{toggl ? "切换到画布" : "切换到侧边栏"}
			</button>
			{toggl ? <Example /> : <Graphs />}
		</>
	);
};

export default App;
