const fSign = "ےطےà";
const buffers = {
    "utf8": Buffer.from(fSign, "utf8"),
    "utf16le": Buffer.from(fSign, "utf16le"),
    "binary": Buffer.from(fSign, "binary"),
    "hex": Buffer.from(fSign, "hex")
};

console.log("مقادیر باینری بر اساس انکدینگ:");
for (const [encoding, buffer] of Object.entries(buffers)) {
    console.log(`${encoding}:`, buffer.toString("hex"));
}
