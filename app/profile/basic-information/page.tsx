import { userInfoFormType } from "@/app/components/forms/UserInfosForm";
import { fetchData } from "@/app/lib/apiUtils";
import { authOptions } from "@/app/lib/nextAuth";
import Loading from "@/app/loading";
import { getServerSession, Session } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
const BasicInformationComponent = dynamic(
  () => import("@/app/components/BasicInformations"),
  {
    ssr: true,
    loading: () => <Loading />,
  }
);
const BasicInformation = async () => {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }
  const userInfos = await fetchData<userInfoFormType>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/api`
  );
  const userData: userInfoFormType = {
    email: session.user?.email || "",
    name: session.user?.name || "",
    birthdate: userInfos.birthdate || "",
  };

  return <BasicInformationComponent userData={userData} />;
};

export default BasicInformation;
