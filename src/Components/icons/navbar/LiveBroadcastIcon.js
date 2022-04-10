import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';
import PropTypes from 'prop-types';
import HomeIcon from './HomeIcon';
import {mainColor} from '../../../Utils/colors';

function LiveBroadcastIcon({size = 31, color = mainColor}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 0.8}
      viewBox="0 0 32.005 27.349">
      <G
        data-name="Groupe 524"
        transform="translate(-1492.796 544.263)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}>
        <Circle
          data-name="Ellipse 73"
          cx={1.875}
          cy={1.875}
          r={1.875}
          transform="translate(1506.923 -532.463)"
        />
        <G data-name="Groupe 429">
          <Path
            data-name="Trac\xE9 318"
            d="M23.602 0a14.976 14.976 0 016.4 12.282 14.974 14.974 0 01-6.4 12.281"
            transform="translate(1493.796 -542.87)"
          />
          <Path
            data-name="Trac\xE9 319"
            d="M6.404 0a14.975 14.975 0 00-6.4 12.282 14.973 14.973 0 006.4 12.281"
            transform="translate(1493.796 -542.87)"
          />
          <Path
            data-name="Trac\xE9 320"
            d="M19.844 19.193a8.43 8.43 0 003.6-6.914 8.433 8.433 0 00-3.6-6.915"
            transform="translate(1493.796 -542.87)"
          />
          <Path
            data-name="Trac\xE9 321"
            d="M10.16 5.367a8.431 8.431 0 00-3.605 6.915 8.431 8.431 0 003.605 6.914"
            transform="translate(1493.796 -542.87)"
          />
        </G>
      </G>
    </Svg>
  );
}

HomeIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};
export default LiveBroadcastIcon;
