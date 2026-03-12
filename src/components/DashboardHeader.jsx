import { formatDateTime } from "../utils/formatters";

export default function DashboardHeader({
  nextRefreshText,
  lastUpdated,
  loading,
  onRefresh,
}) {
  return (
    <div className="card header">
      <div>
        <h1 className="title">G2G Offers Dashboard</h1>
        <p className="subtitle">
          Таблица с автообновлением каждые 3 минуты и ручным обновлением по
          кнопке.
        </p>
        <div className="meta">
          <span className="badge">
            Следующее обновление через: {nextRefreshText}
          </span>
          <span className="badge">
            Последнее обновление: {formatDateTime(lastUpdated)}
          </span>
        </div>
      </div>

      <button
        className="primary-button"
        onClick={onRefresh}
        disabled={loading}
      >
        {loading ? "Обновление..." : "Обновить сейчас"}
      </button>
    </div>
  );
}
