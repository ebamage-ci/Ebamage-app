import Svg, { Path, SvgProps } from "react-native-svg";
const UserIcon = (props: SvgProps) => (
  <Svg width={30} height={32} viewBox="0 0 30 32" fill="none" {...props}>
    <Path
      d="M25 27.1848V24.5958C25 23.2225 24.4732 21.9054 23.5355 20.9344C22.5979 19.9633 21.3261 19.4178 20 19.4178H10C8.67392 19.4178 7.40215 19.9633 6.46447 20.9344C5.52678 21.9054 5 23.2225 5 24.5958V27.1848M20 9.06178C20 11.9215 17.7614 14.2398 15 14.2398C12.2386 14.2398 10 11.9215 10 9.06178C10 6.20206 12.2386 3.88379 15 3.88379C17.7614 3.88379 20 6.20206 20 9.06178Z"
      stroke="#1E1E1E"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default UserIcon;
