import { Dimensions } from "react-native";

const width = Dimensions.get('screen').width;

const WIDTH = width * 0.9;
const HEIGHT = WIDTH * 1.02;
const SPACING = WIDTH * 0.03;

export const SIZES = {
  WIDTH,
  HEIGHT,
  SPACING,
}