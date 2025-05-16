import { currentUser } from "@clerk/nextjs/server";

export default async function Greetings() {
  const now = new Date();
  const hour = now.getHours();
  const user = await currentUser();

  let timeGreeting = "";
  if (hour >= 5 && hour < 12) {
    timeGreeting = "Good Morning";
  } else if (hour >= 12 && hour < 19) {
    timeGreeting = "Good Afternoon";
  } else {
    timeGreeting = "Good Evening";
  }

  const emoji = hour >= 5 && hour < 19 ? "☀️" : "🌙";

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = now.toLocaleDateString("en-US", options);

  return (
    <>
      <h4 className="text-xl font-bold">
        {timeGreeting}, {user?.firstName} {emoji}
      </h4>
      <span className="text-sm text-gray-300">{formattedDate}</span>
    </>
  );
}
