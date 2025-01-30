import * as React from "react";
import UserAgreement from "./user-agreement";
import MemeUploadForm from "./form";
import { useAppSelector } from "@/store/redux-state-hook";
import PrevButton from "@/components/prev-button";
import { useNavigate } from "react-router";

export default function UploadMain() {
  const [currentView, setCurrentView] = React.useState<"agree" | "upload">(
    "agree"
  );
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  React.useEffect(() => {
    if (user && user.isAcceptUserAgreeMent) {
      setCurrentView("upload");
    }
  }, [user]);
  return (
    <div className="min-h-screen relative flex items-center ">
      <PrevButton
        onClick={() => navigate("/")}
        className="absolute top-7 left-6"
      />
      {currentView === "agree" && (
        <UserAgreement
          onSelectChecked={() => {
            setCurrentView("upload");
          }}
        />
      )}
      {currentView === "upload" && <MemeUploadForm />}
    </div>
  );
}
