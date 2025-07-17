import { defineConfig } from "tsup"
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin"

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  target: "node16",
  format: ["cjs"],
  splitting: false,
  clean: true,
  dts: false,
  plugins: [new PrismaPlugin()],
})
