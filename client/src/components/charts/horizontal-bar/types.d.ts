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
  onPathMouseClick?: (e: MouseEvent<HTMLElement>, data: HorizontalBarChartData) => void;
  onPathMouseEnter?: (e: MouseEvent<HTMLElement>, data: HorizontalBarChartData) => void;
  onPathMouseLeave?: (e: MouseEvent<HTMLElement>, data: HorizontalBarChartData) => void;
  onPathMouseMove?: (e: MouseEvent<HTMLElement>, data: HorizontalBarChartData) => void;
}
