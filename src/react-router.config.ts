import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode - no server required, works with static hosting (Vercel, etc.)
  ssr: false,
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
