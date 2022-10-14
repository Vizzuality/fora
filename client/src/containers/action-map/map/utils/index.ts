export function getStyles(color, selected: boolean, count: number) {
  const getDefaultFill = () => {
    if (!count) return '#efefef';
    if (!selected) return '#efefef';

    return color;
  };

  const getHoverFill = () => {
    if (!count) return '#e9e9e9';
    if (!selected) return '#e9e9e9';

    return color.brighten(0.1);
  };

  const getPressedFill = () => {
    if (!count) return '#e0e0e0';
    if (!selected) return '#e0e0e0';

    return color.brighten(0.2);
  };

  return {
    default: {
      fill: getDefaultFill(),
      stroke: '#CDCDCD',
      strokeWidth: 1,
      outline: 'none',
    },
    hover: {
      fill: getHoverFill(),
      stroke: '#CDCDCD',
      strokeWidth: 1,
      outline: 'none',
    },
    pressed: {
      fill: getPressedFill(),
      stroke: '#CDCDCD',
      strokeWidth: 1,
      outline: 'none',
    },
  };
}
