import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const tauriMocks = vi.hoisted(() => ({
  getLocaleStrings: vi.fn(),
  setUiLanguage: vi.fn(),
}));

const eventMocks = vi.hoisted(() => ({
  listen: vi.fn(),
}));

vi.mock("../lib/tauri", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../lib/tauri")>()),
  ...tauriMocks,
}));
vi.mock("@tauri-apps/api/event", () => eventMocks);

import { LocaleProvider } from "../i18n/LocaleProvider";
import { buildBundle } from "../test/localeHarness";
import type { ProviderUsageSnapshot } from "../types/bridge";
import ProviderGrid from "./ProviderGrid";

function rateWindow() {
  return {
    usedPercent: 56,
    remainingPercent: 44,
    windowMinutes: null,
    resetsAt: null,
    resetDescription: null,
    isExhausted: false,
    reservePercent: null,
    reserveDescription: null,
    reserveWillLastToReset: false,
    reserveEtaSeconds: null,
  };
}

function provider(): ProviderUsageSnapshot {
  return {
    providerId: "codex",
    displayName: "Codex",
    primary: rateWindow(),
    primaryLabel: "Session",
    secondary: null,
    modelSpecific: null,
    tertiary: null,
    extraRateWindows: [],
    cost: null,
    planName: null,
    accountEmail: null,
    sourceLabel: "oauth",
    updatedAt: "2026-07-13T00:00:00Z",
    error: null,
    pace: null,
    accountOrganization: null,
    trayStatusLabel: null,
    fetchDurationMs: null,
  };
}

describe("ProviderGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    tauriMocks.getLocaleStrings.mockResolvedValue(
      buildBundle({
        PanelAllProviders: "All providers",
        PanelAllProvidersShort: "All",
      }),
    );
    eventMocks.listen.mockResolvedValue(() => {});
  });

  it("hides the all-providers entry when only one provider is available", async () => {
    const { container } = render(
      <LocaleProvider>
        <ProviderGrid
          providers={[provider()]}
          selectedProviderId="codex"
          showAsUsed={true}
          onSelect={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(await screen.findByRole("button", { name: "Codex" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "All providers" })).not.toBeInTheDocument();
    expect(container.querySelector(".provider-grid")).toHaveAttribute(
      "data-provider-count",
      "1",
    );
  });
});
