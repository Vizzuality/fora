type HorizontalBarChartData = {
  id: string;
  label: string;
  value: number;
};

export interface HorizontalBarChartProps {
  data: HorizontalBarChartData[];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  onPathMouseClick?: (data: HorizontalBarChartData) => void;
  onPathMouseEnter?: (data: HorizontalBarChartData) => void;
  onPathMouseLeave?: (data: HorizontalBarChartData) => void;
}
