export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className="error">
      <div className="error__title">Ошибка загрузки</div>
      <div>{message}</div>
      <div className="error__hint">
        Если браузер блокирует запрос, нужен backend proxy из-за CORS.
      </div>
    </div>
  );
}
