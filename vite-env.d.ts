/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_PREFIX_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  