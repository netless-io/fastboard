/* eslint-disable @typescript-eslint/no-explicit-any */

declare interface ImportMeta {
  url: string;

  readonly hot?: {
    readonly data: any;

    accept(): void;
    accept(cb: (mod: any) => void): void;
    accept(dep: string, cb: (mod: any) => void): void;
    accept(deps: readonly string[], cb: (mods: any[]) => void): void;

    /**
     * @deprecated
     */
    acceptDeps(): never;

    dispose(cb: (data: any) => void): void;
    decline(): void;
    invalidate(): void;
  };

  readonly env: ImportMetaEnv;

  glob(pattern: string): Record<
    string,
    () => Promise<{
      [key: string]: any;
    }>
  >;

  globEager(pattern: string): Record<
    string,
    {
      [key: string]: any;
    }
  >;
}

declare interface ImportMetaEnv {
  [key: string]: string | boolean | undefined;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
}

declare interface ImportMetaEnv {
  VITE_APPID: string;
  VITE_ROOM_UUID: string;
  VITE_ROOM_TOKEN: string;
}
