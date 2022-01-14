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

declare module "rc-slider" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export default null as any;
}
