import { CustomButton } from "@/components/global/CustomButton";
import PageWrapper from "@/components/global/PageWrapper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";

import { IArticleOrderRequestClient } from "@/types/articleOrder.type";

import CustomNewInput from "@/components/global/CustomNewInput";
import CustomOption from "@/components/global/CustomOption";
import { useClientCartArticleOrder } from "@/hooks/useClientCartArticleOrder";
import { useClientFetchCities } from "@/hooks/useClientFetchCities";
import { useClientFetchTownsByCity } from "@/hooks/useClientFetchTownsByCity";
import useFetchDeliveryPriceClient from "@/hooks/useFetchDeliveryPriceClient";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { useLocalCartArticlesClient } from "@/stores/useLocalCartArticlesClient.store";
import { ILocationCity, ILocationTown } from "@/types/location.type";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ChevronDownIcon from "@/assets/svgs/ChevronDownIcon";
import CustomTownOption from "@/components/global/CustomTownOption";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

const DeliveryScreen = () => {
  // Ref pour bottomSheetModalCityRef
  const bottomSheetModalCityRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalTownRef = useRef<BottomSheetModal>(null);

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
  const [locationCity, setLocationCity] = useState<ILocationCity>({
    hashid: "0",
    lib_ville: "",
  });
  const [locationTown, setLocationTown] = useState<ILocationTown>({
    hashid: "0",
    lib_commune: "",
  });

  const [quartier, setQuartier] = useState("");

  const { data: deliveryPriceData } = useFetchDeliveryPriceClient(
    Number(prix_total) || 0
  );
  const { data: citiesData } = useClientFetchCities();

  // console.log("cities in Delivery :", JSON.stringify(data, null, 2));

  const { data: townsData } = useClientFetchTownsByCity(
    locationCity?.lib_ville
  );

  // payment mode state
  const [option, setOption] = useState<"opt1" | "opt2">("opt2");

  const onCommandHandler = () => {
    // console.log(
    //   JSON.stringify(
    //     {
    //       city: locationCity?.lib_ville,
    //       town: locationTown?.lib_commune,
    //       quartier: quartier,
    //     },
    //     null,
    //     2
    //   )
    // );

    if (
      locationCity?.lib_ville === "" ||
      locationTown.lib_commune === "" ||
      quartier === ""
    ) {
      Alert.alert("Erreur", "Veuillez correctement remplir tous les champs");
      return;
    }

    const datasOrder: IArticleOrderRequestClient = {
      id_panier: String(id_panier) || "",
      lib_ville: locationCity?.lib_ville || "",
      lib_commune: locationTown.lib_commune || "",
      quartier: quartier || "",
      moyen_de_paiement: option === "opt1" ? 0 : 1,
    };

    // console.log("-- datas order -- ", JSON.stringify(datasOrder, null, 2));

    mutateOrder(
      {
        token: user?.token || "",
        data: datasOrder,
      },
      {
        onSuccess: (data) => {
          // console.log(
          //   "-- data order success -----> ",
          //   JSON.stringify(data.hashid, null, 2)
          // );

          resetCart();
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

  // Ouvrir le bottom city sheet
  const openLocationCitySheet = useCallback(() => {
    bottomSheetModalCityRef.current?.present();
  }, []);

  // Backdrop
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.6}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  // variables
  const formattedCities = useMemo(
    () =>
      citiesData?.data.map((city) => ({
        hashid: city.hashid,
        lib_ville: city.lib_ville,
      })) || [],
    [citiesData]
  );

  const citiesDataToSheet = useMemo<ILocationCity[]>(
    () => formattedCities,
    [formattedCities]
  );

  // renderitem
  const renderCityItem = useCallback(
    ({ item }: { item: ILocationCity }) => (
      <CustomOption
        item={item}
        isSelected={locationCity?.hashid === item.hashid}
        onPress={(emplacement) => {
          setLocationCity(emplacement);

          if (locationCity?.hashid !== emplacement.hashid) {
            setLocationTown({ hashid: "0", lib_commune: "" });
          }

          bottomSheetModalCityRef.current?.dismiss();
        }}
      />
    ),
    [locationCity]
  );

  /// towns
  // Ouvrir le bottom town sheet
  const openLocationTownSheet = useCallback(() => {
    bottomSheetModalTownRef.current?.present();
  }, []);

  // variables
  const formattedTown = useMemo(
    () =>
      townsData?.data.map((town) => ({
        hashid: town.hashid,
        lib_commune: town.lib_commune,
      })) || [],
    [townsData]
  );

  const townsDataToSheet = useMemo<ILocationTown[]>(
    () => formattedTown,
    [formattedTown]
  );

  // renderitem
  const renderTownItem = useCallback(
    ({ item }: { item: ILocationTown }) => (
      <CustomTownOption
        item={item}
        isSelected={locationTown?.hashid === item.hashid}
        onPress={(emplacement) => {
          setLocationTown(emplacement);
          bottomSheetModalTownRef.current?.dismiss();
        }}
      />
    ),
    [locationTown]
  );

  const insets = useSafeAreaInsets();

  return (
    <PageWrapper>
      <View>
        {/** form */}
        <View>
          {/** ville */}
          <View className="my-3 gap-1">
            <Text className="text-xl font-raleway-semibold mb-1">Ville</Text>

            <TouchableOpacity onPress={openLocationCitySheet}>
              <CustomNewInput
                placeholder="Abidjan"
                disabled
                value={locationCity.lib_ville}
                right={<ChevronDownIcon stroke={"#D3D5DA"} />}
              />
            </TouchableOpacity>
          </View>

          {/** commne */}
          <View className="my-3 gap-1">
            <Text className="text-xl font-raleway-semibold mb-1">Commune</Text>

            <TouchableOpacity onPress={openLocationTownSheet}>
              <CustomNewInput
                placeholder="Koumassi"
                disabled
                value={locationTown.lib_commune}
                right={<ChevronDownIcon stroke={"#D3D5DA"} />}
              />
            </TouchableOpacity>
          </View>

          {/** commune */}
          {/* <CustomSelect
            label="Commune"
            defaultLabel="Sélectionnez une commune"
            selectedValue={selectedTown}
            datas={towns}
            onValueChange={(value) => {
              if (value === "empty") return;
              setSelectedTown(value);
            }}
          /> */}

          {/** quartier */}
          <View className="my-3 gap-1">
            <Text className="text-xl font-raleway-semibold mb-1">Quartier</Text>

            <CustomNewInput
              placeholder="Yopougon"
              value={quartier}
              onChangeText={setQuartier}
            />
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
              {parseFloat(String(prix_total)) +
                Number(deliveryPriceData?.data) || 0}
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
      </View>

      {/** bottom city sheet */}
      <>
        <BottomSheetModal
          ref={bottomSheetModalCityRef}
          backdropComponent={renderBackdrop}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={true}
          enableOverDrag={false}
          enableDynamicSizing={false}
          topInset={insets.top}
          bottomInset={insets.bottom}
          handleIndicatorStyle={{
            backgroundColor: "#D3D5DA",
          }}
          snapPoints={["50%"]}>
          <View style={{ flex: 1 }}>
            <Text className="text-center text-lg font-raleway-semi-bold mb-4">
              Sélectionnez une ville
            </Text>
            <BottomSheetFlatList
              data={citiesDataToSheet}
              keyExtractor={(i: ILocationCity) => String(i.hashid)}
              renderItem={renderCityItem}
              contentContainerStyle={{ paddingBottom: 16 }}
              style={{ flex: 1 }}
              // getItemLayout={(data: ILocationCity[] | null, index: number) => ({
              //   length: 56,
              //   offset: 56 * index,
              //   index,
              // })}
              initialNumToRender={12}
              maxToRenderPerBatch={12}
              windowSize={5}
              updateCellsBatchingPeriod={50}
              removeClippedSubviews
              extraData={locationCity.hashid}
            />
          </View>
        </BottomSheetModal>
      </>

      {/** bottom town sheet */}
      <>
        <BottomSheetModal
          ref={bottomSheetModalTownRef}
          backdropComponent={renderBackdrop}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={true}
          enableOverDrag={false}
          enableDynamicSizing={false}
          topInset={insets.top}
          bottomInset={insets.bottom}
          handleIndicatorStyle={{
            backgroundColor: "#D3D5DA",
          }}
          snapPoints={["50%"]}>
          <View style={{ flex: 1 }}>
            <Text className="text-center text-lg font-raleway-semi-bold mb-4">
              Sélectionnez une commune
            </Text>
            <BottomSheetFlatList
              data={townsDataToSheet}
              keyExtractor={(i: ILocationTown) => String(i.hashid)}
              renderItem={renderTownItem}
              contentContainerStyle={{ paddingBottom: 16 }}
              style={{ flex: 1 }}
              initialNumToRender={12}
              maxToRenderPerBatch={12}
              windowSize={5}
              updateCellsBatchingPeriod={50}
              removeClippedSubviews
              extraData={locationTown.hashid}
            />
          </View>
        </BottomSheetModal>
      </>
    </PageWrapper>
  );
};

export default DeliveryScreen;
