import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
const FilterIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#232327"
        d="M11.325 12.049V6.384H9.662v5.665H7.17l3.325 3.224 3.324-3.224h-2.493ZM5.507.728 2.182 3.952h2.493v5.664h1.663V3.952H8.83L5.507.728Zm5.818 11.32V6.385H9.662v5.665H7.17l3.325 3.224 3.324-3.224h-2.493ZM5.507.729 2.182 3.952h2.493v5.664h1.663V3.952H8.83L5.507.728Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default FilterIcon;
