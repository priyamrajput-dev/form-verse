import { z } from "zod";

const envSchema = z.object({
    JWT_SCERET: z.string().describe("Sceret key for JWT Token")
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) throw new Error(safeParseResult.error.message);
  return safeParseResult.data;
}

export const env = createEnv(process.env);
