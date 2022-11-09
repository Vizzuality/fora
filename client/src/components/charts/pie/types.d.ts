import { PieProps } from '@visx/shape/lib/shapes/Pie';

type PieChartData = {
  id: string;
  label: string;
  value: number;
};

export interface PieChartProps<T> {
  data: PieChartData[];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  pieProps?: PieProps<T>;
  onPathMouseClick?: (data: PieChartData) => void;
  onPathMouseEnter?: (data: PieChartData) => void;
  onPathMouseLeave?: (data: PieChartData) => void;
}
