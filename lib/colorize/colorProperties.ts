

import { checkType } from "../../utils/validation";
import { hexToRgbString } from "./colorString";


// CALCULATE THE LUMINANCE VALUE OF AN RGB COLOR STRING
export function colorLuminance(color: string): number {
  // Extract the hex values for each channel (red, green, blue)
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Calculate the relative luminance of the color
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // Return the relative luminance value (out of 1 max)
  return luminance;
}

// CALCULATE THE BRIGHTNESS VALUE OF AN RGB COLOR STRING
export function colorBrightness(color: string): number {
  color = checkType(color, 'rgb') ? hexToRgbString(color) : color;
  // Extract the hex values for each channel (red, green, blue)
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  // Calculate the brightness using the luminosity formula
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return the brightness value (out of 100 max)
  return Number(brightness.toFixed(2));
}