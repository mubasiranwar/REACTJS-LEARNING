import { useState } from "react";

function SubscriptionCard({
  subscription,
  onDeleteSubscription,
  onEditSubscription,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState(
    subscription.name
  );

  const [editAmount, setEditAmount] = useState(
    subscription.amount
  );

  const [error, setError] = useState("");

  const handleSave = () => {
    if (!editName.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    if (!editAmount || Number(editAmount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    onEditSubscription(subscription.id, {
      name: editName.trim(),
      amount: Number(editAmount),
    });

    setError("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(subscription.name);
    setEditAmount(subscription.amount);
    setError("");
    setIsEditing(false);
  };

  return (
    <article className="rounded-xl bg-white p-5 shadow-sm">

      {isEditing ? (

        /* ================= EDIT MODE ================= */

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Edit Subscription
          </h3>

          <div className="grid gap-4 md:grid-cols-2">

            {/* Edit Name */}
            <div>
              <label
                htmlFor={`name-${subscription.id}`}
                className="mb-1 block text-sm font-medium"
              >
                Name
              </label>

              <input
                id={`name-${subscription.id}`}
                type="text"
                value={editName}
                onChange={(event) =>
                  setEditName(event.target.value)
                }
                className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
              />
            </div>

            {/* Edit Amount */}
            <div>
              <label
                htmlFor={`amount-${subscription.id}`}
                className="mb-1 block text-sm font-medium"
              >
                Monthly Amount
              </label>

              <input
                id={`amount-${subscription.id}`}
                type="number"
                min="0"
                step="0.01"
                value={editAmount}
                onChange={(event) =>
                  setEditAmount(event.target.value)
                }
                className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2"
              />
            </div>

          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="mt-4 flex gap-2">

            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

          </div>
        </div>

      ) : (

        /* ================= VIEW MODE ================= */

        <div>

          <div className="flex items-start justify-between gap-4">

            <div>
              <h3 className="text-lg font-semibold">
                {subscription.name}
              </h3>

              <span className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {subscription.category}
              </span>
            </div>

            <p className="text-lg font-bold">
              ${subscription.amount.toFixed(2)}
            </p>

          </div>

          <div className="mt-5 flex gap-2">

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                onDeleteSubscription(subscription.id)
              }
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>

          </div>

        </div>
      )}

    </article>
  );
}

export default SubscriptionCard;