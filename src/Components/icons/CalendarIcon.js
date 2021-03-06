import React from 'react';
import Svg, {LinearGradient, Path, Defs, Stop} from 'react-native-svg';
import PropTypes from 'prop-types';

// Outline
export const OCalendarIcon = ({color = 'black', size = 40}) => {
  return (
    <Svg
      width={size}
      height={size * 0.975}
      viewBox="0 0 60 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9.44277 31.1451V4.98469H20.294V0H22.8414V4.98469H33.4354V0H35.9951V4.98469H46.5891V0H49.1488V4.98469H60V48.5242H27.275C25.5848 54.4029 20.2205 58.7385 13.9131 58.7385C6.25845 58.7385 3.05176e-05 52.3576 3.05176e-05 44.5683C-0.0122147 38.3588 3.95594 33.0557 9.44277 31.1451ZM57.4403 7.53215H49.1488V13.019H46.6014V7.53215H35.9951V13.019H33.4477V7.53215H22.8537V13.019H20.3062V7.53215H11.9902V19.2774H57.4403V7.53215ZM27.7404 45.9767H57.4403V45.9645V21.8371H11.9902V30.5327C12.6148 30.447 13.2517 30.398 13.9008 30.398C21.5554 30.398 27.8139 36.7789 27.8139 44.5683C27.8139 45.0459 27.7894 45.5113 27.7404 45.9767ZM13.9008 56.1788C20.1592 56.1788 25.2664 50.9492 25.2664 44.556C25.2664 38.1751 20.1592 32.9332 13.9008 32.9332C7.6424 32.9332 2.53524 38.1629 2.53524 44.556C2.53524 50.9492 7.65465 56.1788 13.9008 56.1788Z"
        fill={color}
      />
      <Path
        d="M15.1868 42.7801H19.2774V45.3276H12.6271V35.2847H15.1868V42.7801Z"
        fill={color}
      />
    </Svg>
  );
};

OCalendarIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
// Filled
export const FCalendarIcon = ({color = 'black'}) => {
  return (
    <Svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.51586 8.35013C1.57814 8.35013 0 10.0796 0 12.1804C0 14.2812 1.58813 16 3.51586 16C5.45358 16 7.03173 14.2812 7.03173 12.1804C7.04172 10.0796 5.45358 8.35013 3.51586 8.35013ZM5.1839 12.435H3.12632V9.12467H3.91539V11.5862H5.1839V12.435ZM2.92656 4.70026H17V12.6366H7.80082C7.8208 12.4881 7.8208 12.3289 7.8208 12.1698C7.8208 9.61273 5.88308 7.51194 3.51586 7.51194C3.3161 7.51194 3.11633 7.53316 2.92656 7.55438V4.70026ZM17 0V3.86207H2.92656V0H5.50353V1.80371H6.2926V0H9.56874V1.80371H10.3578V0H13.6439V1.80371H14.433V0H17Z"
        fill={color}
      />
    </Svg>
  );
};

FCalendarIcon.propTypes = {
  color: PropTypes.string,
};

// Gradient
export const GCalendarIcon = ({color1 = 'black', color2 = 'white'}) => {
  return (
    <Svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="4"
          y1="0"
          x2="8"
          y2="18"
          gradientUnits="userSpaceOnUse">
          <Stop offset="0.4" stopColor={color1} />
          <Stop offset="1.5" stopColor={color2} />
        </LinearGradient>
      </Defs>
      <Path
        d="M3.51586 8.35013C1.57814 8.35013 0 10.0796 0 12.1804C0 14.2812 1.58813 16 3.51586 16C5.45358 16 7.03173 14.2812 7.03173 12.1804C7.04172 10.0796 5.45358 8.35013 3.51586 8.35013ZM5.1839 12.435H3.12632V9.12467H3.91539V11.5862H5.1839V12.435ZM2.92656 4.70026H17V12.6366H7.80082C7.8208 12.4881 7.8208 12.3289 7.8208 12.1698C7.8208 9.61273 5.88308 7.51194 3.51586 7.51194C3.3161 7.51194 3.11633 7.53316 2.92656 7.55438V4.70026ZM17 0V3.86207H2.92656V0H5.50353V1.80371H6.2926V0H9.56874V1.80371H10.3578V0H13.6439V1.80371H14.433V0H17Z"
        fill="url(#paint0_linear)"
      />
    </Svg>
  );
};
GCalendarIcon.propTypes = {
  color1: PropTypes.string,
  color2: PropTypes.string,
};
