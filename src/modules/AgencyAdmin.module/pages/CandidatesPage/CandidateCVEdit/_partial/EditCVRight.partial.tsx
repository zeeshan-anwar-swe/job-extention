import Card, {
  CardBody,
  CardFooter,
  CardFooterChild,
  CardHeader,
  CardSubTitle,
  CardTitle,
} from "../../../../../../components/ui/Card";
import { FormikProps } from "formik";
import Button from "../../../../../../components/ui/Button";
import {
  profileImageUrlValidationCheck,
  textValidationCheck,
} from "../../../../../../utils/validationCheck";
import { EditCVFormValues } from "../CandidateCVEdit.page";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import { getCandidateCV } from "../../../../services/candidates";
import Icon from "../../../../../../components/icon/Icon";
import { useEffect, useRef, useState } from "react";

export const EditCVRightPartial = ({
  formik,
}: {
  formik: FormikProps<EditCVFormValues>;
}) => {
  const { componentLoading, cadnidateProfile } = useSelector(
    (state: RootState) => state.candidates,
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDownloadCV = async () => {
    const response = await getCandidateCV(cadnidateProfile.id);
    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cadnidateProfile.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("file", file);

      // cleanup old preview if exists
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      formik.setFieldValue("isShowImage", "1");
    }

    // reset input so user can pick the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("file", null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);

    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Card className="col-span-3 !sticky top-0 h-fit w-full max-lg:col-span-12 ">
      <CardHeader
        onClick={handleDownloadCV}
        className="!items-start hover:cursor-pointer"
      >
        <div>
          <CardTitle>Preview</CardTitle>
          <CardSubTitle className="cursor-pointer font-light">
            Download and Preview CV.
          </CardSubTitle>
        </div>
        <Icon size="text-xl" icon="HeroArrowUpRight" color="blue" />
      </CardHeader>

      <CardBody className="flex flex-col justify-center">
        {/* Show image only if isShowImage is true */}

        <img
          className="aspect-square w-full rounded-xl object-cover"
          src={
            formik.values.isShowImage === "0"
              ? profileImageUrlValidationCheck("")
              : preview
                ? preview
                : profileImageUrlValidationCheck(
                    cadnidateProfile?.candidate?.profilePictureUrl ?? "",
                  )
          }
          alt="profile-image"
        />

        <div className="mt-4">
          <h3>{textValidationCheck(cadnidateProfile?.candidate?.name)}</h3>
          <p className="font-light">
            {textValidationCheck(cadnidateProfile?.candidate?.email)}
          </p>
        </div>
      </CardBody>

      <CardFooter>
        <Button className="w-full"  onClick={handleUploadClick} color="zinc" variant="outline">
          Upload New Picture
        </Button>

        {preview || formik.values.file ? (
          <Button className="w-full" onClick={handleRemoveImage} color="red" variant="solid">
            Remove Uploaded Picture
          </Button>
        ) : null}

        <Button
          className="flex-1"
          onClick={() =>
            formik.setFieldValue(
              "isShowImage",
              formik.values.isShowImage === "1" ? "0" : "1",
            )
          }
          variant="solid"
          color={formik.values.isShowImage === "1" ? "zinc" : "blue"}
        >
          {formik.values.isShowImage === "1"
            ? "Hide Profile Picture"
            : "Show Profile Picture"}
        </Button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <CardFooterChild className="w-full">
          <Button
            isLoading={componentLoading}
            onClick={() => {
              formik.handleSubmit();
            }}
            className="flex-1"
            variant="solid"
          >
            {formik.values.action === "create"
              ? "Create Custom CV"
              : "Update Profile"}
          </Button>
          <Link className="w-full" to="/dashboard/candidates">
            <Button className="w-full" variant="outline" color="zinc">
              Back
            </Button>
          </Link>
        </CardFooterChild>
      </CardFooter>
    </Card>
  );
};
