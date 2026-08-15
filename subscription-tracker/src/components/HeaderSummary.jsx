function HeaderSummary({ subscriptions }) {
  const totalMonthlySpend = subscriptions.reduce(
    (total, subscription) => total + subscription.amount,
    0
  );

  return (
    <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        Total Monthly Spend
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        ${totalMonthlySpend.toFixed(2)}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {subscriptions.length} subscription
        {subscriptions.length !== 1 ? "s" : ""}
      </p>
    </section>
  );
}

export default HeaderSummary;