import "./Main.scss";

import { Box, Button, Tab, Tabs } from "@mui/material";
import {
  FaDisplay,
  FaGear,
  FaDiceD20,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { openActionDock } from "../components/ActionDock/ActionDock";

import MovementHandler from "../components/MovementHandler";
import SceneControls from "../components/SceneControls";
import Settings from "../components/Settings";
import AnimationsTab from "../components/Animations/AnimationsTab";
import CharacterChecks from "../components/CharacterChecks/CharacterChecks";
import { useOBR } from "../platform/obr/react/providers";

class TabErrorBoundary extends React.Component<
  { children: React.ReactNode; tabName: string },
  { hasError: boolean; error: unknown }
> {
  constructor(props: { children: React.ReactNode; tabName: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in tab ${this.props.tabName}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2, bgcolor: "#1f1d24", border: "1px solid #e11d48", borderRadius: 1.5, my: 1 }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#f87171", fontSize: "0.95rem" }}>
            Tab error ({this.props.tabName})
          </h3>
          <p style={{ margin: "0 0 12px 0", color: "#cbd5e1", fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>
            {String(this.state.error instanceof Error ? this.state.error.message : this.state.error)}
          </p>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Retry Tab
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

const MENU_OPTIONS = [
  {
    label: "Checks",
    icon: <FaDiceD20 className="tab-icon" />,
    component: <CharacterChecks />,
    role: "PLAYER",
  },
  {
    label: "Scene",
    icon: <FaDisplay className="tab-icon" />,
    component: <SceneControls />,
    role: "PLAYER",
  },
  {
    label: "Settings",
    icon: <FaGear className="tab-icon" />,
    component: <Settings />,
    role: "PLAYER",
  },
  {
    label: "Animations",
    icon: <FaWandMagicSparkles className="tab-icon" />,
    component: <AnimationsTab />,
    role: "PLAYER",
  },
];

export default function Main() {
  const obr = useOBR();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isGM, setIsGM] = useState(false);

  // Set opaque background on the document root while this Main view is mounted.
  // This prevents Chrome's GPU compositor from treating the iframe as a transparent
  // surface, which would cause transparent WebM animation previews to "punch through"
  // and show the OBR canvas behind the popover.
  useLayoutEffect(() => {
    const root = document.getElementById("root");
    document.documentElement.style.backgroundColor = "#0d1117";
    document.body.style.backgroundColor = "#0d1117";
    if (root) {
      root.style.backgroundColor = "#0d1117";
    }
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
      if (root) {
        root.style.backgroundColor = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!obr.ready || !obr.player?.role) {
      return;
    }
    if (obr.player.role !== "GM" && isGM) {
      setIsGM(false);
    } else if (obr.player.role === "GM" && !isGM) {
      setIsGM(true);
    }
  }, [obr.ready, obr.player?.role, isGM]);

  return (
    <Box
      className="main-view-root"
      sx={{
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        bgcolor: "#0d1117",
        color: "#e5e7eb",
        colorScheme: "dark",
        fontFamily: 'Roboto, "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            bgcolor: "#111622",
            borderBottom: "1px solid #1e2638",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
            flexShrink: 0,
          }}
        >
          <Box sx={{ px: 2, pt: 1.5, pb: 0.75 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => openActionDock()}
              sx={{
                background: "linear-gradient(180deg, #c82d38 0%, #991b1b 100%)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.85rem",
                border: "1px solid #f87171",
                boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                "&:hover": {
                  background: "linear-gradient(180deg, #e11d48 0%, #c82d38 100%)",
                  borderColor: "#fca5a5",
                  boxShadow: "0 0 12px rgba(225, 29, 72, 0.4)",
                },
              }}
            >
              Action Bar (B)
            </Button>
          </Box>

          <Tabs
            value={selectedTab}
            sx={{
              width: "100%",
              minHeight: "42px",
              "& .MuiTabs-flexContainer": {
                justifyContent: "space-between",
                px: 1.5,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#e11d48",
                height: 2.5,
                borderRadius: "2px 2px 0 0",
              },
              "& .MuiTab-root": {
                color: "#94a3b8",
                minWidth: "2.5rem",
                minHeight: "40px",
                p: 1,
                fontSize: "0.95rem",
                transition: "all 0.15s ease",
                "&:hover": {
                  color: "#f1f5f9",
                  bgcolor: "rgba(255, 255, 255, 0.04)",
                },
                "&.Mui-selected": {
                  color: "#f43f5e",
                },
              },
            }}
            onChange={(_, value) => setSelectedTab(value)}
          >
            {MENU_OPTIONS.map((option, index) => {
              if (option.role === "GM" && !isGM) return null;
              return (
                <Tab
                  key={index + "-option"}
                  value={index}
                  icon={option.icon}
                  iconPosition="start"
                  aria-label={option.label}
                  title={option.label}
                />
              );
            })}
          </Tabs>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            p: 1,
            pb: 3,
            bgcolor: "#0d1117",
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#2a3241",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#0d1117",
            },
            "&::-webkit-scrollbar-button": {
              display: "none",
              width: 0,
              height: 0,
            },
          }}
        >
          <TabErrorBoundary
            key={selectedTab}
            tabName={MENU_OPTIONS[selectedTab]?.label ?? "Tab"}
          >
            {MENU_OPTIONS[selectedTab]?.component}
          </TabErrorBoundary>
        </Box>
      </Box>

      <MovementHandler />
    </Box>
  );
}
