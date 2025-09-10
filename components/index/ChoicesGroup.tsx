import { Variation } from "@/types/articleDetailClient.type";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Composant enfant (item)
const OptionVariationsItem = ({
  value,
  isSelected,
  onPress,
}: {
  value: string;
  isSelected: boolean;
  onPress: (value: string) => void;
}) => {
  return (
    <TouchableOpacity
      className={`border-[1.5px] rounded min-w-[60px]  justify-center items-center self-start p-1 ${
        isSelected
          ? "bg-primary-300 border-primary-300"
          : "bg-white border-gray-300"
      }`}
      onPress={() => onPress(value)}
      activeOpacity={0.6}>
      <Text
        className={`font-raleway-semibold ${
          isSelected ? "text-white" : "text-primary-300"
        }`}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

// React.memo empêche les rerenders inutiles
const OptionVariationsItemMemo = memo(OptionVariationsItem);

// Composant groupe de choix
const ChoicesGroup = ({
  variation,
  onVariationChange,
}: {
  variation: Variation;
  onVariationChange?: (value: string) => void;
}) => {
  // Référence pour suivre si l'initialisation a déjà été effectuée
  const isInitialized = useRef(false);

  const [selectedChoice, setSelectedChoice] = useState<string>(
    variation.lib_variation[0]
  );

  const onChoiceClicked = useCallback(
    (value: string) => {
      setSelectedChoice(value);
      if (onVariationChange) {
        onVariationChange(value);
      }
    },
    [onVariationChange]
  );

  // Initialiser la variation sélectionnée uniquement au montage du composant
  // en utilisant une référence pour éviter les appels multiples
  useEffect(() => {
    // Vérifier si l'initialisation a déjà été effectuée
    if (!isInitialized.current) {
      // Vérifier que la liste des variations n'est pas vide
      if (onVariationChange && variation.lib_variation.length > 0) {
        // Utiliser la première valeur comme valeur initiale
        onVariationChange(variation.lib_variation[0]);
      }
      // Marquer comme initialisé
      isInitialized.current = true;
    }
    // Ne s'exécute qu'une seule fois au montage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedChoices = useMemo(() => {
    return variation.lib_variation.map((value) => (
      <OptionVariationsItemMemo
        key={value}
        value={value}
        isSelected={selectedChoice === value}
        onPress={onChoiceClicked}
      />
    ));
  }, [selectedChoice, onChoiceClicked, variation.lib_variation]);

  return (
    <View className="mb-3">
      <Text className="font-raleway-semibold text-[14px] ">
        {variation.nom_variation + " : " + selectedChoice}
      </Text>
      <View className="flex-row gap-2 mt-4 flex-wrap">{renderedChoices}</View>
    </View>
  );
};

export default ChoicesGroup;
