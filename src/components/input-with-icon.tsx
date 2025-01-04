import * as React from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import clsx from "clsx";
interface InputWithIconPrps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconStyle?: string;
  inputType?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  inputStyle?: string;

  // Icon: React.ReactNode | React.ComponentType;
}

function InputWithIcon({
  Icon,
  iconStyle,
  inputStyle,
  inputType,
  placeholder,
}: InputWithIconPrps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-10">Input with end icon</Label>
      <div className="relative">
        <Input
          id="input-10"
          className={clsx(inputStyle, "peer pe-9")}
          // className="peer pe-9"
          placeholder={placeholder}
          type={inputType}
        />
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Icon className={clsx(iconStyle)} />
        </div>
      </div>
    </div>
    // <>
    //   <Input />
    // </>
  );
}

export default InputWithIcon;

// Dependencies: pnpm install lucide-react

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Mail } from "lucide-react";

// export default function InputDemo() {
//   return (
//     <div className="space-y-2">
//       <Label htmlFor="input-10">Input with end icon</Label>
//       <div className="relative">
//         <Input id="input-10" className="peer pe-9" placeholder="Email" type="email" />
//         <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
//           <Mail size={16} strokeWidth={2} aria-hidden="true" />
//         </div>
//       </div>
//     </div>
//   );
// }
