/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_IMAGE_PATH: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
