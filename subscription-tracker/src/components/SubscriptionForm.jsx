import { useState } from "react";

function SubscriptionForm({ onAddSubscription }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (!name.trim()) {
      setError("Please enter a subscription name.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    const newSubscription = {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      category,
    };

    onAddSubscription(newSubscription);

    // Reset form
    setName("");
    setAmount("");
    setCategory("");
    setError("");
  };

  return (
    <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Add Subscription
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="grid gap-4 md:grid-cols-3">

          {/* Name */}
          <div>
            <label
              htmlFor="subscription-name"
              className="mb-1 block text-sm font-medium"
            >
              Name
            </label>

            <input
              id="subscription-name"
              type="text"
              placeholder="Netflix"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="subscription-amount"
              className="mb-1 block text-sm font-medium"
            >
              Monthly Amount
            </label>

            <input
              id="subscription-amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="15.99"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="subscription-category"
              className="mb-1 block text-sm font-medium"
            >
              Category
            </label>

            <select
              id="subscription-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
            >
              <option value="">
                Select category
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

              <option value="Software">
                Software
              </option>

              <option value="Utilities">
                Utilities
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

        </div>

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white hover:bg-gray-700"
        >
          Add Subscription
        </button>

      </form>
    </section>
  );
}

export default SubscriptionForm;