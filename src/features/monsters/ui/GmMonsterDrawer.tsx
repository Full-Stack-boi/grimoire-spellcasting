import React, { useState, useEffect, useMemo } from "react";
import OBR, { Item, isImage } from "@owlbear-rodeo/sdk";
import { FaTrash, FaPen, FaLink, FaFileCode } from "react-icons/fa6";
import "./GmMonsterDrawer.scss";
import type {
  MonsterAction,
  MonsterStatblock,
  MonsterType,
} from "../domain/types";
import { startMonsterAoeAction } from "../../../effectsTool";
import {
  getAllMonsters,
  filterMonsters,
  importMonsterFromJson,
  getBoundMonsterFromToken,
  saveCustomMonster,
  getCustomMonsters,
  deleteCustomMonster,
  updateBoundMonsterOnTokens,
} from "../monsterService";
import {
  fetchDdbMonsterByUrl,
  parseDdbMonsterHtml,
} from "../ddbMonsterFetcher";
import { MonsterExportModal } from "./MonsterExportModal";
import { HomebrewMonsterModal } from "./HomebrewMonsterModal";
import { MonsterStatblockView } from "./MonsterStatblockView";
import { isMobileViewport } from "../../../components/ActionDock/domain/popover";

const MONSTER_TYPES: MonsterType[] = [
  "Aberration",
  "Beast",
  "Celestial",
  "Construct",
  "Dragon",
  "Elemental",
  "Fey",
  "Fiend",
  "Giant",
  "Humanoid",
  "Monstrosity",
  "Ooze",
  "Plant",
  "Undead",
];

