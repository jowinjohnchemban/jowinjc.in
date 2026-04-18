/**
 * Import generated LQIP (Low Quality Image Placeholder) data
 * Generated at build time via scripts/generate-lqip.mjs
 *
 * Configuration: Define images in .lqiprc.json
 * Add new images by updating the config and regenerating
 */

import lqipDataRaw from '../../generated/lqip/lqip-data.json';

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

export function getLQIP(imageKey: string): string | undefined {
  return lqipData[imageKey]?.blurDataURL;
}

export function getLQIPImage(imageKey: string): LQIPImage | undefined {
  return lqipData[imageKey];
}

export function getProfileLQIP(): string | undefined {
  return getLQIP('profile');
}

export const LQIP: LQIPData = lqipData;
