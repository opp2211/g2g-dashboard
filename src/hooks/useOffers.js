import { useCallback, useEffect, useState } from "react";
import { fetchG2GOffers } from "../api/g2gApi";
import { REFRESH_INTERVAL_MS } from "../constants/config";

export function useOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdownMs, setCountdownMs] = useState(REFRESH_INTERVAL_MS);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const mapped = await fetchG2GOffers();
      setOffers(mapped);
      setLastUpdated(new Date());
      setCountdownMs(REFRESH_INTERVAL_MS);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Не удалось загрузить данные";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const intervalId = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [refresh]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdownMs((prev) => {
        if (prev <= 1000) return REFRESH_INTERVAL_MS;
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return {
    offers,
    loading,
    error,
    lastUpdated,
    countdownMs,
    refresh,
  };
}
