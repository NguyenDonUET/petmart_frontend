import { Suspense } from "react";
import LoadingList from "./Admin/LoadingList";

const LazyLoadingContainer = ({ children }) => {
  return <Suspense fallback={<LoadingList />}>{children}</Suspense>;
};

export default LazyLoadingContainer;
