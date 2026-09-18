import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Techaro: Creators of Anubis. Defenders of the web.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const asset = (name: string) => readFile(join(process.cwd(), "assets", name));
  const [podkova, schibsted, anubis, logo] = await Promise.all([
    asset("podkova-700.woff"),
    asset("schibsted-grotesk-400.woff"),
    asset("anubis-happy.png"),
    readFile(join(process.cwd(), "public/img/logo_waffle.svg")),
  ]);
  const dataURI = (mime: string, buf: Buffer) =>
    `data:${mime};base64,${buf.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        background: "#0c0c0f",
        color: "#f0f0f2",
        fontFamily: "Schibsted Grotesk",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img
            src={dataURI("image/svg+xml", logo)}
            width={64}
            height={64}
            alt=""
          />
          <span style={{ fontFamily: "Podkova", fontSize: 48 }}>Techaro</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
            fontFamily: "Podkova",
            fontSize: 64,
            lineHeight: 1.1,
          }}
        >
          <span>Creators of Anubis.</span>
          <span style={{ color: "#d4a017" }}>Defenders of the web.</span>
        </div>
        <span style={{ marginTop: 32, fontSize: 28, color: "#9a9aa8" }}>
          Open-source bot protection, AI consultancy, and custom software.
        </span>
      </div>
      <img src={dataURI("image/png", anubis)} width={340} height={340} alt="" />
    </div>,
    {
      ...size,
      fonts: [
        { name: "Podkova", data: podkova, weight: 700, style: "normal" },
        {
          name: "Schibsted Grotesk",
          data: schibsted,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
