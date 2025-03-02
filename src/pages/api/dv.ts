// dv.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fnDownloader from "@/services/ttdService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { sTiktokUrl } = req.body;
  if (!sTiktokUrl)
    return res.status(400).json({ error: "Missing TikTok URL." });

  try {
    const result = await fnDownloader(sTiktokUrl);
    if (typeof result === "string" || typeof result === "undefined") {
      return res.status(404).json({
        error:
          "Video isn't accessible. Either exceeds the time limit, is not generally accessible, or invalid URL.",
      });
    }

    return res.status(200).json({ message: "Downloaded successfully." });
  } catch {
    return res.status(500).json({
      error: "There was an error attempting to interpret your video.",
    });
  }
}
