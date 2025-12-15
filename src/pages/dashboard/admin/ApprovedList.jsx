export default function ApprovedList({ listings }) {
  return (
    <div className="grid gap-6">
      {listings.map(item => (
        <div key={item._id} className="p-6 bg-green-50 rounded-xl shadow">
          <h3 className="font-bold">{item.item.itemName}</h3>
          <p className="text-sm text-gray-600">
            Approved on {new Date(item.listedOn).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
