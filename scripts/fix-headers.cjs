const fs = require("fs");

const file = ".open-next/assets/_headers";

if (fs.existsSync(file)) {
  let text = fs.readFileSync(file, "utf8");

  // Remove every /* ... */ comment block
  text = text.replace(/\/\*[\s\S]*?\*\//g, "").trim();

  fs.writeFileSync(file, text);

  console.log("✔ Cleaned generated _headers");
} else {
  console.log("_headers file not found.");
}