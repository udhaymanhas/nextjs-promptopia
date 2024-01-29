import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

/**
 *
 * layout will be wrapped around everything
 */
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};
export default RootLayout;
