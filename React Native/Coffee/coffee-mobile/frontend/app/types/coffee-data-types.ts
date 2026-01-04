import { ImageSourcePropType } from "react-native";

export type Coffee = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
  rating: number;
};