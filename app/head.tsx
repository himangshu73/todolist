import { Metadata } from "next";

export const metadata: Metadata = {
  title: "To Do List",
  description: "Himangshu Nath Barmon",
};

export default function Head() {
  return (
    <>
      <title>{`${metadata.title}`}</title>
      <meta name="description" content={metadata.description ?? undefined} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}
