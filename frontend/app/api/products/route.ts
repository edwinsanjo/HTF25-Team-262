import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "products.json");

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const time = formData.get("time") as string;

    let imageUrl = "";
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "-" + file.name.replace(/\s/g, "_");
      const imagePath = path.join(process.cwd(), "public", "uploads", filename);
      await fs.writeFile(imagePath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const newProduct = {
      id: Date.now(),
      description,
      location,
      time,
      imageUrl,
    };

    let products = [];
    if (await fileExists(dataFilePath)) {
        const fileContents = await fs.readFile(dataFilePath, "utf-8");
        if (fileContents) {
            products = JSON.parse(fileContents);
        }
    }

    products.push(newProduct);

    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ message: "Product added successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Failed to save product:", error);
    return NextResponse.json({ message: "Failed to save product." }, { status: 500 });
  }
}
