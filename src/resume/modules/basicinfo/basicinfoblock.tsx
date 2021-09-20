import { useContext } from "react";
import { BasicInfoContext } from "../../profilebuilder";

export default function BasicInfoBlock() {
  const { basicInfo } = useContext(BasicInfoContext);
  return (
    <>
      <p>{basicInfo?.fullName}</p>
    </>
  );
}
