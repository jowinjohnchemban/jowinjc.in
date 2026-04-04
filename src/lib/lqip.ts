/**
 * Import generated LQIP (Low Quality Image Placeholder) data
 * Generated at build time via scripts/generate-lqip.mjs
 * 
 * Configuration: Define images in .lqiprc.json
 * Add new images by updating the config and regenerating
 */

import lqipDataRaw from '../generated/lqip/lqip-data.json';

// Type-safe LQIP data structure
type LQIPImage = {
  blurDataURL: string;
  imgAttributes?: any;
  svg?: any;
  width: number;
  height: number;
  lowResImage: string;
};

type LQIPData = Record<string, LQIPImage>;

const lqipData: Record<string, any> = lqipDataRaw;

/**
 * Get LQIP blur data for a specific image by key
 * @param imageKey - The key of the image defined in .lqiprc.json
 * @returns Blur data URL or undefined if not found
 */
export function getLQIP(imageKey: string): string | undefined {
  return lqipData[imageKey]?.blurDataURL;
}

/**
 * Get full LQIP data for a specific image by key
 * @param imageKey - The key of the image defined in .lqiprc.json
 * @returns Complete LQIP image data or undefined if not found
 */
export function getLQIPImage(imageKey: string): LQIPImage | undefined {
  return lqipData[imageKey];
}

/**
 * Get profile image LQIP (convenience helper)
 */
export function getProfileLQIP(): string | undefined {
  return getLQIP('profile');
}

/**
 * Export all LQIP data for direct access if needed
 */
export const LQIP: LQIPData = lqipData;
