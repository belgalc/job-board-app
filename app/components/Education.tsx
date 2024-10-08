"use client";

import { SubmitHandler } from "react-hook-form";
import { useFormSubmit } from "../hooks/useFormSubmit";
import UserEducationForm, {
  userEducationFormType,
} from "./forms/UserEducationForm";
import { UserEducationProps } from "@/types/interfaces";

const EducationComponent: React.FC<UserEducationProps> = ({
  userEducation,
}) => {
  const submitForm = useFormSubmit<userEducationFormType>();
  const onSubmit: SubmitHandler<userEducationFormType> = (data) => {
    return submitForm(`${process.env.NEXT_PUBLIC_API_URL}/profile/api`, data);
  };
  return (
    <div className="flex flex-col items-center mt-7 gap-3 w-full px-4 sm:px-8">
      <div className="font-medium text-2xl text-[#003366] text-center">
        Education
      </div>
      <UserEducationForm defaultValues={userEducation} onSubmit={onSubmit} />
    </div>
  );
};

export default EducationComponent;
