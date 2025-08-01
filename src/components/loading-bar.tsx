interface LoadingBarProps {
  isLoading: boolean;
  isFetching: boolean;
}
export default function LoadingBar({ isLoading, isFetching }: LoadingBarProps) {
  return (
    <>
      {(isLoading || isFetching) && (
        <div className="absolute top-0 left-0 w-full h-1 bg-accent animate-fadePulse"></div>
      )}
    </>
  );
}
