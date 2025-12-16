const SpecsTable = ({ product }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">
      <h3 className="font-semibold text-xl mb-4">Specifications</h3>
      <table className="w-full text-sm">
        <tbody className="text-gray-600">
          <tr>
            <td className="py-2 font-medium">Category</td>
            <td>{product.category}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Condition</td>
            <td>Good</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Usage</td>
            <td>6 Months</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SpecsTable;
