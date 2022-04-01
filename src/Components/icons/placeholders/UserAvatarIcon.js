import * as React from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

function UserAvatarIcon({size}) {
  const size_ = size ?? 31;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size_}
      height={size_}
      viewBox="0 0 179 179">
      <G data-name="Ellipse 94" fill="#fff" stroke="#9f9f9f" strokeWidth={3}>
        <Circle cx={89.5} cy={89.5} r={89.5} stroke="none" />
        <Circle cx={89.5} cy={89.5} r={88} fill="none" />
      </G>
      <G data-name="Groupe 284">
        <G data-name="Groupe 283">
          <Circle
            data-name="Ellipse 52"
            cx={16.324}
            cy={16.324}
            r={16.324}
            fill="none"
            stroke="#9f9f9f"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            transform="translate(-492.445 2903.558) translate(565.88 -2842.558)"
          />
        </G>
        <Path
          data-name="Trac\xE9 182"
          d="M610.965-2785.038h0a24.872 24.872 0 00-24.872-24.872h-7.777a24.871 24.871 0 00-24.871 24.872h0"
          fill="none"
          stroke="#9f9f9f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4}
          transform="translate(-492.445 2903.558)"
        />
      </G>
    </Svg>
  );
}

UserAvatarIcon.propTypes = {
  size: PropTypes.number,
};

export default UserAvatarIcon;
