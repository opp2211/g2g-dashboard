import { useMemo } from "react";
import DashboardHeader from "./components/DashboardHeader";
import ErrorBanner from "./components/ErrorBanner";
import OfferTable from "./components/OfferTable";
import { useOffers } from "./hooks/useOffers";
import "./styles/app.css";

function formatCountdown(countdownMs) {
  const totalSeconds = Math.max(0, Math.floor(countdownMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function App() {
  const { offers, loading, error, lastUpdated, countdownMs, refresh } =
    useOffers();

  const nextRefreshText = useMemo(
    () => formatCountdown(countdownMs),
    [countdownMs],
  );

  return (
    <div className="app">
      <div className="app__container">
        <DashboardHeader
          nextRefreshText={nextRefreshText}
          lastUpdated={lastUpdated}
          loading={loading}
          onRefresh={refresh}
        />
        <ErrorBanner message={error} />
        <OfferTable offers={offers} loading={loading} />
      </div>
    </div>
  );
}
