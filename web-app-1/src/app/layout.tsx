import type { Metadata } from "next";
import "./globals.css";
import { ChakraProvider } from "@/providers/ChakraProvider";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { AuthGuard } from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Rick and Morty 角色浏览器 - Web Team Challenge v3.5",
  description: "使用 NextJS、ChakraUI 和 Apollo Client 构建的 Rick and Morty 角色浏览应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <ChakraProvider>
          <ApolloProvider>
            <AuthGuard>
              {children}
            </AuthGuard>
          </ApolloProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
