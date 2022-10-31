import {
  connectionStatusModify,
  recordStateModify,
  streamStateModify,
} from "../store/connectionInfo.slice";
import { store } from "../store/store";
import OBSWebSocket, { OBSRequestTypes } from "obs-websocket-js";
const obs = new OBSWebSocket();

if (localStorage.getItem("password") != null) {
  obs.connect(
    `ws://${localStorage.getItem("ipAddress")}:${localStorage.getItem("port")}`,
    localStorage.getItem("password") || ""
  );
}

// * Connection open event
obs.on("ConnectionOpened", () => {
  store.dispatch(connectionStatusModify(true));
});
// * Connection close event
obs.on("ConnectionClosed", () => {
  store.dispatch(connectionStatusModify(false));
});
// * Connection error event
obs.on("ConnectionError", (error) => {
  store.dispatch(connectionStatusModify(false));
  console.log(error.message || "Not connecting");
});
// * Stream status change on state
obs.on("StreamStateChanged", (status) =>
  store.dispatch(streamStateModify(status))
);
// * Record status change on state
obs.on("RecordStateChanged", (status) => {
  store.dispatch(recordStateModify(status));
});

export default obs;
