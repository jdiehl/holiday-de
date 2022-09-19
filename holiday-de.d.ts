declare namespace holidayDE {
  type StateCode = "bw" | "by" | "bb" | "he" | "mv" | "nw" | "rp" | "sl" | "sn" | "st" | "th";

  interface MomentLike {
    toDate(): Date
  }

  export function setState(stateCode: StateCode): void;
  export function isHoliday(date: Date | MomentLike): string | false;
  export function isWorkday(date: Date | MomentLike): boolean;
}

export = holidayDE;

