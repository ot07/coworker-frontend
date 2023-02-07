"use client";

import { createEmotionCache, MantineProvider } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode } from "react";

const cache = createEmotionCache({ key: "my" });
cache.compat = true;

export default function RootStyleRegistry({
  children,
}: {
  children: ReactNode;
}) {
  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return <MantineProvider emotionCache={cache}>{children}</MantineProvider>;
}
