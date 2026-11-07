import type { ComponentType } from "react";
import DeterministicVsAgentDiagram from "./DeterministicVsAgentDiagram";
import BuildOrderDiagram from "./BuildOrderDiagram";
import BugsCaughtLiveDiagram from "./BugsCaughtLiveDiagram";

export const diagrams: Record<string, ComponentType> = {
  "deterministic-vs-agent": DeterministicVsAgentDiagram,
  "build-order": BuildOrderDiagram,
  "bugs-caught-live": BugsCaughtLiveDiagram
};
