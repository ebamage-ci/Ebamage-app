import icons from "@/constants/icons";
import { images } from "@/constants/Images";
import { Image, TouchableOpacity, View } from "react-native";

const Profil = () => {
  return (
    <View>
      <Image
        source={images.profile}
        className="size-24 rounded-full relative"
      />
      <TouchableOpacity
        className="justify-center items-center rounded-full bg-[#4392F9] absolute right-0 bottom-0 size-8 border-[3px] border-white "
        activeOpacity={0.6}>
        <Image source={icons.edit} className="size-[13px]" />
      </TouchableOpacity>
    </View>
  );
};

export default Profil;
