import {
  connectionStatusModify,
  recordStateModify,
  streamStateModify,
} from "../store/connectionInfo.slice";
import { store } from "../store/store";
import OBSWebSocket, { EventSubscription } from "obs-websocket-js";
const OBSController = new OBSWebSocket();

if (localStorage.getItem("password") != null) {
  OBSController.connect(
    `ws://${localStorage.getItem("ipAddress")}:${localStorage.getItem("port")}`,
    localStorage.getItem("password") || "",
    { eventSubscriptions: EventSubscription.All }
  );
}

// * Connection open event
OBSController.on("ConnectionOpened", () => {
  store.dispatch(connectionStatusModify(true));
});
// * Connection close event
OBSController.on("ConnectionClosed", () => {
  store.dispatch(connectionStatusModify(false));
});
// * Connection error event
OBSController.on("ConnectionError", (error) => {
  store.dispatch(connectionStatusModify(false));
  console.log(error.message || "Not connecting");
});
// * Stream status change on state
OBSController.on("StreamStateChanged", (status) =>
  store.dispatch(streamStateModify(status))
);
// * Record status change on state
OBSController.on("RecordStateChanged", (status) => {
  store.dispatch(recordStateModify(status));
});

export default OBSController;
