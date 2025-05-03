import { Checkbox } from "../animate-ui/headless/checkbox";

export default function SubtaskItem() {
  return (
    <div className="flex flex-row items-center gap-3 text-sm hover:bg-input rounded-sm">
      <Checkbox className="cursor-pointer size-4  " />
      <label>Ir a la tienda</label>
    </div>
  );
}
