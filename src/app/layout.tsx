import "./globals.css";
import { ReactQueryWrapper } from "@/app/ReactQueryWrapper";
import { CustomAxiosInterceptors } from "@/app/CustomAxiosInterceptors";
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
        <CustomAxiosInterceptors />

        <ReactQueryWrapper>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
