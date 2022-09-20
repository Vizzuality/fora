import { MouseEvent } from 'react';

export interface FilterSelectionProps {
  /**
   * selection text to display
   */
  text: string;
  /**
   * Selection array
   */
  data: any[];
  /**
   * Fetching
   */
  dataIsFetching: boolean;
  /**
   * Fetched
   */
  dataIsFetched: boolean;
  /**
   * onReset callback
   */
  onReset: (e: MouseEvent) => void;
}
