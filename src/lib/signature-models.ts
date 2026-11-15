import * as T from "three";
import { intelligenceConstruct, dysonSphere } from "./constructs";
import { armoredHumanoid } from "./humanoid";

export function createSignatureModel(
  kind: string,
  root: T.Group,
): ((time: number) => void) | undefined {
  if (kind === "intelligence") return intelligenceConstruct(root);
  if (kind === "energy") return dysonSphere(root);
  if (kind === "robotics") return armoredHumanoid(root);
}
