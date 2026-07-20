import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Pedumo";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg,#04070d 0%,#08121f 40%,#0b1e34 100%)",
          color: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background: "#2563eb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 46,
              fontWeight: 800,
            }}
          >
            P
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 58,
                fontWeight: 800,
              }}
            >
              Pedumo
            </div>

            <div
              style={{
                fontSize: 24,
                opacity: .82,
              }}
            >
              Engineering Intelligence for Modern Business
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.08,
            maxWidth: 960,
          }}
        >
          AI Engineering.
          <br />
          Enterprise Software.
          <br />
          Cybersecurity.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: .75,
          }}
        >
          <div>pedumo.com</div>

          <div>AI • Cloud • Security • Automation</div>
        </div>
      </div>
    ),
    size
  );
}