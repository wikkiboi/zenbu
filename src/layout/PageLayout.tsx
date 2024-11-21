import { Outlet } from "@tanstack/react-router";
import Header from "./Header";
import Body from "./Body";

export default function PageLayout() {
  return (
    <>
      <Header />
      <Body>
        <Outlet />
      </Body>
    </>
  );
}
