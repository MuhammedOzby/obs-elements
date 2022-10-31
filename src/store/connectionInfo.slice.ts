import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import obs from "../lib/obs-interface";
import { OBSEventTypes, OBSResponseTypes } from "obs-websocket-js";

export interface ConnectionState {
  streamState: OBSEventTypes["StreamStateChanged"];
  recordState: OBSEventTypes["RecordStateChanged"];
  connectionStatus: boolean;
  ipAddress: string;
  password: string;
  port: number;
}

const initialState: ConnectionState = {
  streamState: { outputActive: false, outputState: "" },
  recordState: { outputActive: false, outputState: "" },
  connectionStatus: false,
  ipAddress: localStorage.getItem("ipAddress") || "127.0.0.1",
  port: parseInt(localStorage.getItem("port") || "4455"),
  password: localStorage.getItem("password") || "",
};

export const connectionSlice = createSlice({
  name: "obs-connection",
  initialState,
  reducers: {
    connectionStatusModify: (state, action: PayloadAction<boolean>) => {
      state.connectionStatus = action.payload;
    },
    //* IP, pass, port info add and start the connection.
    setConnectionInfo: (
      state,
      action: PayloadAction<{
        ipAddress: string;
        password: string;
        port: number;
      }>
    ) => {
      state = { ...state, ...action.payload };
      obs
        .connect(
          `ws://${action.payload.ipAddress}:${action.payload.port}`,
          action.payload.password
        )
        .then((result) => {
          alert(
            `Connected to server ${result.obsWebSocketVersion} (using RPC ${result.negotiatedRpcVersion})`
          );
          localStorage.setItem("ipAddress", action.payload.ipAddress);
          localStorage.setItem("password", action.payload.password);
          localStorage.setItem("port", action.payload.port.toString());
        })
        .catch((error) => {
          alert((error as Error).message);
        });
    },
    streamStateModify: (
      state,
      action: PayloadAction<OBSEventTypes["StreamStateChanged"]>
    ) => {
      state.streamState = { ...action.payload };
    },
    recordStateModify: (
      state,
      action: PayloadAction<OBSEventTypes["RecordStateChanged"]>
    ) => {
      state.recordState = { ...action.payload };
    },
  },
});

export const {
  connectionStatusModify,
  setConnectionInfo,
  streamStateModify,
  recordStateModify,
} = connectionSlice.actions;
export default connectionSlice.reducer;
