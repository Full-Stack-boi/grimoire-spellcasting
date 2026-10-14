import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import OBR from "@owlbear-rodeo/sdk";
import {
    actionDockPopoverId,
    DOCK_SAVED_HEIGHT_KEY,
    getSavedDockHeight,
    RESOURCE_TRAY_FLOAT_HEIGHT,
} from "../domain/popover";
import {
    calculateMaxDockPanelHeight,
    calculateDockPanelHeight,
} from "../domain/dockSizing";
import { startDockResizePointerSession } from "./dockResizePointerSession";

export function useDockSizing() {
    const resizeSessionCleanupRef = useRef<(() => void) | null>(null);
    const [panelHeight, setPanelHeight] = useState<number | null>(() => {
        const savedHeight = getSavedDockHeight();
        if (savedHeight) return savedHeight;
        const requestedHeight = Number(new URLSearchParams(window.location.search).get("dockHeight"));
        return Number.isFinite(requestedHeight) && requestedHeight >= 200 && requestedHeight <= 900
            ? requestedHeight
            : null;
    });
    const [isDraggingHeight, setIsDraggingHeight] = useState(false);

    useEffect(() => () => {
        resizeSessionCleanupRef.current?.();
    }, []);

    const savePanelHeight = (height: number) => {
        try {
            localStorage.setItem(DOCK_SAVED_HEIGHT_KEY, String(height));
        } catch {}
    };

    const handleResizeStart = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!event.isPrimary || event.button !== 0) return;

        resizeSessionCleanupRef.current?.();
        const container = document.querySelector(".ddb-action-sheet-container") as HTMLElement | null;
        const startHeight = container ? container.offsetHeight : (window.innerHeight || 400);
        const startY = event.screenY;
        let viewportHeight = Math.max(
            window.innerHeight || 0,
            startHeight + RESOURCE_TRAY_FLOAT_HEIGHT + 16,
        );
        let currentY = startY;
        let lastHeight = startHeight;
        let resizeActive = true;
        const pointerId = event.pointerId;
        const handle = event.currentTarget;
        setIsDraggingHeight(true);
        event.preventDefault();

        void OBR.viewport.getHeight().then((height) => {
            if (Number.isFinite(height) && height > 0) {
                viewportHeight = height;
                if (resizeActive) applyResize(currentY);
            } else {
                console.error(
                    "Owlbear Rodeo returned an invalid viewport height while resizing the Action Bar.",
                );
            }
        }).catch((error) => {
            console.error("Failed to read viewport height while resizing the Action Bar:", error);
        });

        const applyResize = (pointerY: number) => {
            const maxAllowed = calculateMaxDockPanelHeight(
                viewportHeight,
                RESOURCE_TRAY_FLOAT_HEIGHT,
            );
            const nextHeight = calculateDockPanelHeight(
                startHeight,
                startY,
                pointerY,
                maxAllowed,
            );
            if (nextHeight === lastHeight) return;
            lastHeight = nextHeight;
            setPanelHeight(nextHeight);
            savePanelHeight(nextHeight);
            if (OBR?.popover && typeof OBR.popover.setHeight === "function") {
                OBR.popover.setHeight(
                    actionDockPopoverId,
                    nextHeight + RESOURCE_TRAY_FLOAT_HEIGHT,
                ).catch((error) => {
                    console.error("Failed to resize the Action Bar popover:", error);
                });
            }
        };

        const onPointerEnd = () => {
            resizeActive = false;
            resizeSessionCleanupRef.current = null;
            setIsDraggingHeight(false);
        };

        resizeSessionCleanupRef.current = startDockResizePointerSession(
            handle,
            window,
            pointerId,
            (screenY) => {
                currentY = screenY;
                applyResize(currentY);
            },
            onPointerEnd,
        );
    };

    const handleToggleExpandHeight = async () => {
        try {
            const viewportHeight = await OBR.viewport.getHeight();
            const maxAllowed = calculateMaxDockPanelHeight(
                viewportHeight,
                RESOURCE_TRAY_FLOAT_HEIGHT,
            );
            const expandedHeight = Math.min(
                maxAllowed,
                Math.min(
                    520,
                    Math.max(
                        380,
                        Math.round(
                            (viewportHeight - RESOURCE_TRAY_FLOAT_HEIGHT) * 0.55,
                        ),
                    ),
                ),
            );
            const nextHeight = Math.min(
                maxAllowed,
                panelHeight && panelHeight > 350 ? 260 : expandedHeight,
            );
            setPanelHeight(nextHeight);
            savePanelHeight(nextHeight);
            if (OBR?.popover && typeof OBR.popover.setHeight === "function") {
                OBR.popover.setHeight(
                    actionDockPopoverId,
                    nextHeight + RESOURCE_TRAY_FLOAT_HEIGHT,
                ).catch((error) => {
                    console.error("Failed to resize the Action Bar popover:", error);
                });
            }
        } catch (error) {
            console.error("Failed to read viewport height while resizing the Action Bar:", error);
        }
    };

    return { panelHeight, isDraggingHeight, handleResizeStart, handleToggleExpandHeight };
}
