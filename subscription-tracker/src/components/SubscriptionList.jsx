import SubscriptionCard from "./SubscriptionCard";

function SubscriptionList({
  subscriptions,
  onDeleteSubscription,
  onEditSubscription,
}) {
  return (
    <section>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Your Subscriptions
        </h2>

        <span className="text-sm text-gray-500">
          {subscriptions.length} total
        </span>
      </div>

      {subscriptions.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">
            No subscriptions yet.
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Add your first subscription above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onDeleteSubscription={onDeleteSubscription}
              onEditSubscription={onEditSubscription}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default SubscriptionList;