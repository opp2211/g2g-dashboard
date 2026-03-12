import { formatNumber, formatPrice } from "../utils/formatters";

const EMPTY_VALUE = "—";

export default function OfferTable({ offers, loading }) {
  return (
    <div className="card">
      <div className="table-header">Офферы ({offers.length})</div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Available Qty</th>
              <th>Min Qty</th>
              <th>Reserved Qty</th>
              <th>Display Price</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => (
              <tr
                key={offer.offerId ?? `${offer.username}-${index}`}
                className={
                  offer.username === "ThePrimes" ? "table-row--highlight" : ""
                }
              >
                <td>{offer.username || EMPTY_VALUE}</td>
                <td>{formatNumber(offer.availableQty)}</td>
                <td>{formatNumber(offer.minQty)}</td>
                <td>{formatNumber(offer.reservedQty)}</td>
                <td>${formatPrice(offer.displayPrice)}</td>
              </tr>
            ))}

            {!loading && offers.length === 0 ? (
              <tr>
                <td colSpan={5} className="table-empty">
                  Нет данных для отображения
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
