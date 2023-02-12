import "./globals.css";
import { ReactQueryWrapper } from "@/app/ReactQueryWrapper";
import RootStyleRegistry from "./registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ReactQueryWrapper>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
