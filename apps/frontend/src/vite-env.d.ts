/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FRONTEND_SERVER_PORT: string;
  readonly VITE_FRONTEND_PREVIEW_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
