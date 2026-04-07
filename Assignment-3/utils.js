import fs from "fs/promises";

export const readFile = async () => {
  return JSON.parse(await fs.readFile("./users.data.json", "utf-8"));
};

export const writeFile = async ({ data }) => {
  await fs.writeFile(
    "./users.data.json",
    typeof data == "string" ? data : JSON.stringify(data),
  );
};
