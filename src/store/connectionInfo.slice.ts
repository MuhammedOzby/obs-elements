import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import obs from "../lib/obs-interface";

export interface ConnectionState {
  connectionStatus: boolean;
  ipAddress: string;
  password: string;
  port: number;
}

const initialState: ConnectionState = {
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
  },
});

export const { connectionStatusModify, setConnectionInfo } =
  connectionSlice.actions;
export default connectionSlice.reducer;
