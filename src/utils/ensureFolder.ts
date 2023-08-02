import { access, mkdir } from "fs/promises";

export async function ensureFolder(path: string) {
  const safePath = path.replace("~", "").replaceAll(/\.\.\//g, "");
  try {
    await access(safePath);
  } catch {
    try {
      await mkdir(safePath, { recursive: true });
    } catch (err) {
      console.error("Failed to ensure folder for path:\n", safePath, "\n", err);
    }
  }
  return safePath;
}
