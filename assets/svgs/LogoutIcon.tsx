import Svg, { Path, SvgProps } from "react-native-svg";
const LogoutIcon = (props: SvgProps) => (
  <Svg width={30} height={32} viewBox="0 0 30 32" fill="none" {...props}>
    <Path
      d="M11.25 27.1848H6.25C5.58696 27.1848 4.95107 26.912 4.48223 26.4265C4.01339 25.9409 3.75 25.2824 3.75 24.5958V6.47279C3.75 5.78614 4.01339 5.12762 4.48223 4.64209C4.95107 4.15656 5.58696 3.88379 6.25 3.88379H11.25M20 22.0068L26.25 15.5343M26.25 15.5343L20 9.06178M26.25 15.5343H11.25"
      stroke="#1E1E1E"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LogoutIcon;
