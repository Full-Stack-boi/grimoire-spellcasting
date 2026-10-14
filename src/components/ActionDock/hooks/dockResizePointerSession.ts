type PointerCaptureTarget = EventTarget & {
    setPointerCapture(pointerId: number): void;
    releasePointerCapture(pointerId: number): void;
    hasPointerCapture(pointerId: number): boolean;
};

interface PointerCoordinates {
    pointerId: number;
    screenY: number;
}

export function startDockResizePointerSession(
    handle: PointerCaptureTarget,
    eventTarget: EventTarget,
    pointerId: number,
    onMove: (screenY: number) => void,
    onEnd: () => void,
): () => void {
    let finished = false;

    const finish = () => {
        if (finished) return;
        finished = true;
        eventTarget.removeEventListener("pointermove", handlePointerMove);
        eventTarget.removeEventListener("pointerup", handlePointerEnd);
        eventTarget.removeEventListener("pointercancel", handlePointerEnd);
        eventTarget.removeEventListener("blur", finish);
        handle.removeEventListener("lostpointercapture", finish);

        if (handle.hasPointerCapture(pointerId)) {
            handle.releasePointerCapture(pointerId);
        }
        onEnd();
    };

    const handlePointerMove = (event: Event) => {
        const pointerEvent = event as PointerEventCoordinatesEvent;
        if (pointerEvent.pointerId !== pointerId) return;
        if (Number.isFinite(pointerEvent.screenY)) {
            onMove(pointerEvent.screenY);
        }
    };

    const handlePointerEnd = (event: Event) => {
        if ((event as PointerEventCoordinatesEvent).pointerId === pointerId) {
            finish();
        }
    };

    eventTarget.addEventListener("pointermove", handlePointerMove);
    eventTarget.addEventListener("pointerup", handlePointerEnd);
    eventTarget.addEventListener("pointercancel", handlePointerEnd);
    eventTarget.addEventListener("blur", finish);
    handle.addEventListener("lostpointercapture", finish);

    try {
        handle.setPointerCapture(pointerId);
    } catch (error) {
        console.error("Failed to capture the Action Bar resize pointer:", error);
    }

    return finish;
}

type PointerEventCoordinatesEvent = Event & PointerCoordinates;
