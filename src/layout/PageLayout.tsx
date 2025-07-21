import { Outlet } from "@tanstack/react-router";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default function PageLayout() {
  return (
    <>
      <Header />
      <Body>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <Suspense
            fallback={
              <span className="loading loading-spinner text-primary"></span>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Body>
      <Footer />
    </>
  );
}
