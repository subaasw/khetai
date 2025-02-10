import { DISEASES_DETECTION_API } from "@/util/diseases_detection";
import { client } from "@/util/network";

export const diseasesDetectionChat = async (formData) => {
  const res = await client.post(DISEASES_DETECTION_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("response from model", res);
};
