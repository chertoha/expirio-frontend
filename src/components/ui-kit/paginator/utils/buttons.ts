import type { ReactElement } from "react";

import {
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BUTTON_TYPE = {
  ARROW_PREV: "arrow_prev",
  ARROW_NEXT: "arrow_next",
  CURRENT: "current",
  DOTS: "dots",
  DEFAULT: "default",
} as const;

export type PaginationButton = {
  title: string;
  value: number;
  type: (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];
  Btn: (props: any) => ReactElement;
};

export const PREV_BTN = (currentPage: number): PaginationButton => ({
  title: "",
  value: currentPage - 1,
  type: BUTTON_TYPE.ARROW_PREV,
  Btn: PaginationPrevious,
});

export const NEXT_BTN = (currentPage: number): PaginationButton => ({
  title: "",
  value: currentPage + 1,
  type: BUTTON_TYPE.ARROW_NEXT,
  Btn: PaginationNext,
});

export const PAGE_BTN = (page: number): PaginationButton => ({
  title: page.toString(),
  value: page,
  type: BUTTON_TYPE.DEFAULT,
  Btn: PaginationLink,
});

export const CURRENT_PAGE_BTN = (currentPage: number): PaginationButton => ({
  title: currentPage.toString(),
  value: currentPage,
  type: BUTTON_TYPE.CURRENT,
  Btn: PaginationLink,
});

export const LEFT_DOTS_BTN = (currentPage: number): PaginationButton => ({
  title: "",
  value: currentPage - 4,
  type: BUTTON_TYPE.DOTS,
  Btn: PaginationEllipsis,
});

export const RIGHT_DOTS_BTN = (currentPage: number): PaginationButton => ({
  title: "",
  value: currentPage + 4,
  type: BUTTON_TYPE.DOTS,
  Btn: PaginationEllipsis,
});

export const LAST_PAGE_BTN = (page: number): PaginationButton => ({
  title: "",
  value: page,
  type: BUTTON_TYPE.DEFAULT,
  Btn: PaginationLink,
});
