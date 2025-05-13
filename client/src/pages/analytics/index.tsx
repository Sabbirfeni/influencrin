import CountsAnalyticsCards from "@/components/analytics/counts-analytics-cards";
import { DailyVisitorSearchesAnalyticsChart } from "@/components/analytics/counts-analytics-chart";

function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <CountsAnalyticsCards />
          <div className="px-4 lg:px-6">
            <DailyVisitorSearchesAnalyticsChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
