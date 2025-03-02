// vpService.ts
// vp = video process
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

export default async function fnProcessVideo(
  sVideoPath: string,
): Promise<string> {
  if (!fs.existsSync(sVideoPath)) {
    return `Video file wasn't found at path ${sVideoPath}`;
  }

  const sAudioPath = sVideoPath.replace(".mp4", ".mp3");
  await fnExtractAudio(sVideoPath, sAudioPath);

  const sTranscribedText = await fnTranscribeAudio(sAudioPath);

  return sTranscribedText;
}

async function fnExtractAudio(
  sVideoPath: string,
  sAudioPath: string,
): Promise<void> {
  const sAudioDir = path.dirname(sAudioPath);
  if (!fs.existsSync(sAudioDir)) {
    fs.mkdirSync(sAudioDir, { recursive: true });
  }

  return new Promise<void>((resolve, reject) => {
    ffmpeg(sVideoPath)
      .noVideo()
      .audioCodec("libmp3lame")
      .format("mp3")
      .save(sAudioPath)
      .on("end", () => resolve())
      .on("error", () => reject(new Error(`Audio extraction failed.`)));
  });
}

async function fnTranscribeAudio(sAudioPath: string): Promise<string> {
  return `Mock transcription of the audio content. Path: ${sAudioPath}}`;
}
