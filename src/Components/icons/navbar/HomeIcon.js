import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import PropTypes from 'prop-types';
import {mainColor} from '../../../Utils/colors';

function HomeIcon({size}) {
  const size_ = size ?? 30;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size_}
      height={size_ * 0.92}
      viewBox="0 0 31.207 30.393">
      <G data-name="Groupe 137">
        <G
          data-name="Groupe 136"
          fill="none"
          stroke={mainColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}>
          <Path
            data-name="Trac\xE9 90"
            d="M24.562 14.916v10.322a3.154 3.154 0 01-3.155 3.154H6.986a3.155 3.155 0 01-3.155-3.154V14.916"
            transform="translate(-1304.13 5656.305) translate(1305.536 -5655.305)"
          />
          <Path
            data-name="Trac\xE9 91"
            d="M0 11.566L14.2 0l14.2 11.566"
            transform="translate(-1304.13 5656.305) translate(1305.536 -5655.305)"
          />
        </G>
      </G>
    </Svg>
  );
}

HomeIcon.propTypes = {
  size: PropTypes.number,
};

export default HomeIcon;
