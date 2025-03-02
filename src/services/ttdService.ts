// ttdService.ts
// ttd = TikTok Download
/*
 * Utilizes ytdlp-nodejs to accept a TikTok URL by checking if it's valid, then downloading it.
 */
import { download } from "ytdlp-nodejs";
import path from "path";
import fs from "fs";

export default async function fnDownloader(
  sTiktokUrl: string,
  sFilename = "dl.mp4",
): Promise<string | boolean | undefined> {
  // think we need checks?
  //
  // let rMetadata;
  //
  // try {
  //   rMetadata = await info({ url: sTiktokUrl });
  // } catch {
  //   return "Not accessible.";
  // }

  // if (
  //   rMetadata?.duration &&
  //   rMetadata.duration > 240 &&
  //   rMetadata.duration < 7
  // ) {
  //   return "Video is too short, long, or is generally inaccessible.";
  // }
  //

  const sTempDir = path.resolve(process.cwd(), "temp");
  if (!fs.existsSync(sTempDir)) {
    fs.mkdirSync(sTempDir, { recursive: true });
  }

  const sOutputDir = {
    outDir: sTempDir,
    fileName: sFilename,
  };

  // temporarily, just store within client files
  try {
    download(sTiktokUrl, {
      filter: "mergevideo",
      quality: "720p",
      output: sOutputDir,
    });

    return true;
  } catch (err) {
    return (
      "Download failed. A more detailed error output: " + (err as Error).message
    );
  }
}
