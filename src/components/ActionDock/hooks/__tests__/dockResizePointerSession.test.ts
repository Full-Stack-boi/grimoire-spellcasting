import { describe, expect, it, vi } from "vitest";
import { startDockResizePointerSession } from "../dockResizePointerSession";

function createPointerEvent(type: string, pointerId: number, screenY = 0): Event {
    return Object.assign(new Event(type), { pointerId, screenY });
}

function createPointerCaptureHandle() {
    let capturedPointerId: number | null = null;
    const handle = new EventTarget() as EventTarget & {
        setPointerCapture: (pointerId: number) => void;
        releasePointerCapture: (pointerId: number) => void;
        hasPointerCapture: (pointerId: number) => boolean;
    };
    handle.setPointerCapture = vi.fn((pointerId: number) => {
        capturedPointerId = pointerId;
    });
    handle.hasPointerCapture = vi.fn(
        (pointerId: number) => capturedPointerId === pointerId,
    );
    handle.releasePointerCapture = vi.fn((pointerId: number) => {
        if (capturedPointerId === pointerId) {
            capturedPointerId = null;
            handle.dispatchEvent(new Event("lostpointercapture"));
        }
    });
    return handle;
}

describe("Action Bar resize pointer session", () => {
    it("continues tracking outside the resize handle and finishes on pointer release", () => {
        const handle = createPointerCaptureHandle();
        const eventTarget = new EventTarget();
        const onMove = vi.fn();
        const onEnd = vi.fn();

        startDockResizePointerSession(handle, eventTarget, 7, onMove, onEnd);

        expect(handle.setPointerCapture).toHaveBeenCalledWith(7);
        eventTarget.dispatchEvent(createPointerEvent("pointermove", 8, 10));
        eventTarget.dispatchEvent(createPointerEvent("pointermove", 7, 150));
        eventTarget.dispatchEvent(createPointerEvent("pointerup", 8));
        expect(onMove).toHaveBeenCalledOnce();
        expect(onMove).toHaveBeenCalledWith(150);
        expect(onEnd).not.toHaveBeenCalled();

        eventTarget.dispatchEvent(createPointerEvent("pointerup", 7));
        eventTarget.dispatchEvent(createPointerEvent("pointermove", 7, 250));

        expect(handle.releasePointerCapture).toHaveBeenCalledWith(7);
        expect(onMove).toHaveBeenCalledOnce();
        expect(onEnd).toHaveBeenCalledOnce();
    });

    it.each(["pointercancel", "blur"] as const)(
        "cleans up the active drag after %s",
        (eventType) => {
            const handle = createPointerCaptureHandle();
            const eventTarget = new EventTarget();
            const onEnd = vi.fn();
            startDockResizePointerSession(handle, eventTarget, 3, vi.fn(), onEnd);

            eventTarget.dispatchEvent(
                eventType === "blur"
                    ? new Event(eventType)
                    : createPointerEvent(eventType, 3),
            );
            eventTarget.dispatchEvent(createPointerEvent("pointerup", 3));

            expect(onEnd).toHaveBeenCalledOnce();
            expect(handle.releasePointerCapture).toHaveBeenCalledWith(3);
        },
    );

    it("finishes the drag if pointer capture is lost", () => {
        const handle = createPointerCaptureHandle();
        const eventTarget = new EventTarget();
        const onEnd = vi.fn();
        startDockResizePointerSession(handle, eventTarget, 4, vi.fn(), onEnd);

        handle.dispatchEvent(new Event("lostpointercapture"));
        eventTarget.dispatchEvent(createPointerEvent("pointerup", 4));

        expect(onEnd).toHaveBeenCalledOnce();
    });
});
