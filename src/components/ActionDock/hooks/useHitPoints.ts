import type { Dispatch, SetStateAction } from "react";
import OBR from "@owlbear-rodeo/sdk";
import type { DDBParsedCharacter } from "../../../types/ddb";
import { setTokenVitals } from "../../../features/combat/tokenVitalsService";

interface CustomHitPoints {
    current: number;
    max: number;
    temp: number;
}

interface DeathSaves {
    successes: number;
    failures: number;
}

interface UseHitPointsOptions {
    customHp: CustomHitPoints | null;
    setCustomHp: Dispatch<SetStateAction<CustomHitPoints | null>>;
    character: DDBParsedCharacter | null;
    concentrationSpell: { id: string; name: string } | null;
    deathSaves: DeathSaves;
    setDeathSaves: Dispatch<SetStateAction<DeathSaves>>;
    casterId?: string;
}

export function useHitPoints({
    customHp,
    setCustomHp,
    character,
    concentrationSpell,
    deathSaves,
    setDeathSaves,
    casterId,
}: UseHitPointsOptions) {
    const currentHp = customHp ? customHp.current : (character?.hp?.current ?? 0);
    const maxHp = customHp ? customHp.max : (character?.hp?.max ?? 0);
    const tempHp = customHp ? customHp.temp : (character?.hp?.temp ?? 0);

    const heal = (amount = 5) => {
        setCustomHp(previous => {
            const current = previous ? previous.current : (character?.hp?.current ?? 0);
            const max = previous ? previous.max : (character?.hp?.max ?? 0);
            const temp = previous ? previous.temp : (character?.hp?.temp ?? 0);
            const nextCurrent = Math.min(max, current + amount);
            OBR.notification.show(`Healed +${amount} HP (${nextCurrent}/${max})`, "SUCCESS");
            if (nextCurrent > 0 && (deathSaves.successes > 0 || deathSaves.failures > 0)) {
                setDeathSaves({ successes: 0, failures: 0 });
            }
            if (casterId) {
                setTokenVitals(casterId, { hpCurrent: nextCurrent, hpMax: max, hpTemp: temp }).catch(() => {});
            }
            return { current: nextCurrent, max, temp };
        });
    };

    const takeDamage = (amount = 5) => {
        setCustomHp(previous => {
            const current = previous ? previous.current : (character?.hp?.current ?? 0);
            const max = previous ? previous.max : (character?.hp?.max ?? 0);
            const temp = previous ? previous.temp : (character?.hp?.temp ?? 0);
            let remainingDamage = amount;
            let nextTemp = temp;
            if (nextTemp > 0) {
                const absorbed = Math.min(nextTemp, remainingDamage);
                nextTemp -= absorbed;
                remainingDamage -= absorbed;
            }
            const nextCurrent = Math.max(0, current - remainingDamage);
            OBR.notification.show(`Took ${amount} damage (${nextCurrent}/${max})`, "WARNING");

            if (concentrationSpell && amount > 0) {
                const concentrationDc = Math.max(10, Math.floor(amount / 2));
                OBR.notification.show(`Concentrating on "${concentrationSpell.name}"! Roll CON Save DC ${concentrationDc}.`, "WARNING");
            }
            if (casterId) {
                setTokenVitals(casterId, { hpCurrent: nextCurrent, hpMax: max, hpTemp: nextTemp }).catch(() => {});
            }
            return { current: nextCurrent, max, temp: nextTemp };
        });
    };

    const setDirectHp = (newHp: number) => {
        setCustomHp(previous => {
            const max = previous ? previous.max : (character?.hp?.max ?? 0);
            const temp = previous ? previous.temp : (character?.hp?.temp ?? 0);
            const nextCurrent = Math.max(0, Math.min(max, Math.floor(newHp)));
            OBR.notification.show(`HP updated: ${nextCurrent}/${max}`, "INFO");
            if (nextCurrent > 0 && (deathSaves.successes > 0 || deathSaves.failures > 0)) {
                setDeathSaves({ successes: 0, failures: 0 });
            }
            if (casterId) {
                setTokenVitals(casterId, { hpCurrent: nextCurrent, hpMax: max, hpTemp: temp }).catch(() => {});
            }
            return { current: nextCurrent, max, temp };
        });
    };

    const setDirectMaxHp = (newMax: number) => {
        setCustomHp(previous => {
            const current = previous ? previous.current : (character?.hp?.current ?? 0);
            const temp = previous ? previous.temp : (character?.hp?.temp ?? 0);
            const nextMax = Math.max(1, Math.floor(newMax));
            const nextCurrent = Math.min(nextMax, current);
            OBR.notification.show(`Max HP updated: ${nextMax}`, "INFO");
            if (casterId) {
                setTokenVitals(casterId, { hpCurrent: nextCurrent, hpMax: nextMax, hpTemp: temp }).catch(() => {});
            }
            return { current: nextCurrent, max: nextMax, temp };
        });
    };

    const setDirectTempHp = (newTemp: number) => {
        setCustomHp(previous => {
            const current = previous ? previous.current : (character?.hp?.current ?? 0);
            const max = previous ? previous.max : (character?.hp?.max ?? 0);
            const nextTemp = Math.max(0, Math.floor(newTemp));
            OBR.notification.show(`Temporary HP set: ${nextTemp}`, "INFO");
            if (casterId) {
                setTokenVitals(casterId, { hpCurrent: current, hpMax: max, hpTemp: nextTemp }).catch(() => {});
            }
            return { current, max, temp: nextTemp };
        });
    };

    return {
        currentHp,
        maxHp,
        tempHp,
        heal,
        takeDamage,
        setDirectHp,
        setDirectMaxHp,
        setDirectTempHp,
    };
}
