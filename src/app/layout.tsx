import "./globals.css";
import { ReactQueryWrapper } from "@/app/ReactQueryWrapper";
import { CustomAxiosInterceptorsWrapper } from "@/app/CustomAxiosInterceptorsWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <CustomAxiosInterceptorsWrapper>
          <ReactQueryWrapper>{children}</ReactQueryWrapper>
        </CustomAxiosInterceptorsWrapper>
      </body>
    </html>
  );
}
