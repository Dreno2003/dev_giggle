import { Toaster } from "react-hot-toast";
interface AlertToasterProps {
  duration?: number;
  animation?: "backwards";
  position?: "top-right" | "bottom-left" | "top-center" | "top-left";
}

export  function AlertToaster({
  duration = 2000,
  animation,
  position,
}: AlertToasterProps) {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: duration,
        }}
        containerStyle={{
          animation: animation,
        }}
        position={position}
      />
    </>
  );
}

;
