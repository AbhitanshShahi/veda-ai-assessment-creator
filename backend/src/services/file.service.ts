import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractTextFromFile(
  fileBuffer: Buffer,
  mimeType: string,
) {
  if (mimeType === "application/pdf") {
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(fileBuffer),
    }).promise;

    let extractedText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const textContent = await page.getTextContent();

      const pageText = textContent.items.map((item: any) => item.str).join(" ");

      extractedText += pageText + "\n";
    }

    return extractedText;
  }

  if (mimeType === "text/plain") {
    return fileBuffer.toString("utf-8");
  }

  throw new Error("Unsupported file type");
}
