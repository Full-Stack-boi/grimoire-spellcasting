import type { DDBFeatureAction, DDBParsedCharacter } from "../../../types/ddb";
import { getFeatureFlyoutKind } from "../../../assets/manual-formulas/index";
import { isActivatableBuffFeature } from "../../../services/buffService";
import type { DetailDrawerItem } from "../domain/types";
import { GemAction } from "../shared/Bg3Icons";
import { ActionGridTile } from "./ActionGridTile";

interface Bg3FeatureCardProps {
    feature: DDBFeatureAction;
    character?: DDBParsedCharacter | null;
    index: number;
    usedCount: number;
    selected: boolean;
    activeBuff?: boolean;
    onActivateFeature?: (feature: DDBFeatureAction) => void;
    onToggleFlyout: (featureId: string) => void;
    onOpenDetails: (item: DetailDrawerItem) => void;
}

function getFeatureCategory(feature: DDBFeatureAction) {
    return feature.source === "class" ? "Class Feature" : feature.source === "feat" ? "Feat" : "Species Trait";
}

function toDetailItem(feature: DDBFeatureAction): DetailDrawerItem {
    return {
        type: "feature",
        id: feature.id,
        name: feature.name,
        category: getFeatureCategory(feature),
        activationType: feature.activationType,
        rangeText: feature.rangeText,
        description: feature.description,
        rawDescription: feature.rawDescription,
        limitedUse: feature.limitedUse,
    };
}

export function Bg3FeatureCard({
    feature,
    character,
    index,
    usedCount,
    selected,
    activeBuff,
    onActivateFeature,
    onToggleFlyout,
    onOpenDetails,
}: Bg3FeatureCardProps) {
    const maxUses = feature.limitedUse?.max || 0;
    const flyoutKind = getFeatureFlyoutKind(feature, character);
    const isActivatable = isActivatableBuffFeature(feature.name, feature.description);
    const isBonus = feature.activationType === "bonus";
    const isReaction = feature.activationType === "reaction";

    const subtitleText = activeBuff
        ? "Active Buff"
        : isBonus
          ? "Bonus Action"
          : isReaction
            ? "Reaction"
            : "Action";

    const handleTileActivate = () => {
        if (flyoutKind) {
            onToggleFlyout(feature.id);
        } else if (isActivatable && onActivateFeature) {
            onActivateFeature(feature);
        } else {
            onOpenDetails(toDetailItem(feature));
        }
    };

    return (
        <ActionGridTile
            key={feature.id}
            name={feature.name}
            category={getFeatureCategory(feature)}
            subtitle={subtitleText}
            details={[feature.rangeText || "Self", maxUses > 0 ? `${maxUses - usedCount}/${maxUses} uses` : "At will", feature.limitedUse?.resetType].filter(Boolean) as string[]}
            description={feature.description}
            icon={<GemAction expended={false} />}
            accent={activeBuff ? "#ff5722" : isBonus ? "#d1a75e" : isReaction ? "#65b5d6" : "#62c982"}
            shortcut={index + 1}
            selected={selected || Boolean(activeBuff)}
            onActivate={handleTileActivate}
            onContextMenu={event => {
                event.preventDefault();
                onOpenDetails(toDetailItem(feature));
            }}
        />
    );
}
