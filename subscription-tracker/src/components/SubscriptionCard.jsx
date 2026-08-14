function SubscriptionCard() {
    return (
        <article className="rounded-xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">

                <div>
                    <h3 className="text-lg font-semibold">
                        Netflix
                    </h3>

                    <p className="text-sm text-gray-500">
                        Entertainment
                    </p>
                </div>

                <p className="font-semibold">
                    $15.99
                </p>

            </div>

            <div className="mt-4 flex gap-2">
                <button className="rounded-lg border px-4 py-2 hover:bg-gray-50">
                    Edit
                </button>

                <button className="rounded-lg px-4 py-2 hover:opacity-90">
                    Delete
                </button>
            </div>
        </article>
    );
}

export default SubscriptionCard;