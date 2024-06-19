import "./globals.css";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Fancy Form</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
