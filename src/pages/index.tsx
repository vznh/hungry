// index.tsx

export default function Home() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div>{/* Left column - empty */}</div>
      <div className="p-5 border-l border-dashed border-black flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold">hungry?</h1>
          <div className="mt-2">
            <input
              type="text"
              className="border border-black mr-2 w-[300px] text-sm"
              placeholder="https://www.tiktok.com/@username/video/1234567890123456789"
            />
            <button className="text-base">Convert</button>
          </div>
        </div>
        <div className="flex">
          <p className="text-gray-500 pr-2">1</p>
          <a
            href="https://github.com/vznh/hungry"
            className="text-gray-500 text-md hover:underline pr-2"
          >
            GitHub
          </a>
          <a
            href="https://github.com/vznh/hungry"
            className="text-gray-500 text-md hover:underline pr-2"
          >
            Terms of Service
          </a>
          <a
            href="https://github.com/vznh/hungry"
            className="text-gray-500 text-md hover:underline pr-2"
          >
            Usage
          </a>
        </div>
      </div>
    </div>
  );
}
