import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { JSX } from "react";

export const CATEGORY_ICONS: Record<string, (color: string, size: number) => JSX.Element> = {
  milk: (color, size) => <MaterialIcons name="local-drink" size={size} color={color} />,
  yogurt: (color, size) => <Ionicons name="ice-cream-outline" size={size} color={color} />,
  cheese: (color, size) => <MaterialCommunityIcons name="cheese" size={size} color={color} />,
  butter: (color, size) => <MaterialIcons name="bakery-dining" size={size} color={color} />,
  cream: (color, size) => <Ionicons name="cafe-outline" size={size} color={color} />,
  // Дефолтная иконка
  default: (color, size) => <Ionicons name="apps-outline" size={size} color={color} />,
};