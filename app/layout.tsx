import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import { ColorVarsProvider } from "@/providers/color-vars-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barlos Dashboard",
  description: "Security scan management dashboard for Barlos Workflow Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorVarsProvider />
          <AuthProvider>
            {children}
            <Toaster
              position="bottom-right"
              richColors
              toastOptions={{
                className: "border border-border",
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
