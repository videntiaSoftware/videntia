// Global type definitions for the project

declare module 'long' {
  export = Long;
  
  interface Long {
    high: number;
    low: number;
    unsigned: boolean;
    add(addend: Long | number | string): Long;
    subtract(subtrahend: Long | number | string): Long;
    multiply(multiplier: Long | number | string): Long;
    divide(divisor: Long | number | string): Long;
    toNumber(): number;
    toString(radix?: number): string;
  }
  
  declare namespace Long {
    function fromNumber(value: number, unsigned?: boolean): Long;
    function fromString(str: string, unsigned?: boolean | number, radix?: number): Long;
    const MAX_VALUE: Long;
    const MIN_VALUE: Long;
    const MAX_SAFE_INTEGER: Long;
    const MIN_SAFE_INTEGER: Long;
  }
}

// Type for Google Ads API to avoid conflicts
declare module 'google-ads-api' {
  export class GoogleAdsApi {
    constructor(config: any);
    [key: string]: any;
  }
}
