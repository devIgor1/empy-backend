import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  target: "node16",
  format: ["cjs"],
  splitting: false,
  clean: true,
  dts: false,
  onSuccess: "prisma generate",
  external: ["@prisma/client", ".prisma/client", "prisma"],
})
