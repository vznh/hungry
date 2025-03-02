// index.tsx
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [sUrl, setSUrl] = useState<string>("");
  const [sRes, setSRes] = useState<string>("");
  const [bIsLoading, setBIsLoading] = useState<boolean>(false);

  const fnHandleConvert = async () => {
    setBIsLoading(true);
    setSRes("");

    try {
      const response = axios.post("/api/dv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sTiktokUrl: sUrl }),
      });

      const data = (await response).data;
      if (data.error) {
        setSRes(
          "Error attempting to get a result from the API. Could be too overloaded.",
        );
      } else {
        setSRes(data.recipe || data.message);
      }
    } catch {
      setSRes("Error connecting to the API.");
    }

    setBIsLoading(false);
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div>
        <p>
          {bIsLoading ? (
            <pre className="whitespace-pre-wrap break-words text-sm">
              Your recipe is being chefed up..
            </pre>
          ) : (
            sRes && (
              <pre className="whitespace-pre-wrap break-words text-sm">
                {sRes}
              </pre>
            )
          )}
        </p>
      </div>
      <div className="p-5 border-l border-dashed border-black flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold">hungry?</h1>
          <div className="mt-2">
            <input
              type="text"
              className="border border-black mr-2 w-[350px] text-md"
              placeholder="https://www.tiktok.com/@username/video/1234567890123456789"
              value={sUrl}
              onChange={(e) => setSUrl(e.target.value)}
            />
          </div>
          <button onClick={fnHandleConvert} className="text-base pr-2">
            Convert
          </button>
          <a
            href="https://github.com/vznh/hungry/instructions.md"
            className="text-gray-500 text-md hover:underline pr-2"
          >
            Instructions
          </a>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex">
            <p className="text-gray-500 pr-2">1</p>
            <a
              href="https://github.com/vznh/hungry"
              className="text-gray-500 text-md hover:underline pr-2"
            >
              GitHub
            </a>
            <a
              href="https://github.com/vznh/hungry/tos.md"
              className="text-gray-500 text-md hover:underline pr-2"
            >
              Terms of Service
            </a>
            <a
              href="https://github.com/vznh/hungry/usage.md"
              className="text-gray-500 text-md hover:underline pr-2"
            >
              Usage
            </a>
          </div>
          <a
            href="https://hobin.dev"
            className="text-gray-500 text-md hover:underline pr-2"
          >
            Son
          </a>
        </div>
      </div>
    </div>
  );
}
