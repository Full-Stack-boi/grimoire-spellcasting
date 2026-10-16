import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ActionGridTileProps = {
    name: string;
    category: string;
    subtitle: string;
    description?: string;
    details?: string[];
    icon: React.ReactNode;
    accent: string;
    shortcut: number;
    selected?: boolean;
    disabled?: boolean;
    handBadge?: {
        type: "main" | "offhand";
        label: string;
        onClick?: () => void;
    };
    actionBadge?: {
        label: string;
        title?: string;
        onClick?: () => void;
        className?: string;
    };
    badgeText?: string;
    badgeClass?: string;
    onActivate: () => void;
    onContextMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type ActionGridTooltipData = Pick<ActionGridTileProps, "name" | "category" | "subtitle" | "description" | "details" | "icon" | "accent">;
type ActionGridTooltipState = ActionGridTooltipData & { id: string; left: number; top: number };
type ActionGridTooltipContextValue = {
    activeId: string | null;
    showTooltip: (id: string, event: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>, data: ActionGridTooltipData) => void;
    scheduleTooltipClose: () => void;
    keepTooltipOpen: () => void;
    hideTooltip: () => void;
};

const ActionGridTooltipContext = React.createContext<ActionGridTooltipContextValue | null>(null);

export const ActionGridTooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tooltip, setTooltip] = useState<ActionGridTooltipState | null>(null);
    const showTimer = useRef<number | undefined>(undefined);
    const hideTimer = useRef<number | undefined>(undefined);
    const activeTileIdRef = useRef<string | null>(null);

    const clearTimers = () => {
        if (showTimer.current !== undefined) {
            window.clearTimeout(showTimer.current);
            showTimer.current = undefined;
        }
        if (hideTimer.current !== undefined) {
            window.clearTimeout(hideTimer.current);
            hideTimer.current = undefined;
        }
    };

    const keepTooltipOpen = () => {
        if (hideTimer.current !== undefined) {
            window.clearTimeout(hideTimer.current);
            hideTimer.current = undefined;
        }
    };

    const hideTooltip = () => {
        clearTimers();
        activeTileIdRef.current = null;
        setTooltip(null);
    };

    const scheduleTooltipClose = () => {
        if (showTimer.current !== undefined) {
            window.clearTimeout(showTimer.current);
            showTimer.current = undefined;
        }
        activeTileIdRef.current = null;
        hideTimer.current = window.setTimeout(() => {
            setTooltip(null);
            hideTimer.current = undefined;
        }, 120);
    };

    const calculatePosition = (targetEl: HTMLElement, width: number, estimatedHeight: number) => {
        const rect = targetEl.getBoundingClientRect();
        const gridPane = targetEl.closest(".ddb-bg3-grid-pane") ?? targetEl.closest(".ddb-action-content-workspace");
        const containerRect = gridPane ? gridPane.getBoundingClientRect() : null;

        const minLeft = containerRect ? Math.max(8, containerRect.left) : 8;
        const maxRight = containerRect ? Math.min(window.innerWidth - 8, containerRect.right) : window.innerWidth - 8;
        const minTop = containerRect ? Math.max(8, containerRect.top) : 8;
        const maxBottom = containerRect ? Math.min(window.innerHeight - 8, containerRect.bottom) : window.innerHeight - 8;

        const actualWidth = Math.min(width, Math.max(180, maxRight - minLeft));
        const gap = 8;

        // Try placing above if there is sufficient room
        const aboveTop = rect.top - estimatedHeight - gap;
        if (aboveTop >= minTop) {
            const left = Math.max(minLeft, Math.min(rect.left + rect.width / 2 - actualWidth / 2, maxRight - actualWidth));
            return { left, top: aboveTop };
        }

        // Try placing right of the tile if space permits in container
        const rightSpace = maxRight - rect.right - gap;
        const leftSpace = rect.left - minLeft - gap;
        let left: number;
        if (rightSpace >= actualWidth || rightSpace >= leftSpace) {
            left = Math.max(minLeft, Math.min(rect.right + gap, maxRight - actualWidth));
        } else {
            left = Math.max(minLeft, rect.left - actualWidth - gap);
        }

        // Align with top of tile, clamped within container
        const top = Math.max(minTop, Math.min(rect.top, maxBottom - estimatedHeight));
        return { left, top };
    };

    const showTooltip: ActionGridTooltipContextValue["showTooltip"] = (id, event, data) => {
        if (hideTimer.current !== undefined) {
            window.clearTimeout(hideTimer.current);
            hideTimer.current = undefined;
        }

        const targetEl = event.currentTarget;
        activeTileIdRef.current = id;

        const applyTooltip = () => {
            if (activeTileIdRef.current !== id) return;
            const width = 260;
            const estimatedHeight = 125;
            const { left, top } = calculatePosition(targetEl, width, estimatedHeight);
            setTooltip({ ...data, id, left, top });
        };

        // If a tooltip is already visible, switch immediately (responsive browsing across adjacent tiles)
        if (tooltip) {
            if (showTimer.current !== undefined) {
                window.clearTimeout(showTimer.current);
                showTimer.current = undefined;
            }
            applyTooltip();
        } else {
            // First hover: debounce with 180ms hover intent delay so accidental cursor sweeps don't flash
            if (showTimer.current !== undefined) {
                window.clearTimeout(showTimer.current);
            }
            showTimer.current = window.setTimeout(() => {
                showTimer.current = undefined;
                applyTooltip();
            }, 180);
        }
    };

    useEffect(() => () => clearTimers(), []);

    const contextValue: ActionGridTooltipContextValue = {
        activeId: tooltip?.id ?? null,
        showTooltip,
        scheduleTooltipClose,
        keepTooltipOpen,
        hideTooltip,
    };

    return (
        <ActionGridTooltipContext.Provider value={contextValue}>
            {children}
            {tooltip && createPortal(
                <div
                    id={tooltip.id}
                    className="ddb-bg3-grid-tooltip"
                    role="tooltip"
                    style={{ left: tooltip.left, top: tooltip.top }}
                >
                    <div className="ddb-bg3-grid-tooltip-header">
                        <div>
                            <div className="ddb-bg3-grid-tooltip-title">{tooltip.name}</div>
                            <div className="ddb-bg3-grid-tooltip-subtitle">{tooltip.category} · {tooltip.subtitle}</div>
                        </div>
                        <span className="ddb-bg3-grid-tooltip-icon" style={{ color: tooltip.accent, borderColor: tooltip.accent }}>{tooltip.icon}</span>
                    </div>
                    {tooltip.details && tooltip.details.length > 0 && <div className="ddb-bg3-grid-tooltip-details">{tooltip.details.join(" · ")}</div>}
                    {tooltip.description && <div className="ddb-bg3-grid-tooltip-description">{tooltip.description}</div>}
                    <div className="ddb-bg3-grid-tooltip-hint">Right-click for details</div>
                </div>,
                document.body
            )}
        </ActionGridTooltipContext.Provider>
    );
};

