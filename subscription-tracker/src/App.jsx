import { useState } from "react";

import HeaderSummary from "./components/HeaderSummary";
import SubscriptionForm from "./components/SubscriptionForm";
import SubscriptionList from "./components/SubscriptionList";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);

  // CREATE
  const handleAddSubscription = (newSubscription) => {
    setSubscriptions((currentSubscriptions) => [
      ...currentSubscriptions,
      newSubscription,
    ]);
  };

  // DELETE
  const handleDeleteSubscription = (id) => {
    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.filter(
        (subscription) => subscription.id !== id
      )
    );
  };

  // UPDATE
  const handleEditSubscription = (id, updatedData) => {
    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.map((subscription) =>
        subscription.id === id
          ? {
              ...subscription,
              ...updatedData,
            }
          : subscription
      )
    );
  };

  return (
    <div className="min-h-screen bg-blue-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            Personal Subscription Tracker
          </h1>

          <p className="text-gray-600">
            Manage and track your monthly subscriptions.
          </p>
        </header>

        {/* Summary */}
        <HeaderSummary subscriptions={subscriptions} />

        {/* Add Subscription */}
        <SubscriptionForm
          onAddSubscription={handleAddSubscription}
        />

        {/* Subscription List */}
        <SubscriptionList
          subscriptions={subscriptions}
          onDeleteSubscription={handleDeleteSubscription}
          onEditSubscription={handleEditSubscription}
        />

      </div>
    </div>
  );
}

export default App;