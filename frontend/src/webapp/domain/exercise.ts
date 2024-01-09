import {IntegerRange} from "./integer-range";

export interface Exercise {
  id: string;
  name: string;
  description: string;
  setRangeBottom: number;
  setRangeTop: number;
  repRangeBottom: number;
  repRangeTop: number;
}
