/** Reusable types for all article templates. */

export interface TopicVariation {
  title: string;
  code: string;
}

/**
 * A single topic / item rendered as a card + modal.
 * Field names match the dominant pattern across existing articles.
 * The `category` field doubles as the badge / grouping key.
 */
export interface TopicItem {
  name: string;
  /** Grouping / badge value — category name, version string, etc. */
  category: string;
  description: string;
  /** Primary code/summary block shown in the modal. */
  syntax: string;
  /** Secondary info block — "Notes", "Arguments", etc. */
  notes: string;
  /** Tertiary info block — "Returns", "Outcome", etc. */
  returns: string;
  variations: TopicVariation[];
}

/** Labels shown in the modal sections — customise per article. */
export interface ModalLabels {
  syntax: string;
  detail: string;
  returns: string;
  variations: string;
}

/** Default label presets for quick configuration. */
export const CODE_LABELS: ModalLabels = {
  syntax: "Syntax",
  detail: "Notes",
  returns: "Returns",
  variations: "Examples",
};

export const UX_LABELS: ModalLabels = {
  syntax: "Summary",
  detail: "Notes",
  returns: "Outcome",
  variations: "Examples",
};

export const API_LABELS: ModalLabels = {
  syntax: "Syntax",
  detail: "Arguments",
  returns: "Returns",
  variations: "Variations / Usage",
};
