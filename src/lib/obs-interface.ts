import { connectionStatusModify } from "../store/connectionInfo.slice";
import { store } from "../store/store";
import OBSWebSocket, { OBSRequestTypes } from "obs-websocket-js";
const obs = new OBSWebSocket();

if (localStorage.getItem("password") != null) {
  obs.connect(
    `ws://${localStorage.getItem("ipAddress")}:${localStorage.getItem("port")}`,
    localStorage.getItem("password") || ""
  );
}

obs.on("ConnectionOpened", () => {
  store.dispatch(connectionStatusModify(true));
});

obs.on("ConnectionClosed", () => {
  store.dispatch(connectionStatusModify(false));
  window.location.pathname = "/";
});

export default obs;
