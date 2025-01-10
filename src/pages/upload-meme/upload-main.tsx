import * as React from "react";
import UserAgreement from "./user-agreement";
import MemeUploadForm from "./upload-form";

export default function UploadMain() {
  const [currentView, setCurrentView] = React.useState<"agree" | "upload">(
    "agree"
  );

  return (
    <div className="min-h-screen flex items-center ">
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
