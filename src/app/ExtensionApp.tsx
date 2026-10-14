import React, { useEffect, useMemo, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router";
import OBR from "@owlbear-rodeo/sdk";
import { darkTheme, lightTheme } from "../config/theme";
import { BaseOBRProvider } from "../platform/obr/react/providers/BaseOBRProvider";
import ActionDock from "../components/ActionDock/ActionDock";
import DDBRollLogPopover from "../views/DDBRollLogPopover";
import DDBSyncModal from "../views/DDBSyncModal";
import Main from "../views/Main";
import SpellDetailModal from "../views/SpellDetailModal";
import SpellSelectionPopover from "../views/SpellSelectionPopover";
import BG3TopTurnTracker from "../views/BG3TopTurnTracker";
import { log_error } from "../logging";

class AppRouteErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error: unknown }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("AppRoute ErrorBoundary caught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ color: "#f87171", padding: 16, background: "#0d1117", minHeight: "100vh", boxSizing: "border-box" }}>
                    <h3 style={{ margin: "0 0 8px 0" }}>An error occurred in Grimoire</h3>
                    <pre style={{ fontSize: 12, whiteSpace: "pre-wrap", color: "#e2e8f0" }}>{String(this.state.error instanceof Error ? this.state.error.message : this.state.error)}</pre>
                    <button
                        style={{ marginTop: 12, padding: "6px 12px", background: "#e11d48", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
                        onClick={() => this.setState({ hasError: false, error: null })}
                    >
                        Reload
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

class ActionDockErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error: unknown }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ActionDock ErrorBoundary caught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ color: "#f87171", padding: 16, background: "#181b20", borderRadius: 8, border: "1px solid #dc2626" }}>
                    <h3>Something went wrong in Action Bar</h3>
                    <pre style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>{String(this.state.error)}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function ExtensionApp() {
    const [ready, setReady] = useState(false);
    const [themeMode, setThemeMode] = useState<"DARK" | "LIGHT">("DARK");

    useEffect(() => {
        if (!ready) return;
        try {
            OBR.theme.getTheme().then(theme => setThemeMode(theme.mode));
            return OBR.theme.onChange(theme => setThemeMode(theme.mode));
        } catch (error) {
            log_error(error);
            setReady(false);
        }
    }, [ready]);

    useEffect(() => OBR.onReady(() => setReady(true)), []);

    const routes = useMemo(() => {
        return (
            <BaseOBRProvider>
                <ThemeProvider theme={themeMode === "DARK" ? darkTheme : lightTheme}>
                    <CssBaseline />
                    <Box sx={{ height: "100vh", bgcolor: "transparent" }}>
                        <Routes>
                            <Route index element={<AppRouteErrorBoundary><Main /></AppRouteErrorBoundary>} />
                            <Route path="spell-selection-popover" element={<SpellSelectionPopover />} />
                            <Route path="action-dock" element={<ActionDockErrorBoundary><ActionDock /></ActionDockErrorBoundary>} />
                            <Route path="spell-detail-modal/:spellID?" element={<SpellDetailModal />} />
                            <Route path="ddb-sync-modal/:tokenId?" element={<DDBSyncModal />} />
                            <Route path="ddb-roll-log" element={<DDBRollLogPopover />} />
                            <Route path="turn-tracker" element={<BG3TopTurnTracker />} />
                        </Routes>
                    </Box>
                </ThemeProvider>
            </BaseOBRProvider>
        );
    }, [themeMode]);

    const isRollLog =
        window.location.pathname.includes("ddb-roll-log") ||
        window.location.search.includes("ddb-roll-log") ||
        window.location.hash.includes("ddb-roll-log");
    if (isRollLog) {
        return <DDBRollLogPopover />;
    }

    const isTurnTracker =
        window.location.pathname.includes("turn-tracker") ||
        window.location.search.includes("turn-tracker") ||
        window.location.hash.includes("turn-tracker");
    if (isTurnTracker) {
        return <BG3TopTurnTracker />;
    }

    return routes;
}
