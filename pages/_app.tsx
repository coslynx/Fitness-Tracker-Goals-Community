"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/react";
import { useState } from "react";
import { Provider } from "zustand";
import { useStore } from "@/lib/store";
import { Loader } from "@/components/common/Loader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
  pageProps: { session, ...pageProps },
}: {
  children: React.ReactNode;
  pageProps: { session: Session | null; [key: string]: any };
}) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <Provider store={useStore}>
          <SessionProvider session={session}>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}