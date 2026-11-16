import images from "@/data/future-media.json";
const selection: Record<string, string> = {
  fusion: "earth",
  silicon: "earth",
  bio: "earth",
  intelligence: "earth",
  quantum: "travel",
  orbital: "mars",
  propulsion: "travel",
  materials: "mars",
  energy: "earth",
  robotics: "mars",
  human: "travel",
  earth: "earth",
};
export function cosmicImage(kind: string) {
  return images.find((image) => image.id === selection[kind]) || images[0];
}
