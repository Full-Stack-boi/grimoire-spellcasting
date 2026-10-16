/* eslint-disable react-refresh/only-export-components */

import OBR, { Metadata, Permission, Player } from "@owlbear-rodeo/sdk";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { log_error } from "../../../../logging";

export interface BaseOBRContextType {
    party: Player[];
    player: Player|null;
    roomMetadata: Metadata;
    sceneMetadata: Metadata;
    setRoomMetadata: (metadata: Partial<Metadata>) => void;
    setSceneMetadata: (metadata: Partial<Metadata>) => void;
    setPlayerMetadata: (metadata: Partial<Metadata>) => void;
    roomPermissions: Permission[];
    ready: boolean;
    sceneReady: boolean;
}

const BaseOBRContext = createContext<BaseOBRContextType>({
    party: [],
    player: null,
    roomMetadata: {},
    sceneMetadata: {},
    setRoomMetadata: () => {},
    setSceneMetadata: () => {},
    setPlayerMetadata: () => {},
    roomPermissions: [],
    ready: false,
    sceneReady: false,
});
export const useOBR = () => useContext(BaseOBRContext);

export function BaseOBRProvider({ children }: { children: React.ReactNode }) {
    const [ party, setParty ] = useState<Player[]>([]);
    const [ player, setPlayer ] = useState<Player|null>(null);
    const [ roomMetadata, _setRoomMetadata ] = useState<Metadata>({});
    const [ sceneMetadata, _setSceneMetadata ] = useState<Metadata>({});
    const [ sceneReady, setSceneReady ] = useState(false);
    const [ roomPermissions, setRoomPermissions ] = useState<Permission[]>([]);
    const [ ready, setReady ] = useState(false);

    // Subscribe to OBR initialization
    useEffect(() => {
        if (OBR.isReady) {
            setReady(true);
        }
        return OBR.onReady(() => setReady(true));
    }, []);

    // Subscribe to party changes
    useEffect(() => {
        if (ready) {
            return OBR.party.onChange(players => {
                setParty(players);
            });
        }
    }, [ready]);

    // Subscribe to player changes
    useEffect(() => {
        if (ready) {
            return OBR.player.onChange(newPlayer => {
                setPlayer(newPlayer);
            });
        }
    }, [ready]);

    // Subscribe to metadata changes
    useEffect(() => {
        if (ready) {
            return OBR.room.onMetadataChange(metadata => {
                _setRoomMetadata(metadata);
            });
        }
    }, [ready]);

    // Subscribe to metadata changes
    useEffect(() => {
        if (ready) {
            return OBR.scene.onMetadataChange(metadata => {
                _setSceneMetadata(metadata);
            });
        }
    }, [ready]);

    // Subscribe to permission changes
    useEffect(() => {
        if (ready) {
            return OBR.room.onPermissionsChange(permissions => {
                setRoomPermissions(permissions);
            });
        }
    }, [ready]);

    // Subscribe to scene readiness changes
    useEffect(() => {
        if (ready) {
            return OBR.scene.onReadyChange(ready => {
                if (!ready) _setSceneMetadata({});
                setSceneReady(ready);
            });
        }
    }, [ready])

    // Initialize values after setup
    useEffect(() => {
        if (ready) {
            Promise.all([
                OBR.party.getPlayers().catch(() => []),
                Promise.all([
                    OBR.player.getId().catch(() => ""),
                    OBR.player.getConnectionId().catch(() => ""),
                    OBR.player.getRole().catch(() => "PLAYER" as const),
                    OBR.player.getSelection().catch(() => []),
                    OBR.player.getName().catch(() => ""),
                    OBR.player.getColor().catch(() => ""),
                    OBR.player.getSyncView().catch(() => false),
                    OBR.player.getMetadata().catch(() => ({})),
                ]),
                OBR.room.getPermissions().catch(() => []),
                OBR.room.getMetadata().catch(() => ({})),
                OBR.scene.isReady().catch(() => false),
            ]).then(([players, playerFields, permissions, roomMeta, isSceneReady]) => {
                setParty(players);
                setPlayer({
                    id: playerFields[0],
                    connectionId: playerFields[1],
                    role: playerFields[2],
                    selection: playerFields[3],
                    name: playerFields[4],
                    color: playerFields[5],
                    syncView: playerFields[6],
                    metadata: playerFields[7]
                });
                setRoomPermissions(permissions);
                _setRoomMetadata(roomMeta);
                setSceneReady(isSceneReady);
            }).catch(e => log_error("BaseOBRProvider init error:", e));
        }
    }, [ready]);
    useEffect(() => {
        if (ready && sceneReady) {
            OBR.scene.getMetadata().then(_setSceneMetadata).catch(e => log_error("Scene metadata error:", e));
        }
    }, [ready, sceneReady]);

    const setRoomMetadata = useCallback((metadata: Partial<Metadata>) => {
        OBR.room.setMetadata(metadata);
    }, []);

    const setSceneMetadata = useCallback((metadata: Partial<Metadata>) => {
        OBR.scene.setMetadata(metadata);
    }, []);

    const setPlayerMetadata = useCallback((metadata: Partial<Metadata>) => {
        OBR.player.setMetadata(metadata);
    }, []);

    return <BaseOBRContext.Provider value={{ready, sceneReady, party, player, roomMetadata, sceneMetadata, setRoomMetadata, setSceneMetadata, setPlayerMetadata, roomPermissions}}>
        { children }
    </BaseOBRContext.Provider>;
}
