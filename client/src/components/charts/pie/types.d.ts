type PieChartData = {
  id: string;
  label: string;
  value: number;
};

export interface PieChartProps {
  data: PieChartData[];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  onPathMouseClick?: (data: PieChartData) => void;
  onPathMouseEnter?: (data: PieChartData) => void;
  onPathMouseLeave?: (data: PieChartData) => void;
}
