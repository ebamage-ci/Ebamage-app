import { Variation } from "@/types/articleDetailClient.type";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Composant enfant : ColorItem
const ColorItem = ({
  color,
  isSelected,
  onPress,
}: {
  color: string;
  isSelected: boolean;
  onPress: (color: string) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(color)}
      activeOpacity={0.6}
      className={`w-[49px] h-[49px] rounded-full justify-center items-center ${
        isSelected ? "border-2 border-primary" : "border border-gray-300"
      }`}>
      <View
        className="w-[41px] h-[41px] rounded-full"
        style={{ backgroundColor: color }}
      />
    </TouchableOpacity>
  );
};

// Mémoïsation
const ColorItemMemo = memo(ColorItem);

// Composant principal : ColorsGroup
const ColorsGroup = ({
  variation,
  onVariationChange,
}: {
  variation: Variation;
  onVariationChange?: (value: string) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    variation.lib_variation[0]
  );

  const onChoiceClicked = useCallback(
    (color: string) => {
      setSelectedColor(color);
      if (onVariationChange) {
        onVariationChange(color);
      }
    },
    [onVariationChange]
  );

  // Initialiser la variation sélectionnée
  useEffect(() => {
    if (onVariationChange && variation.lib_variation.length > 0) {
      onVariationChange(selectedColor);
    }
  }, [onVariationChange, selectedColor, variation.lib_variation]);

  const renderedChoices = useMemo(
    () =>
      variation.lib_variation.map((color) => (
        <ColorItemMemo
          key={color}
          color={color}
          isSelected={selectedColor === color}
          onPress={onChoiceClicked}
        />
      )),
    [selectedColor, onChoiceClicked, variation.lib_variation]
  );

  return (
    <View className="mb-3">
      <Text className="font-raleway-semibold text-[14px] leading-4">
        Couleur{" "}
      </Text>
      <View className="flex-row gap-3 mt-4 flex-wrap">{renderedChoices}</View>
    </View>
  );
};

export default ColorsGroup;
