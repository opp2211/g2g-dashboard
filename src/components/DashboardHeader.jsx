import { formatDateTime } from "../utils/formatters";

export default function DashboardHeader({
  nextRefreshText,
  lastUpdated,
  loading,
  onRefresh,
  sources,
  selectedSourceId,
  onSourceChange,
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

      <div className="header__actions">
        <div className="source-select">
          <label className="source-select__label" htmlFor="source-select">
            Offer source
          </label>
          <select
            id="source-select"
            className="source-select__input"
            value={selectedSourceId}
            onChange={(event) => onSourceChange(event.target.value)}
          >
            {sources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="primary-button"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "Обновление..." : "Обновить сейчас"}
        </button>
      </div>
    </div>
  );
}
