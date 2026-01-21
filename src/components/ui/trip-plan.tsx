import { planData } from "@/lib/utils";
import MultiSelect from "./multi-select";
import {
  useTripPlanSelect,
} from "@/store/trip-plan-select";
import { Input } from "./input";
import { Textarea } from "./textarea";

type roleType = "DREAMER" | "MAKER";

export default function Location({ type }: { type: roleType }) {

  const { gallery,
    description,
    detailDescription,
    selectedLocation,
    selectedService,
    setSelectedLocation,
    setSelectedService,
    setGallery,
    setDescription,
    setDetailDescription } = useTripPlanSelect();


  return (
    <div className="flex flex-col max-w-100 gap-3 ">
      <MultiSelect
        options={planData.locations}
        value={selectedLocation}
        onChange={setSelectedLocation}
        placeholder={type === "DREAMER" ? "여행 하고 싶은 지역을 선택해주세요(복수 선택 가능)" : "여행 가능한 지역을 선택해주세요(복수 선택 가능)"}
      />
      <MultiSelect
        options={planData.services}
        value={selectedService}
        onChange={setSelectedService}
        placeholder={type === "DREAMER" ? "받고 싶은 서비스를 선택해주세요(복수 선택 가능)" : "제공 가능한 서비스를 선택해주세요(복수 선택 가능)"}
      />
      {type === "MAKER" && (
        <>
          <div className="flex flex-col gap-4">
            <Input value={gallery} onChange={(e) => setGallery(e.target.value)} placeholder="본인의 SNS 주소를 입력해 주세요." />
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="한줄 소개" />
            <Textarea value={detailDescription} onChange={(e) => setDetailDescription(e.target.value)} placeholder="상세 홍보내용을 입력해 주세요." />
          </div>
        </>
      )}
    </div>
  );
}
