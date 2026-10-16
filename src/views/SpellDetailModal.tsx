import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import OBR from "@owlbear-rodeo/sdk";
import SpellDetailViewer from "../components/SpellDetailViewer/SpellDetailViewer";
import { APP_KEY } from "../config";
import { toolMetadataSelectedSpell } from "../effectsTool";
import { Box } from "@mui/material";

export const spellDetailModalId = `${APP_KEY}/spell-detail-modal`;

export async function openSpellDetailModal(spellID: string) {
    const search = window.location.search || "";
    await OBR.modal.open({
        id: spellDetailModalId,
        url: `${window.location.origin}/spell-detail-modal/${encodeURIComponent(spellID)}${search}`,
        width: 440,
        height: 560,
    });
}

export const SpellDetailModal: React.FC = () => {
    const { spellID } = useParams();
    const [id, setId] = useState<string>(spellID || "");

    useEffect(() => {
        if (!spellID) {
            OBR.player.getMetadata().then(meta => {
                const s = meta?.[toolMetadataSelectedSpell] as string | undefined;
                if (s) setId(s);
            });
        }
    }, [spellID]);

    if (!id) {
        return (
            <Box sx={{ p: 3, textAlign: "center", color: "#94a3b8" }}>
                No spell selected.
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                bgcolor: "#0d1118",
                color: "#e5e7eb",
                overflow: "hidden",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <SpellDetailViewer
                spellID={id}
                onClose={() => OBR.modal.close(spellDetailModalId)}
                isModal={true}
            />
        </Box>
    );
};

export default SpellDetailModal;
