export function getStyles(color, selected: boolean, count: number) {
  const getDefaultFill = () => {
    if (!count) return '#ddd';
    if (!selected) return '#bbb';

    return color;
  };

  const getHoverFill = () => {
    if (!count) return '#ddd';
    if (!selected) return '#aaa';

    return color.brighten(0.1);
  };

  const getPressedFill = () => {
    if (!count) return '#ddd';
    if (!selected) return '#aaa';

    return color.brighten(0.2);
  };

  return {
    default: {
      fill: getDefaultFill(),
      stroke: '#FFF',
      strokeWidth: 2,
      outline: 'none',
    },
    hover: {
      fill: getHoverFill(),
      stroke: '#FFF',
      strokeWidth: 2,
      outline: 'none',
    },
    pressed: {
      fill: getPressedFill(),
      stroke: '#FFF',
      strokeWidth: 2,
      outline: 'none',
    },
  };
}
