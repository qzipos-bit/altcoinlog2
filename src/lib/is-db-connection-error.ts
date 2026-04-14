import { Prisma } from "@prisma/client";

/** True when Prisma cannot reach the database (dev without Postgres, etc.). */
export function isDatabaseConnectionError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) return true;
  if (error instanceof Prisma.PrismaClientRustPanicError) return true;
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P1001"
  ) {
    return true;
  }
  return false;
}
