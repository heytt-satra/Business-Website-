import * as T from "three";
import { dysonSphere } from "./constructs";
import { superIntelligence } from "./super-intelligence";
import { armoredHumanoid } from "./humanoid";
import { createSatellite } from "./satellite";

export function createSignatureModel(
  kind: string,
  root: T.Group,
): ((time: number) => void) | undefined {
  if (kind === "intelligence") return superIntelligence(root);
  if (kind === "energy") return dysonSphere(root);
  if (kind === "robotics") return armoredHumanoid(root);
  if (kind === "orbital") {
    const satellite = createSatellite();
    satellite.scale.setScalar(0.78);
    root.add(satellite);
    return (time: number) => {
      satellite.rotation.y = 0.25 + Math.sin(time * 0.12) * 0.15;
    };
  }
}
