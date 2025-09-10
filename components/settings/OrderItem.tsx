import { IOrder } from "@/types/ordersClient.type";
import { formatDate } from "@/utils/formatDate";
import { formatHour } from "@/utils/formatHour";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const OrderItem = ({ order }: { order: IOrder }) => {
  const { created_at, hashid, nombre_articles } = order;

  const onOrderClickHandler = () => {
    // console.log("--- click on order ---->", hashid);

    // router.push(`/(root-client)/extends/OrdersScreen?id=${hashid}`)
    router.push(`/extends/OrderDetailsScreen?id=${hashid}`);
  };

  return (
    <View className="justify-center  p-1">
      <Text className=" pl-3 font-raleway-semibold text-[#626262] text-[11px]">
        {/* {date} */}
        {formatDate(created_at)}
      </Text>

      <TouchableOpacity
        className="w-full rounded-2xl p-7 gap-2 bg-white"
        onPress={onOrderClickHandler}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
        <Text className="font-raleway-semibold text-[15px]">
          Commande de {nombre_articles} articles
        </Text>

        <Text className="font-raleway-semibold text-[12px] text-[#626262]">
          Cliquez pour voir les détails
        </Text>

        <Text className=" ml-auto text-[#626262] text-[11px] font-raleway-semibold">
          {formatHour(created_at)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default OrderItem;
