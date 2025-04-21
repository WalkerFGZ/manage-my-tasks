import { Progress } from "./ui/progress";

export default function DailyProgressBar() {
  return (
    <div className="grid grid-cols-2 mt-3">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between pb-2">
          <h4>Daily Progress</h4>
          <p>0%</p>
        </div>
        <Progress value={33} />
      </div>
    </div>
  );
}
