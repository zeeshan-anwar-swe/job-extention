// src/env.d.ts
interface ImportMetaEnv {
	readonly VITE_SERVER_PREFIX_URL: string;
	readonly VITE_API_BASE_URL: string;
	readonly VITE_API_BASE: string;
	readonly VITE_STRIP_PUBLIC_kEY: string;
	// Add other environment variables here...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