export const ActionGridTile: React.FC<ActionGridTileProps> = ({
    name,
    category,
    subtitle,
    description,
    details = [],
    icon,
    accent,
    shortcut,
    selected = false,
    disabled = false,
    handBadge,
    actionBadge,
    badgeText,
    badgeClass,
    onActivate,
    onContextMenu,
}) => {
    const tooltip = React.useContext(ActionGridTooltipContext);
    const tooltipId = React.useId();

    return (
        <button
            type="button"
            className={`ddb-bg3-icon-tile ${selected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
            style={{ "--tile-accent": accent } as React.CSSProperties}
            aria-label={`${name}, ${category}`}
            aria-describedby={tooltip?.activeId === tooltipId ? tooltipId : undefined}
            aria-pressed={selected}
            aria-disabled={disabled}
            disabled={disabled}
            onMouseEnter={event => tooltip?.showTooltip(tooltipId, event, { name, category, subtitle, description, details, icon, accent })}
            onMouseLeave={() => tooltip?.scheduleTooltipClose()}
            onFocus={event => tooltip?.showTooltip(tooltipId, event, { name, category, subtitle, description, details, icon, accent })}
            onBlur={() => tooltip?.scheduleTooltipClose()}
            onClick={disabled ? undefined : () => {
                tooltip?.hideTooltip();
                onActivate();
            }}
            onContextMenu={disabled ? undefined : (event) => {
                tooltip?.hideTooltip();
                onContextMenu?.(event);
            }}
        >
            <span className="ddb-bg3-icon-tile-shortcut" aria-hidden="true">{shortcut}</span>
            <span className="ddb-bg3-icon-tile-art" aria-hidden="true">{icon}</span>
            {selected && <span className={`ddb-bg3-icon-tile-selected ${handBadge ? "with-hand-badge" : ""}`} aria-hidden="true">✓</span>}
            {handBadge && (
                <span
                    className={`ddb-bg3-tile-hand-badge ${handBadge.type}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handBadge.onClick?.();
                    }}
                    onContextMenu={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handBadge.onClick?.();
                    }}
                    title={`${handBadge.type === "main" ? "Main Hand" : "Off Hand"} - Click or Right-click to Swap Hands`}
                >
                    {handBadge.label}
                </span>
            )}
            {actionBadge && (
                <span
                    className={`ddb-bg3-tile-action-badge ${actionBadge.className || ""}`}
                    onClick={(e) => {
                        if (actionBadge.onClick) {
                            e.stopPropagation();
                            e.preventDefault();
                            actionBadge.onClick();
                        }
                    }}
                    title={actionBadge.title || actionBadge.label}
                >
                    {actionBadge.label}
                </span>
            )}
            {badgeText && !handBadge && (
                <span className={`ddb-bg3-tile-pill-badge ${badgeClass || ""}`}>
                    {badgeText}
                </span>
            )}
        </button>
    );
};
