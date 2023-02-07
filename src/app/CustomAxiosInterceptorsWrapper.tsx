"use client";

import "@/utils/axios";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CustomAxiosInterceptorsWrapper = ({ children }: Props) => (
  <>{children}</>
);
