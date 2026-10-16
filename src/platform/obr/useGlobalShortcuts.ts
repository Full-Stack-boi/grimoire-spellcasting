import { useEffect } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { toggleActionDock } from "../../components/ActionDock/domain/popover";
import { toggleDDBRollLogPopover } from "../../services/rollLogService";
import {
    clearAllTargets,
    stopAiming,
    toolMetadataMonsterAoeAction,
    toolMetadataSelectedSpell
} from "../../effectsTool";
import { openSpellDetailModal } from "../../views/SpellDetailModal";
import { spellPopoverId } from "../../views/SpellSelectionPopover";
import {
    focusCameraOnToken,
    getMyPrimaryCharacterToken
} from "../../features/player/playerCharacterService";
import { calculateResponsivePopoverDimensions } from "../../utils/popoverSizing";

export function useGlobalShortcuts() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const activeEl = document.activeElement;
            const isEditing =
                activeEl instanceof HTMLInputElement ||
                activeEl instanceof HTMLTextAreaElement ||
                activeEl instanceof HTMLSelectElement ||
                Boolean((activeEl as HTMLElement)?.isContentEditable);

            // Escape always works, even when an input has focus
            if (e.key === "Escape") {
                if (isEditing) {
                    (activeEl as HTMLElement)?.blur();
                }
                // Check if currently aiming or has a spell selected
                OBR.player.getMetadata().then((metadata) => {
                    const selectedSpell = metadata?.[toolMetadataSelectedSpell];
                    const monsterAoe = metadata?.[toolMetadataMonsterAoeAction];
                    if (selectedSpell || monsterAoe) {
                        void stopAiming();
                    }
                }).catch(() => {});
                return;
            }

            // Do not intercept keystrokes while user is typing in form inputs
            if (isEditing) {
                return;
            }

            // Disallow modifier combinations like Ctrl+C, Alt+Tab, etc.
            if (e.ctrlKey || e.altKey || e.metaKey) {
                return;
            }

            const key = e.key.toLowerCase();

            // Shift+C: Activate tool & toggle Action Dock
            if (key === "c" && e.shiftKey) {
                e.preventDefault();
                void toggleActionDock();
                return;
            }

            // C without Shift: Focus camera on primary token
            if (key === "c" && !e.shiftKey) {
                e.preventDefault();
                OBR.player.getId().then((playerId) => {
                    if (playerId) {
                        getMyPrimaryCharacterToken(playerId).then((primary) => {
                            if (primary) {
                                void focusCameraOnToken(primary.id);
                            }
                        }).catch(() => {});
                    }
                }).catch(() => {});
                return;
            }

            // B: Toggle Action Dock
            if (key === "b" && !e.shiftKey) {
                e.preventDefault();
                void toggleActionDock();
                return;
            }

            // L: Toggle Game Roll Log
            if (key === "l" && !e.shiftKey) {
                e.preventDefault();
                void toggleDDBRollLogPopover();
                return;
            }

            // .: Open / Toggle Spell Selection Popover
            if (e.key === "." && !e.shiftKey) {
                e.preventDefault();
                OBR.popover.getHeight(spellPopoverId).then((h) => {
                    if (typeof h === "number" && h > 0) {
                        void OBR.popover.close(spellPopoverId);
                        return;
                    }
                    Promise.all([OBR.viewport.getWidth(), OBR.viewport.getHeight()]).then(([vw, vh]) => {
                        const dims = calculateResponsivePopoverDimensions(vw || 1440, vh || 900, 760, 440);
                        const searchParams = new URLSearchParams(window.location.search || "");
                        searchParams.delete("view");
                        searchParams.delete("mode");
                        searchParams.delete("dockHeight");
                        searchParams.delete("obrref");
                        const searchStr = searchParams.toString() ? `?${searchParams.toString()}` : "";
                        void OBR.popover.open({
                            id: spellPopoverId,
                            width: dims.width,
                            height: dims.height,
                            url: `${window.location.origin}/spell-selection-popover${searchStr}`,
                            hidePaper: true,
                        });
                    }).catch(() => {});
                }).catch(() => {});
                return;
            }

            // I: Spell Info for currently selected spell
            if (key === "i" && !e.shiftKey) {
                e.preventDefault();
                OBR.player.getMetadata().then((metadata) => {
                    const selectedSpell = metadata?.[toolMetadataSelectedSpell] as string | undefined;
                    if (selectedSpell) {
                        openSpellDetailModal(selectedSpell);
                    } else {
                        void OBR.notification.show("No spell currently selected. Select a spell first (press . or B).", "INFO");
                    }
                }).catch(() => {});
                return;
            }

            // X: Clear target highlights
            if (key === "x" && !e.shiftKey) {
                e.preventDefault();
                void clearAllTargets();
                return;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
}
