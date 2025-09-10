import Svg, {
  Defs,
  Image,
  Pattern,
  Rect,
  SvgProps,
  Use,
} from "react-native-svg";
const ConstructionIcon = (props: SvgProps) => (
  <Svg width={168} height={168} viewBox="0 0 168 168" fill="none" {...props}>
    <Rect
      width={168}
      height={168}
      fill="url(#pattern0_2802_9617)"
      fillOpacity={0.5}
    />
    <Defs>
      <Pattern
        id="pattern0_2802_9617"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}>
        <Use xlinkHref="#image0_2802_9617" transform="scale(0.0078125)" />
      </Pattern>
      <Image
        id="image0_2802_9617"
        width={128}
        height={128}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
export default ConstructionIcon;
