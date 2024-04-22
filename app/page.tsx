import CrontabWidget from "@/components/widgets/Cron/CronWidget";
import JsonWidget from "@/components/widgets/Json/JsonWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full min-w-72 p-0 sm:p-2">
        <div className="flex flex-wrap gap-x-5 gap-y-5 ">
          <JsonWidget />
          <CrontabWidget />
        </div>
      </div>
    </main>
  );
}
