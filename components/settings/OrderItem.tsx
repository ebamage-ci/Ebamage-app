import { IOrder } from "@/types/ordersClient.type";
import { formatDate } from "@/utils/formatDate";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const OrderItem = ({ order }: { order: IOrder }) => {
  const { created_at, hashid, nombre_articles, prix_total_articles, statut } =
    order;

  const onOrderClickHandler = () => {
    router.push(`/extends/OrderDetailsScreen?id=${hashid}`);
  };

  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: "white",
        margin: 1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        marginVertical: 8,
      }}>
      <View className="rounded-2xl p-4 gap-2">
        {/** order id */}
        <View>
          <Text className="text-[#777E90] font-raleway-bold text-[18px]">
            Commande :
          </Text>
          <Text className="font-raleway-bold text-[13px]">#{hashid}</Text>
        </View>

        {/** date */}
        <View className="self-end">
          <Text className="text-[#777E90] font-raleway text-[14px]">
            {formatDate(created_at)}
          </Text>
        </View>

        {/** qty + amount */}
        <View className="flex flex-row justify-between items-center">
          {/** Qty */}
          <View className="flex flex-row gap-1">
            <Text className="text-[#777E90] font-raleway text-[14px]">
              Quantité :
            </Text>
            <Text className="font-raleway-bold text-[13px]">
              {nombre_articles ?? 0}
            </Text>
          </View>

          {/** amount */}
          <View className="flex flex-row gap-1">
            <Text className="text-[#777E90] font-raleway text-[14px]">
              Montant :
            </Text>
            <Text className="font-raleway-bold text-[13px]">
              {prix_total_articles ?? 0} FCFA
            </Text>
          </View>
        </View>

        {/** status + detail */}
        <View className="flex flex-row justify-between items-center">
          <Text className="text-[#CF6212] font-raleway-bold text-[15px]">
            {statut ?? "STATUT"}
          </Text>

          {/** btn detail */}
          <TouchableOpacity onPress={onOrderClickHandler}>
            <Text className="font-raleway-semibold text-[14px] border border-[#777E90] px-3 py-2 rounded-full">
              Voir détails
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;
