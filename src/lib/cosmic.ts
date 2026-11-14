import images from "@/data/cosmic-media.json";
const selection: Record<string, string> = {
  fusion: "wr124",
  silicon: "wr140",
  bio: "light-echo",
  intelligence: "red-rectangle",
  quantum: "wr140",
  orbital: "light-echo",
  propulsion: "red-rectangle",
  materials: "dust-pillars",
  energy: "wr124",
  robotics: "dust-pillars",
  human: "light-echo",
  earth: "wr140",
};
export function cosmicImage(kind: string) {
  return images.find((image) => image.id === selection[kind]) || images[0];
}
