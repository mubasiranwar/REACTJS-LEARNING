function SubscriptionForm() {
  return (
<section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
  <h2 className="mb-4 text-xl font-semibold">
    Add Subscription
  </h2>

  <div className="grid gap-4 md:grid-cols-3">

    <input
      className="rounded-lg border px-4 py-2 outline-none focus:ring-2"
      type="text"
      placeholder="Subscription name"
    />

    <input
      className="rounded-lg border px-4 py-2 outline-none focus:ring-2"
      type="number"
      placeholder="Monthly amount"
    />

    <select className="rounded-lg border px-4 py-2">
      <option>Select category</option>
      <option>Entertainment</option>
      <option>Software</option>
      <option>Utilities</option>
    </select>

  </div>

  <button className="mt-4 rounded-lg px-5 py-2 font-medium hover:opacity-90">
    Add Subscription
  </button>
</section>
  );
}

export default SubscriptionForm;