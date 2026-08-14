import SubscriptionCard from "./SubscriptionCard";

function SubscriptionList() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Your Subscriptions</h2>
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"  hover:shadow-lg>
      <SubscriptionCard />
      <SubscriptionCard />
      <SubscriptionCard />
      </div>
    </section>


  );
}

export default SubscriptionList;