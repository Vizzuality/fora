export interface ViewProps {
  data: Record<string, any>[];
  onClick?: (e: React.MouseEvent, geoProperties) => void;
  onMouseEnter?: (e: React.MouseEvent, geoProperties) => void;
  onMouseLeave?: (e: React.MouseEvent, geoProperties) => void;
  onMouseMove?: (e: React.MouseEvent, geoProperties) => void;
}
