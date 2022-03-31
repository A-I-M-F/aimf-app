import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

import PropTypes from 'prop-types';
import {mainColor} from '../../Utils/colors';

class BackArrowIcon extends React.PureComponent {
  render = (size = 21) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={size * 0.7}
        height={size}
        viewBox="0 0 13.003 21.992">
        <G data-name="Groupe 30">
          <Path
            data-name="Trac\xE9 7"
            d="M193.316-4344.209l-8.175 8.168 8.175 8.167"
            fill="none"
            stroke={mainColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            transform="translate(-183.142 4347.038)"
          />
        </G>
      </Svg>
    );
  };
}

BackArrowIcon.propTypes = {
  size: PropTypes.number,
};

export default BackArrowIcon;
