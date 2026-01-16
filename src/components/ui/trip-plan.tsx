import { planData } from "@/lib/utils";
import MultiSelect from "./multi-select";
import {
  useSelectedLocation,
  useSetSelectedLocation,
  useSelectedService,
} from "@/store/trip-plan-select";

export default function Location() {
  const selectedLocation = useSelectedLocation();
  const selectedService = useSelectedService();
  const { setSelectedLocation, setSelectedService } = useSetSelectedLocation();
  return (
    <div className="flex flex-col gap-3 w-120">
      <MultiSelect
        options={planData.locations}
        value={selectedLocation}
        onChange={setSelectedLocation}
        placeholder="여행하고 싶은 지역을 선택해주세요(복수 선택 가능)"
      />
      <MultiSelect
        options={planData.services}
        value={selectedService}
        onChange={setSelectedService}
        placeholder="받고 싶은 서비스를 선택해주세요(복수 선택 가능)"
      />
    </div>
  );
}
