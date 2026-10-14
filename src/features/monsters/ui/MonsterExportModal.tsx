import React, { useState } from "react";
import "./MonsterExportModal.css";
import type { MonsterStatblock } from "../domain/types";
import {
  exportMonsterToJson,
  downloadMonsterJsonFile,
  formatMonsterForDdb,
} from "../monsterExportService";

interface MonsterExportModalProps {
  monster: MonsterStatblock;
  onClose: () => void;
}

export const MonsterExportModal: React.FC<MonsterExportModalProps> = ({
  monster,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"json" | "ddb">("json");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const jsonContent = exportMonsterToJson(monster);
  const ddbPackage = formatMonsterForDdb(monster);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="gm-modal-overlay" onClick={onClose}>
      <div className="gm-export-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="gm-export-modal-header">
          <div className="gm-export-title-group">
            <h3 className="gm-export-title">Export Monster: {monster.name}</h3>
            <span className="gm-export-badge">
              CR {monster.challengeRating} • {monster.size} {monster.type}
            </span>
          </div>
          <button type="button" className="gm-export-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="gm-export-tabs">
          <button
            type="button"
            className={`gm-export-tab-btn ${activeTab === "json" ? "active" : ""}`}
            onClick={() => setActiveTab("json")}
          >
            📦 Grimoire JSON
          </button>
          <button
            type="button"
            className={`gm-export-tab-btn ${activeTab === "ddb" ? "active" : ""}`}
            onClick={() => setActiveTab("ddb")}
          >
            🐉 D&D Beyond Homebrew
          </button>
        </div>

        {/* TAB 1: JSON EXPORT */}
        {activeTab === "json" && (
          <div className="gm-export-body">
            <div className="gm-export-description">
              Export this monster as standard Grimoire JSON. You can download the file to share with
              other DMs or import it back into any Grimoire game using the "+ Add from D&D Beyond" button.
            </div>

            <div className="gm-export-toolbar">
              <button
                type="button"
                className="gm-export-action-btn primary"
                onClick={() => downloadMonsterJsonFile(monster)}
              >
                ⬇ Download .json File
              </button>
              <button
                type="button"
                className="gm-export-action-btn"
                onClick={() => handleCopy(jsonContent, "json")}
              >
                {copiedKey === "json" ? "✓ Copied to Clipboard!" : "📋 Copy JSON"}
              </button>
            </div>

            <pre className="gm-export-code-block">{jsonContent}</pre>
          </div>
        )}

        {/* TAB 2: D&D BEYOND HOMEBREW EXPORT */}
        {activeTab === "ddb" && (
          <div className="gm-export-body">
            <div className="gm-export-ddb-banner">
              <strong>Ready for D&D Beyond!</strong> Copy formatted fields or DDB tooltip tags
              (<code>[rollable]</code>, <code>[action]</code>) directly into your{" "}
              <a
                href="https://www.dndbeyond.com/homebrew/monsters/create"
                target="_blank"
                rel="noreferrer"
                className="gm-export-link"
              >
                D&D Beyond Monster Creator
              </a>
              .
            </div>

            <div className="gm-export-toolbar">
              <button
                type="button"
                className="gm-export-action-btn primary"
                onClick={() => handleCopy(ddbPackage.fullMarkdownStatblock, "full_md")}
              >
                {copiedKey === "full_md" ? "✓ Copied Full Statblock!" : "📋 Copy Complete Statblock (Markdown)"}
              </button>
              <button
                type="button"
                className="gm-export-action-btn"
                onClick={() => handleCopy(ddbPackage.actionsTextDdb, "actions_ddb")}
              >
                {copiedKey === "actions_ddb" ? "✓ Copied Actions!" : "⚔️ Copy Actions (DDB Tags)"}
              </button>
              {ddbPackage.traitsText && (
                <button
                  type="button"
                  className="gm-export-action-btn"
                  onClick={() => handleCopy(ddbPackage.traitsText, "traits_ddb")}
                >
                  {copiedKey === "traits_ddb" ? "✓ Copied Traits!" : "✨ Copy Traits"}
                </button>
              )}
            </div>

            {/* Quick Field-by-Field Reference Cards */}
            <div className="gm-export-fields-grid">
              <div className="gm-export-field-card">
                <div className="gm-export-field-title">
                  <span>Armor Class & HP</span>
                </div>
                <div className="gm-export-field-val">
                  AC: {ddbPackage.basicFields.armorClass} ({ddbPackage.basicFields.armorDesc || "none"})
                  <br />
                  HP: {ddbPackage.basicFields.hitPointsAverage} ({ddbPackage.basicFields.hitPointsFormula})
                  <br />
                  Speed: {ddbPackage.basicFields.speed}
                </div>
              </div>

              <div className="gm-export-field-card">
                <div className="gm-export-field-title">
                  <span>Ability Scores</span>
                </div>
                <div className="gm-export-field-val">
                  STR {ddbPackage.basicFields.str} ({ddbPackage.basicFields.strMod}) • DEX {ddbPackage.basicFields.dex} ({ddbPackage.basicFields.dexMod}) • CON {ddbPackage.basicFields.con} ({ddbPackage.basicFields.conMod})
                  <br />
                  INT {ddbPackage.basicFields.int} ({ddbPackage.basicFields.intMod}) • WIS {ddbPackage.basicFields.wis} ({ddbPackage.basicFields.wisMod}) • CHA {ddbPackage.basicFields.cha} ({ddbPackage.basicFields.chaMod})
                </div>
              </div>
            </div>

            {/* Actions with DDB Tooltip Tags Preview */}
            <div className="gm-export-section-label">
              <span>Actions with D&D Beyond Rollable Tooltip Tags:</span>
              <button
                type="button"
                className="gm-export-small-copy"
                onClick={() => handleCopy(ddbPackage.actionsTextDdb, "actions_ddb_preview")}
              >
                {copiedKey === "actions_ddb_preview" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="gm-export-code-block">{ddbPackage.actionsTextDdb || "(No actions defined)"}</pre>

            {/* Full Markdown Preview */}
            <div className="gm-export-section-label">
              <span>Full Statblock Markdown:</span>
              <button
                type="button"
                className="gm-export-small-copy"
                onClick={() => handleCopy(ddbPackage.fullMarkdownStatblock, "full_md_preview")}
              >
                {copiedKey === "full_md_preview" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="gm-export-code-block">{ddbPackage.fullMarkdownStatblock}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