const CR_OPTIONS = [
  "ALL",
  "0",
  "1/8",
  "1/4",
  "1/2",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

interface GmMonsterDrawerProps {
  onClose?: () => void;
  onCastSpell?: (spellId: string, casterTokenId?: string) => void | Promise<void>;
  isMobile?: boolean;
}

export const GmMonsterDrawer: React.FC<GmMonsterDrawerProps> = ({ onCastSpell, isMobile: propIsMobile }) => {
  // Monster Catalog State
  const [monsters, setMonsters] = useState<MonsterStatblock[]>(() => getAllMonsters());
  const [selectedMonster, setSelectedMonster] = useState<MonsterStatblock | null>(() => {
    const all = getAllMonsters();
    return all.length > 0 ? all[0] : null;
  });
  const [pendingDeleteMonster, setPendingDeleteMonster] = useState<MonsterStatblock | null>(null);
  const [deleteError, setDeleteError] = useState("");

  // Mobile Master-Detail States
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof propIsMobile === "boolean") return propIsMobile;
    if (typeof window !== "undefined") {
      return isMobileViewport(window.innerWidth);
    }
    return false;
  });
  const [mobileViewMode, setMobileViewMode] = useState<"list" | "detail">("list");

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(isMobileViewport(window.innerWidth));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter States
  const [search, setSearch] = useState("");
  const [edition, setEdition] = useState<"ALL" | "2024" | "2014">("ALL");
  const [cr, setCr] = useState<string>("ALL");
  const [monsterType, setMonsterType] = useState<string>("ALL");

  // OBR Token Selection State
  const [selectedToken, setSelectedToken] = useState<Item | null>(null);
  const [sceneTokens, setSceneTokens] = useState<Item[]>([]);
  const [targetTokenId, setTargetTokenId] = useState<string>("");

  // Modal States
  const [showImportModal, setShowImportModal] = useState(false);
  const [showHomebrewModal, setShowHomebrewModal] = useState(false);
  const [editingMonster, setEditingMonster] = useState<MonsterStatblock | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [importTab, setImportTab] = useState<"link" | "text">("link");
  const [importUrl, setImportUrl] = useState("");
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState("");

  // Listen to OBR token selection and scene items
  useEffect(() => {
    if (!OBR.isReady) return;

    const refreshTokens = async () => {
      try {
        const items = await OBR.scene.items.getItems();
        const validTokens = items.filter(
          (it) => it.layer === "CHARACTER" || (isImage(it) && it.layer !== "MAP")
        );
        setSceneTokens(validTokens);

        const selection = await OBR.player.getSelection();
        if (selection && selection.length > 0) {
          const current = validTokens.find((t) => t.id === selection[0]);
          setSelectedToken(current || null);

          // If selected token has a bound monster, offer quick sync
          if (current) {
            const bound = getBoundMonsterFromToken(current);
            if (bound) {
              setSelectedMonster(bound);
            }
          }
        } else {
          setSelectedToken(null);
        }
      } catch {}
    };

    refreshTokens();

    const unsubSelection = OBR.player.onChange(async (player) => {
      try {
        const selection = player.selection;
        if (selection && selection.length > 0) {
          const items = await OBR.scene.items.getItems([selection[0]]);
          if (items[0]) {
            setSelectedToken(items[0]);
            const bound = getBoundMonsterFromToken(items[0]);
            if (bound) {
              setSelectedMonster(bound);
            }
          }
        } else {
          setSelectedToken(null);
        }
      } catch {}
    });

    const unsubItems = OBR.scene.items.onChange((items) => {
      const validTokens = items.filter(
        (it) => it.layer === "CHARACTER" || (isImage(it) && it.layer !== "MAP")
      );
      setSceneTokens(validTokens);
      setSelectedToken((prev) => {
        if (!prev) return null;
        const fresh = validTokens.find((t) => t.id === prev.id);
        return fresh || prev;
      });
    });

    return () => {
      unsubSelection();
      unsubItems();
    };
  }, []);

  // Filtered monsters list
  const filteredMonsters = useMemo(() => {
    return filterMonsters(monsters, {
      search,
      edition,
      cr: cr === "ALL" ? undefined : cr,
      type: monsterType === "ALL" ? undefined : monsterType,
    });
  }, [monsters, search, edition, cr, monsterType]);
  const customMonsterIds = useMemo(
    () => new Set(getCustomMonsters().map((monster) => monster.id)),
    [monsters],
  );


  // Handle Link Fetch & Import
  const handleFetchUrl = async () => {
    setImportError("");
    const url = importUrl.trim();
    if (!url) {
      setImportError("Please enter a D&D Beyond monster link or slug.");
      return;
    }

    setIsFetchingUrl(true);
    try {
      const monster = await fetchDdbMonsterByUrl(url);
      saveCustomMonster(monster);
      const updated = getAllMonsters();
      setMonsters(updated);
      setSelectedMonster(monster);
      setShowImportModal(false);
      setImportUrl("");
      try {
        await OBR.notification.show(`Imported "${monster.name}" from D&D Beyond.`, "SUCCESS");
      } catch {}
    } catch (err: any) {
      setImportError(
        err.message ||
          "Failed to fetch monster from D&D Beyond. If blocked by CORS or paywall, switch to 'Paste HTML / Text' tab to paste directly."
      );
    } finally {
      setIsFetchingUrl(false);
    }
  };

  // Handle Text / HTML / JSON Import
  const handleImportTextSubmit = () => {
    setImportError("");
    const text = importJsonText.trim();
    if (!text) {
      setImportError("Please paste monster HTML or JSON text.");
      return;
    }

    let monster: MonsterStatblock | null = null;
    if (text.includes("mon-stat-block") || text.includes("<div") || text.includes("<html")) {
      monster = parseDdbMonsterHtml(text);
      if (monster) {
        saveCustomMonster(monster);
      }
    } else {
      monster = importMonsterFromJson(text);
    }

    if (!monster) {
      setImportError("Could not recognize monster format. Ensure you pasted valid D&D Beyond HTML or JSON.");
      return;
    }

    const updated = getAllMonsters();
    setMonsters(updated);
    setSelectedMonster(monster);
    setShowImportModal(false);
    setImportJsonText("");
    try {
      OBR.notification.show(`Imported "${monster.name}".`, "SUCCESS");
    } catch {}
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteMonster) return;

    try {
      deleteCustomMonster(pendingDeleteMonster.id);
      const updated = getAllMonsters();
      setMonsters(updated);
      setSelectedMonster((current) =>
        current?.id === pendingDeleteMonster.id ? updated[0] ?? null : current,
      );
      setPendingDeleteMonster(null);
      setDeleteError("");
    } catch (error) {
      console.error("Failed to remove monster from Bestiary:", error);
      setDeleteError("Could not remove this monster. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setPendingDeleteMonster(null);
    setDeleteError("");
  };

  // Pre-load sample JSON
  const handleLoadSample = () => {
    const sample = {
      name: "Goblin Shaman",
      edition: "2014",
      isLegacy: true,
      size: "Small",
      type: "Humanoid",
      subtype: "Goblinoid",
      alignment: "Neutral Evil",
      armorClass: 14,
      armorDesc: "Hide Armor",
      hitPoints: { average: 21, formula: "6d6" },
      speed: "30 ft.",
      stats: { str: 8, dex: 14, con: 11, int: 10, wis: 14, cha: 8 },
      skills: { stealth: 6 },
      senses: "Darkvision 60 ft., Passive Perception 12",
      languages: "Common, Goblin",
      challengeRating: "1",
      proficiencyBonus: 2,
      traits: [
        {
          name: "Nimble Escape",
          description: "The goblin can take Disengage or Hide as a Bonus Action.",
        },
      ],
      actions: [
        {
          id: "dagger",
          name: "Dagger",
          type: "melee_attack",
          attackBonus: 4,
          reachFeet: 5,
          damage: "1d4+2",
          damageType: "Piercing",
          description: "Melee Weapon Attack: +4 to hit, reach 5 ft. Hit: 4 (1d4+2) piercing.",
        },
        {
          id: "hex_bolt",
          name: "Hex Bolt",
          type: "ranged_attack",
          attackBonus: 4,
          rangeFeet: 60,
          damage: "2d6+2",
          damageType: "Necrotic",
          description: "Ranged Spell Attack: +4 to hit, range 60 ft. Hit: 9 (2d6+2) necrotic.",
        },
      ],
    };
    setImportJsonText(JSON.stringify(sample, null, 2));
  };


  return (
    <div className="gm-bestiary-container">
      {/* ---------------- TOP FILTER CONTROLS ---------------- */}
      <div className={`gm-bestiary-topbar ${isMobile && mobileViewMode === "detail" ? "mobile-hidden" : ""}`}>
        <div className="gm-bestiary-search-wrapper">
          <input
            type="text"
            className="gm-bestiary-search-input"
            placeholder="Search monsters, types, actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Edition Filter (ALL / 2024 / LEGACY) */}
        <div className="gm-bestiary-edition-toggle">
          <button
            type="button"
            className={`gm-edition-btn ${edition === "ALL" ? "active" : ""}`}
            onClick={() => setEdition("ALL")}
          >
            ALL
          </button>
          <button
            type="button"
            className={`gm-edition-btn e2024 ${edition === "2024" ? "active e2024" : ""}`}
            onClick={() => setEdition("2024")}
          >
            2024
          </button>
          <button
            type="button"
            className={`gm-edition-btn legacy ${edition === "2014" ? "active legacy" : ""}`}
            onClick={() => setEdition("2014")}
          >
            LEGACY
          </button>
        </div>

        {/* CR Selector */}
        <div className="gm-bestiary-filter-group">
          <select
            className="gm-bestiary-select"
            value={cr}
            onChange={(e) => setCr(e.target.value)}
          >
            {CR_OPTIONS.map((c) => (
              <option key={c} value={c}>
                CR {c}
              </option>
            ))}
          </select>

          {/* Type Selector */}
          <select
            className="gm-bestiary-select"
            value={monsterType}
            onChange={(e) => setMonsterType(e.target.value)}
          >
            <option value="ALL">All Types</option>
            {MONSTER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Homebrew & DDB Add Monster Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            className="gm-btn-import"
            onClick={() => {
              setEditingMonster(null);
              setShowHomebrewModal(true);
            }}
            style={{
              background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)",
              borderColor: "#ef4444",
              color: "#fff",
            }}
            title="Create custom Homebrew monster statblock"
          >
            + Create Homebrew
          </button>
          <button
            type="button"
            className="gm-btn-import"
            onClick={() => setShowImportModal(true)}
            title="Add monster via D&D Beyond link or copy-paste"
          >
            + Add from D&D Beyond
          </button>
        </div>
      </div>

      {/* ---------------- 2-COLUMN MAIN BODY ---------------- */}
      <div className="gm-bestiary-body">
        {/* LEFT COLUMN: LIST */}
        <div className={`gm-bestiary-list-pane ${isMobile && mobileViewMode === "detail" ? "mobile-hidden" : ""}`}>
          {isMobile && selectedMonster && mobileViewMode === "list" && (
            <div className="gm-mobile-active-preview-chip" onClick={() => setMobileViewMode("detail")}>
              <span>Viewing: <strong>{selectedMonster.name}</strong></span>
              <button type="button" className="gm-mobile-view-stat-btn">View Statblock →</button>
            </div>
          )}
          {filteredMonsters.length === 0 ? (
            <div className="gm-monster-empty-list">No monsters matching filter.</div>
          ) : (
            filteredMonsters.map((m) => {
              const isSelected = selectedMonster?.id === m.id;
              return (
                <div
                  key={m.id}
                  className={`gm-monster-list-item ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedMonster(m);
                    if (isMobile) {
                      setMobileViewMode("detail");
                    }
                  }}
                >
                  <div className="gm-monster-item-top">
                    <span className="gm-monster-item-name">{m.name}</span>
                    <div className="gm-monster-item-actions">
                      <span
                        className={`gm-badge-edition ${
                          m.isLegacy || m.edition === "2014"
                            ? "gm-badge-legacy"
                            : "gm-badge-2024"
                        }`}
                      >
                        {m.isLegacy || m.edition === "2014" ? "LEGACY" : "2024"}
                      </span>
                      {customMonsterIds.has(m.id) && (
                        <button
                          type="button"
                          className="gm-monster-edit-btn"
                          aria-label={`Edit ${m.name}`}
                          title={`Edit ${m.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setEditingMonster(m);
                            setShowHomebrewModal(true);
                          }}
                        >
                          <FaPen aria-hidden="true" />
                        </button>
                      )}
                      {customMonsterIds.has(m.id) && (
                        <button
                          type="button"
                          className="gm-monster-delete-btn"
                          aria-label={`Remove ${m.name} from Bestiary`}
                          title={`Remove ${m.name} from Bestiary`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setDeleteError("");
                            setPendingDeleteMonster(m);
                          }}
                        >
                          <FaTrash aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="gm-monster-item-meta">
                    <span>CR {m.challengeRating}</span>
                    <span>•</span>
                    <span>
                      {m.size} {m.type}
                    </span>
                  </div>
                  <div className="gm-monster-item-vitals">
                    <span>HP {m.hitPoints.average}</span>
                    <span>AC {m.armorClass}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT COLUMN: STATBLOCK DETAILS */}
        <div className={`gm-bestiary-detail-pane ${isMobile && mobileViewMode === "list" ? "mobile-hidden" : ""}`}>
          {isMobile && (
            <div
              className="gm-mobile-back-bar"
              onClick={() => setMobileViewMode("list")}
              role="button"
              tabIndex={0}
              title="Back to Monster Catalog"
            >
              <button
                type="button"
                className="gm-mobile-back-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileViewMode("list");
                }}
              >
                ← Back to Monster List
              </button>
              {selectedMonster && (
                <span className="gm-mobile-back-title">
                  {selectedMonster.name} (CR {selectedMonster.challengeRating})
                </span>
              )}
            </div>
          )}
          {selectedMonster ? (
            <MonsterStatblockView
              monster={selectedMonster}
              token={selectedToken}
              sceneTokens={sceneTokens}
              targetTokenId={targetTokenId}
              onSelectTargetTokenId={setTargetTokenId}
              onCastSpell={onCastSpell}
              onAimSaveAction={async (action: MonsterAction, casterTokenId: string) => {
                try {
                  await startMonsterAoeAction(
                    action,
                    selectedMonster.name,
                    casterTokenId,
                  );
                } catch (error) {
                  console.error("Failed to start monster area action:", error);
                  OBR.notification.show(
                    "Could not start aiming this monster area action.",
                    "ERROR",
                  );
                }
              }}
              onExport={() => setShowExportModal(true)}
              onEdit={
                selectedMonster && customMonsterIds.has(selectedMonster.id)
                  ? (m) => {
                      setEditingMonster(m);
                      setShowHomebrewModal(true);
                    }
                  : undefined
              }
              showBindControls={true}
            />
          ) : (
            <div className="gm-bestiary-empty-prompt">
              <h3>Select a monster from the catalog</h3>
              <p>Search or filter on the left to inspect statblocks and execute actions.</p>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- IMPORT DDB MODAL ---------------- */}
      {showImportModal && (
        <div className="gm-modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="gm-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="gm-modal-header">
              <h3 className="gm-modal-title">Add Monster from D&D Beyond</h3>
              <button
                type="button"
                className="gm-modal-close-btn"
                onClick={() => setShowImportModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="gm-modal-tabs">
              <button
                type="button"
                className={`gm-modal-tab-btn ${importTab === "link" ? "active" : ""}`}
                onClick={() => setImportTab("link")}
              >
                <FaLink size={12} /> Paste D&D Beyond Link (Recommended)
              </button>
              <button
                type="button"
                className={`gm-modal-tab-btn ${importTab === "text" ? "active" : ""}`}
                onClick={() => setImportTab("text")}
              >
                <FaFileCode size={12} /> Paste HTML / Text / JSON
              </button>
            </div>

            {importTab === "link" ? (
              <>
                <div className="gm-modal-subtitle">
                  Paste the monster page URL from D&D Beyond (e.g. from your Brave browser tab).
                  The full statblock, AC, HP, actions, and Legacy 2014 tags will be parsed automatically.
                </div>

                <input
                  type="text"
                  className="gm-modal-input"
                  placeholder="https://www.dndbeyond.com/monsters/16907-goblin"
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleFetchUrl();
                  }}
                />

                <div className="gm-modal-samples-row">
                  <span>Quick samples:</span>
                  <button
                    type="button"
                    className="gm-sample-chip"
                    onClick={() => setImportUrl("https://www.dndbeyond.com/monsters/16907-goblin")}
                  >
                    Goblin (2014 Legacy)
                  </button>
                  <button
                    type="button"
                    className="gm-sample-chip"
                    onClick={() => setImportUrl("https://www.dndbeyond.com/monsters/16808-beholder")}
                  >
                    Beholder (2014 Legacy)
                  </button>
                  <button
                    type="button"
                    className="gm-sample-chip"
                    onClick={() => setImportUrl("https://www.dndbeyond.com/monsters/1fef9034-e77c-473d-986c-7e505886fc24")}
                  >
                    Goblin Warrior (2024)
                  </button>
                </div>

                {importError && (
                  <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>
                    {importError}
                  </div>
                )}

                <div className="gm-modal-footer">
                  <span style={{ fontSize: 11, color: "#64748b" }}>
                    Works with any public or book monster URL
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      className="gm-modal-btn-cancel"
                      onClick={() => setShowImportModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="gm-modal-btn-submit"
                      disabled={isFetchingUrl}
                      onClick={handleFetchUrl}
                    >
                      {isFetchingUrl ? "Fetching..." : "Fetch & Add Monster"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="gm-modal-subtitle">
                  If the monster is in a private book or blocked by CORS, you can inspect/copy the statblock HTML
                  directly from your Brave tab, or paste monster JSON here.
                </div>

                <textarea
                  className="gm-modal-textarea"
                  placeholder="Paste D&D Beyond statblock HTML or JSON here..."
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                />

                {importError && (
                  <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>
                    {importError}
                  </div>
                )}

                <div className="gm-modal-footer">
                  <button
                    type="button"
                    className="gm-modal-btn-cancel"
                    onClick={handleLoadSample}
                  >
                    Load Sample JSON
                  </button>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      className="gm-modal-btn-cancel"
                      onClick={() => setShowImportModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="gm-modal-btn-submit"
                      onClick={handleImportTextSubmit}
                    >
                      Parse & Save Monster
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {pendingDeleteMonster && (
        <div
          className="gm-modal-overlay"
          onClick={() => {
            setPendingDeleteMonster(null);
            setDeleteError("");
          }}
        >
          <div
            className="gm-modal-container gm-delete-confirm"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="gm-delete-monster-title"
            aria-describedby="gm-delete-monster-description"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Escape") handleCancelDelete();
            }}
          >
            <div className="gm-modal-header">
              <h3 className="gm-modal-title" id="gm-delete-monster-title">
                Remove monster from Bestiary?
              </h3>
              <button
                type="button"
                className="gm-modal-close-btn"
                aria-label="Cancel removal"
                onClick={handleCancelDelete}
              >
                ✕
              </button>
            </div>
            <p className="gm-modal-subtitle" id="gm-delete-monster-description">
              “{pendingDeleteMonster.name}” will be removed from your saved monsters. Any
              tokens already on the board and encounter entries will remain unchanged.
            </p>
            {deleteError && (
              <div className="gm-delete-error" role="alert">
                {deleteError}
              </div>
            )}
            <div className="gm-modal-footer gm-delete-footer">
              <button
                type="button"
                className="gm-modal-btn-cancel"
                autoFocus
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="gm-modal-btn-submit gm-delete-confirm-btn"
                onClick={handleConfirmDelete}
              >
                Remove monster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- EXPORT MODAL ---------------- */}
      {showExportModal && selectedMonster && (
        <MonsterExportModal
          monster={selectedMonster}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* ---------------- HOMEBREW CREATOR / EDITOR MODAL ---------------- */}
      {showHomebrewModal && (
        <HomebrewMonsterModal
          initialMonster={editingMonster}
          onClose={() => {
            setShowHomebrewModal(false);
            setEditingMonster(null);
          }}
          onSave={async (savedMonster) => {
            const updated = getAllMonsters();
            setMonsters(updated);
            setSelectedMonster(savedMonster);
            await updateBoundMonsterOnTokens(savedMonster);
            setEditingMonster(null);
          }}
        />
      )}
    </div>
  );
};
