import type { ComponentType } from "react";
import DeterministicVsAgentDiagram from "./DeterministicVsAgentDiagram";
import BuildOrderDiagram from "./BuildOrderDiagram";
import BugsCaughtLiveDiagram from "./BugsCaughtLiveDiagram";
import GatingTiersDiagram from "./GatingTiersDiagram";
import ClosingGapsDiagram from "./ClosingGapsDiagram";
import FiveReviewersDiagram from "./FiveReviewersDiagram";
import ReviewToExperimentDiagram from "./ReviewToExperimentDiagram";
import OlympusProcessDiagram from "./OlympusProcessDiagram";
import ObjectionLedgerDiagram from "./ObjectionLedgerDiagram";
import ScopeBeforeAfterDiagram from "./ScopeBeforeAfterDiagram";
import TokensSwatchDiagram from "./TokensSwatchDiagram";
import OneSystemFourPlacesDiagram from "./OneSystemFourPlacesDiagram";
import PivotTimelineDiagram from "./PivotTimelineDiagram";
import PivotScorecardDiagram from "./PivotScorecardDiagram";
import WorkaroundsDiagram from "./WorkaroundsDiagram";
import InterviewFlowDiagram from "./InterviewFlowDiagram";
import SpecStructureDiagram from "./SpecStructureDiagram";
import HandoffDiagram from "./HandoffDiagram";
import EvidenceToDiagnosisDiagram from "./EvidenceToDiagnosisDiagram";
import DashboardStatusDiagram from "./DashboardStatusPanel";
import OpenIssuesDiagram from "./OpenIssuesDiagram";
import EarlyWarningDiagram from "./EarlyWarningDiagram";
import BeforeAfterSampleDataDiagram from "./BeforeAfterSampleDataDiagram";
import TriageFixProposalDiagram from "./TriageFixProposalDiagram";

export const diagrams: Record<string, ComponentType> = {
  "deterministic-vs-agent": DeterministicVsAgentDiagram,
  "build-order": BuildOrderDiagram,
  "bugs-caught-live": BugsCaughtLiveDiagram,
  "gating-tiers": GatingTiersDiagram,
  "closing-gaps": ClosingGapsDiagram,
  "five-reviewers": FiveReviewersDiagram,
  "review-to-experiment": ReviewToExperimentDiagram,
  "olympus-process": OlympusProcessDiagram,
  "objection-ledger": ObjectionLedgerDiagram,
  "scope-before-after": ScopeBeforeAfterDiagram,
  "tokens-swatch": TokensSwatchDiagram,
  "one-system-four-places": OneSystemFourPlacesDiagram,
  "pivot-timeline": PivotTimelineDiagram,
  "pivot-scorecard": PivotScorecardDiagram,
  workarounds: WorkaroundsDiagram,
  "interview-flow": InterviewFlowDiagram,
  "spec-structure": SpecStructureDiagram,
  handoff: HandoffDiagram,
  "evidence-to-diagnosis": EvidenceToDiagnosisDiagram,
  "dashboard-status": DashboardStatusDiagram,
  "open-issues": OpenIssuesDiagram,
  "early-warning": EarlyWarningDiagram,
  "before-after-sample-data": BeforeAfterSampleDataDiagram,
  "triage-fix-proposal": TriageFixProposalDiagram
};
