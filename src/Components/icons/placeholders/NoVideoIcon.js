import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

function NoVideoIcon({size}) {
  const size_ = size ?? 31;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size_}
      height={size_ * 0.75}
      viewBox="0 0 44.584 37.765">
      <G
        data-name="Groupe 335"
        transform="translate(-359.598 923.533)"
        fill="none"
        stroke="#f2612d"
        strokeLinecap="round"
        strokeLinejoin="round">
        <G data-name="Groupe 334" strokeWidth={4}>
          <Path
            data-name="Trac\xE9 229"
            d="M368.038-893.645a3.972 3.972 0 002.144.623h16.171a4 4 0 004-4v-3.611l8.918 4.562a2 2 0 002.911-1.781v-14.511a2 2 0 00-2.911-1.78l-8.918 4.562v-3.612a3.982 3.982 0 00-.58-2.075"
          />
          <Path
            data-name="Trac\xE9 230"
            d="M382.756-917.193h-12.574a4 4 0 00-4 4v13.386"
          />
        </G>
        <Path
          data-name="Ligne 192"
          transform="translate(362.162 -920.969)"
          strokeWidth={3.626}
          d="M32.637 0L0 32.637"
        />
      </G>
    </Svg>
  );
}

NoVideoIcon.propTypes = {
  size: PropTypes.number,
};

export default NoVideoIcon;
