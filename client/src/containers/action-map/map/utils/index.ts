export function getStyles(color, selected: boolean, count: number) {
  const getDefaultFill = () => {
    if (!count) return '#F1F1F1';
    if (!selected) return '#F1F1F1';

    return color.hex();
  };

  const getHoverFill = () => {
    if (!count) return '#efefef';
    if (!selected) return '#efefef';

    return color.brighten(0.1).hex();
  };

  const getPressedFill = () => {
    if (!count) return '#e9e9e9';
    if (!selected) return '#e9e9e9';

    return color.brighten(0.2).hex();
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
