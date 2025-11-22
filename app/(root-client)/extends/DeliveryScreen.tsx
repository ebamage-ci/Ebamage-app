import { CustomButton } from "@/components/global/CustomButton";
import CustomSelect from "@/components/global/CustomSelect";
import PageWrapper from "@/components/global/PageWrapper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { RadioButton } from "react-native-paper";

import { IArticleOrderRequestClient } from "@/types/articleOrder.type";

import { useClientCartArticleOrder } from "@/hooks/useClientCartArticleOrder";
import { useClientFetchCities } from "@/hooks/useClientFetchCities";
import { useClientFetchTownsByCity } from "@/hooks/useClientFetchTownsByCity";
import useFetchDeliveryPriceClient from "@/hooks/useFetchDeliveryPriceClient";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { useLocalCartArticlesClient } from "@/stores/useLocalCartArticlesClient.store";

const DeliveryScreen = () => {
  const router = useRouter();

  const { id_panier, prix_total } = useLocalSearchParams();

  // console.log("-- info params order --> ", {
  //   id_panier,
  //   prix_total,
  // });

  const { user } = useAuthClientStore();
  const { mutate: mutateOrder, isPending: isPendingOrder } =
    useClientCartArticleOrder();
  const { resetCart } = useLocalCartArticlesClient();

  // inputs states
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [quartier, setQuartier] = useState("");

  const { data: deliveryPriceData } = useFetchDeliveryPriceClient(
    Number(prix_total) || 0
  );
  const { data } = useClientFetchCities();

  // console.log("cities in Delivery :", JSON.stringify(data, null, 2));

  const { data: townsData } = useClientFetchTownsByCity(selectedCity);

  // Réinitialiser la commune sélectionnée lorsque la ville change
  useEffect(() => {
    if (selectedCity) {
      setSelectedTown("");
    }
  }, [selectedCity]);

  // payment mode state
  const [option, setOption] = useState<"opt1" | "opt2">("opt2");

  // cities
  const cities =
    data?.data?.map((item) => ({
      label: item.lib_ville,
      value: item.lib_ville,
    })) || [];

  // towns
  const towns =
    townsData?.data?.map((item) => ({
      label: item.lib_commune,
      value: item.lib_commune,
    })) || [];

  const onCommandHandler = () => {
    if (selectedCity === "" || selectedTown === "" || quartier === "") {
      Alert.alert("Erreur", "Veuillez correctement remplir tous les champs");
      return;
    }

    const datasOrder: IArticleOrderRequestClient = {
      id_panier: String(id_panier) || "",
      lib_ville: selectedCity,
      lib_commune: selectedTown,
      quartier,
      moyen_de_paiement: option === "opt1" ? 0 : 1,
    };

    // console.log("-- datas order -- ", JSON.stringify(datasOrder, null, 2));

    mutateOrder(
      {
        token: user?.token || "",
        data: datasOrder,
      },
      {
        onSuccess: async (data) => {
          // console.log(
          //   "-- data order success -----> ",
          //   JSON.stringify(data.hashid, null, 2)
          // );

          await resetCart();
          // console.log("-- id order success -----> ", data.hashid);
          // Utiliser replace pour éviter de revenir sur DeliveryScreen
          router.replace(
            `/extends/OrderDetailsScreen?id=${data.hashid}&from=delivery`
          );
        },

        onError: (error) => {
          // console.log("Erreur order:", error);
          Alert.alert(
            "Erreur",
            error.message || "Impossible de passer la commande"
          );
        },
      }
    );
  };

  return (
    <PageWrapper>
      {/** form */}
      <View>
        {/** ville */}
        <CustomSelect
          label="Ville"
          defaultLabel="Sélectionnez une ville"
          selectedValue={selectedCity}
          datas={cities}
          onValueChange={(value) => {
            if (value === "empty") return;

            // console.log("new value city :", value);
            setSelectedCity(value);
          }}
        />

        {/** commune */}
        <CustomSelect
          label="Commune"
          defaultLabel="Sélectionnez une commune"
          selectedValue={selectedTown}
          datas={towns}
          onValueChange={(value) => {
            if (value === "empty") return;
            setSelectedTown(value);
          }}
        />

        {/** quartier */}
        <View className="my-3">
          <Text className="text-xl font-raleway-semibold mb-1">Quartier</Text>

          <View className="border border-[#9F9F9F] rounded-lg overflow-hidden bg-white">
            <TextInput
              className="px-4 text-[#9F9F9F]"
              style={{ height: 52 }}
              placeholder="Entrez votre quartier"
              placeholderTextColor="#9F9F9F"
              value={quartier}
              onChangeText={setQuartier}
            />
          </View>
        </View>
      </View>

      {/** info delivery */}
      <View className=" my-10 border-y-2 border-[#C4C4C4]">
        {/** commande */}
        <View className="flex-row justify-between my-2">
          <Text className="font-raleway-medium text-gray-400 text-[18px] ">
            Commande
          </Text>
          <Text className="font-raleway-medium text-[15px]">
            {prix_total} FCFA
          </Text>
        </View>

        {/** livraison */}
        {deliveryPriceData?.data !== null && (
          <View className="flex-row justify-between my-2">
            <Text className="font-raleway-medium text-gray-400 text-[18px] ">
              Livraison
            </Text>
            <Text className="font-raleway-medium text-[15px]">
              {Number(deliveryPriceData?.data) || 0} FCFA
            </Text>
          </View>
        )}

        {/* total */}
        <View className="flex-row justify-between my-2">
          <Text className="font-raleway-medium text[#4C5059] text-[18px] ">
            Total
          </Text>
          <Text className="font-raleway-medium text-[15px]">
            {parseFloat(String(prix_total)) + Number(deliveryPriceData?.data) ||
              0}
            FCFA
          </Text>
        </View>
      </View>

      {/** payment method */}
      <View>
        <Text className="text-[#222222] font-raleway-medium">Paiement</Text>

        {/** radios */}
        <View>
          <RadioButton.Group
            onValueChange={(value) => setOption(value as "opt1" | "opt2")}
            value={option}>
            <View className="flex-row my-6 justify-center ">
              {/** money mobile */}

              {/* <RadioButton.Item
                mode="android"
                label="Mobile money"
                color="#34A853"
                rippleColor="#34A853"
                labelStyle={{
                  color: option === "opt1" ? "#34A853" : "black",
                  fontFamily:
                    option === "opt1"
                      ? "Montserrat-Medium"
                      : "Montserrat-ExtraBold",
                  fontSize: 15,
                }}
                position="leading"
                value="opt1"
              /> */}
              <RadioButton.Item
                label="à la livraison"
                value="opt2"
                labelStyle={{
                  color: option === "opt2" ? "#34A853" : "black",
                  fontFamily:
                    option === "opt2"
                      ? "Montserrat-Medium"
                      : "Montserrat-ExtraBold",
                  fontSize: 15,
                }}
                rippleColor="#34A853"
                position="trailing"
                color="#34A853"
              />
            </View>
          </RadioButton.Group>
        </View>
      </View>

      <CustomButton
        label={isPendingOrder ? "En cours" : "Commander"}
        onPress={onCommandHandler}
        disabled={isPendingOrder}
      />
    </PageWrapper>
  );
};

export default DeliveryScreen;
