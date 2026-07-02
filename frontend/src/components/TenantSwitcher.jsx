import { Building2 } from "lucide-react";

const TenantSwitcher = ({
  tenants,
  selectedTenant,
  onTenantChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">

      <div className="flex items-center gap-2 mb-4">
        <Building2 className="text-green-600" size={22} />
        <h2 className="text-lg font-semibold">
          Select Tenant
        </h2>
      </div>

      <select
        value={selectedTenant}
        onChange={(e) => onTenantChange(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Choose a Tenant</option>

        {tenants.map((tenant) => (
          <option
            key={tenant._id}
            value={tenant._id}
          >
            {tenant.name}
          </option>
        ))}
      </select>

    </div>
  );
};

export default TenantSwitcher;