declare interface ImportMetaEnv {
  VITE_APPID: string;
  VITE_ROOM_UUID: string;
  VITE_ROOM_TOKEN: string;
}

declare const process: {
  env: {
    NODE_ENV: "production" | undefined;
  };
};
