import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
import PropTypes from 'prop-types';
import HomeIcon from './HomeIcon';

function UserIcon({size}) {
  const size_ = size ?? 25;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size_}
      height={size_ * 0.85}
      viewBox="0 0 27.053 27.053">
      <G data-name="Groupe 284">
        <G data-name="Groupe 283">
          <Circle
            data-name="Ellipse 52"
            cx={7.11}
            cy={7.11}
            r={7.11}
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            transform="translate(-552.445 2843.558) translate(558.861 -2842.558)"
          />
        </G>
        <Path
          data-name="Trac\xE9 182"
          d="M578.5-2817.505h0a10.833 10.833 0 00-10.833-10.833h-3.387a10.833 10.833 0 00-10.832 10.833h0"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          transform="translate(-552.445 2843.558)"
        />
      </G>
    </Svg>
  );
}

HomeIcon.propTypes = {
  size: PropTypes.number,
};
export default UserIcon;
