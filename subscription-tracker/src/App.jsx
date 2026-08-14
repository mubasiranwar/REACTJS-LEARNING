import HeaderSummary from "./components/HeaderSummary";
import SubscriptionForm from "./components/SubscriptionForm";
import SubscriptionList from "./components/SubscriptionList";
import "./index.css";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
 
        <h1 className="mb-2 text-3xl font-bold  text-cyan-800">
          Personal Subscription Tracker
        </h1>

        <p className="mb-8 text-gray-600">
          Manage and track your monthly subscriptions.
        </p>

        <HeaderSummary />
        <SubscriptionForm />
        <SubscriptionList />

      </div>
    </div>
  );
}

export default App;