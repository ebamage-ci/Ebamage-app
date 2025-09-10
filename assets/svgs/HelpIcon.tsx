import Svg, { Path, SvgProps } from "react-native-svg";
const HelpIcon = (props: SvgProps) => (
  <Svg width={30} height={32} viewBox="0 0 30 32" fill="none" {...props}>
    <Path
      d="M11.3625 11.6504C11.6564 10.7852 12.2364 10.0557 12.9999 9.59098C13.7634 9.12629 14.6611 8.95642 15.534 9.11147C16.4068 9.26652 17.1985 9.73647 17.7688 10.4381C18.3392 11.1397 18.6513 12.0277 18.65 12.9449C18.65 15.5339 14.9 16.8283 14.9 16.8283M15 22.0063H15.0125M27.5 15.5339C27.5 22.6832 21.9036 28.4788 15 28.4788C8.09644 28.4788 2.5 22.6832 2.5 15.5339C2.5 8.38453 8.09644 2.58887 15 2.58887C21.9036 2.58887 27.5 8.38453 27.5 15.5339Z"
      stroke="#1E1E1E"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default HelpIcon;
