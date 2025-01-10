import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Shield, Image } from "lucide-react";
// import Link from "next/link"
import { Link } from "react-router";
import { company_name } from "@/constants/global.constants";
import * as React from "react";

// TODO this will be a stepper when users clicks aggre move to step two which is to upload

interface UserAgreementProps {
  onSelectChecked: () => void;
}
export default function UserAgreement({ onSelectChecked }: UserAgreementProps) {
  const [agreed, setAgreed] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to {company_name}!</h1>
        <p className="text-gray-600">
          Before you get started, check out our helpful guidelines or{" "}
          <Link to="#" className="text-gray-600 hover:text-gray-900 underline">
            learn more
          </Link>{" "}
          about our review process.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Content License</h2>
            <p className="text-gray-600 text-sm mb-4">
              All content is released under the Content License, which makes
              them safe to use without asking for permission - even for
              commercial purposes.
            </p>
            <Link
              to="#"
              className="text-emerald-600 hover:text-emerald-700 text-sm inline-flex items-center"
            >
              Content License
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Quality</h2>
            <p className="text-gray-600 text-sm mb-4">
              All media must be high quality, clear and purposeful. The media
              must be original and must exclude graphic nudity, violence or
              hate.
            </p>
            <Link
              to="#"
              className="text-emerald-600 hover:text-emerald-700 text-sm inline-flex items-center"
            >
              Quality guidelines
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-4">
              <Image className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Media</h2>
            <p className="text-gray-600 text-sm mb-4">
              {company_name} offers the largest range of media types. Over 3 million+
              high quality stock photos, vectors, illustrations, music.
            </p>
            <Link
              to="#"
              className="text-emerald-600 mt-4 hover:text-emerald-700 text-sm inline-flex items-center"
            >
              Media guidelines
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            className={`size-4 cursor-pointer`}
            id="agree"
            onChange={function () {
              setAgreed(!agreed);
            }}
          />
          <label
            htmlFor="agree"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I understand and agree
          </label>
        </div>
        <Button
          disabled={!agreed}
          onClick={function () {
            if (agreed) {
              onSelectChecked();
            }
          }}
          className=" bg-black hover:bg-black/85"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
