import { useState } from "react";
import Button from "../UI/Button";
import InputField from "../UI/InputField";

export default function UrlShortenerPage() {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const generateShortCode = () =>
    Math.random().toString(36).substring(2, 8);

  const handleShorten = () => {
    if (!url) return;

    const newLink = {
      id: Date.now(),
      originalUrl: url,
      shortUrl: `https://sho.rt/${generateShortCode()}`,
      clicks: 0,
    };

    setLinks([newLink, ...links]);
    setUrl("");
  };

  const handleVisit = (id) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? { ...link, clicks: link.clicks + 1 }
          : link
      )
    );
  };

  return (
    <div className="min-h-full flex bg-slate-50">
      {/* LEFT SIDE - URL SHORTENER */}
      <div className="w-4/10 m-4 p-10 flex flex-col justify-center bg-white rounded-md">
        <div className="w-full max-w-[75%] mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black">URL Shortener</h1>

          <InputField
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a long URL..."
            marginBottom={4}
          />

          <Button onClick={handleShorten} variant="primary" marginBottom={6}>
            Shorten URL
          </Button>

          {links.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3 text-black">
                Recently Generated
              </h2>

              {links.slice(0, 3).map((link) => (
                <div
                  key={link.id}
                  className="border rounded-lg p-4 mb-3 flex justify-between items-center"
                >
                  <span className="text-blue-600 truncate">
                    {link.shortUrl}
                  </span>

                  <Button
                    onClick={() => navigator.clipboard.writeText(link.shortUrl)}
                    variant="secondary"
                    style="box"
                    stretch={false}
                    textSize="sm"
                    size="small"
                  >
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - CLICK TRACKING */}
      <div className="w-6/10 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">Click Analytics</h1>

        {links.length === 0 ? (
          <p className="text-gray-500">
            No links generated yet.
          </p>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-white p-5 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Original URL
                </p>
                <p className="truncate mb-3 text-black font-medium">{link.originalUrl}</p>

                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => handleVisit(link.id)}
                    variant="primary"
                    style="box"
                    stretch={false}
                    textSize="sm"
                    size="small"
                  >
                    {link.shortUrl}
                  </Button>

                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {link.clicks} clicks
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
