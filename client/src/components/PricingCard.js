function PricingCard({
  title,
  price,
  description,

  selected,
  onClick
}) {
  return (
    <div
      className={`pricingCard ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <h3>{title}</h3>

      <div className="pricingCardPrice">
        {price}
      </div>

      <p>{description}</p>


    </div>
  );
}
export default PricingCard