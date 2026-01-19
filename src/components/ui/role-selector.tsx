import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RoleSelector({value,onValueChange}:{value:string,onValueChange:(value:string)=>void}) {
  return (
    <>
     <Select
                  value={value}
                  onValueChange={onValueChange}
                >
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="여행자 선택(필수)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DREAMER">DREMER(여행요청)</SelectItem>
                    <SelectItem value="MAKER">MAKER(여행실행)</SelectItem>
                  </SelectContent>
                </Select>
    </>
  );
}