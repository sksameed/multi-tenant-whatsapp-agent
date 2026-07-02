const StatsCards = ({ sessions = [] }) => {

  const active = sessions.length;

  const waiting = sessions.filter(
    s => s.status === "WAITING_FOR_BOT"
  ).length;

  const human = sessions.filter(
    s => s.status === "NEEDS_HUMAN"
  ).length;

  const resolved = sessions.filter(
    s => s.status === "RESOLVED"
  ).length;

  const Card = ({ title, value, color }) => (
    <div className="bg-white rounded-xl shadow p-5 border">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-5 mb-6">

      <Card
        title="Active Sessions"
        value={active}
        color="text-blue-600"
      />

      <Card
        title="Waiting"
        value={waiting}
        color="text-yellow-600"
      />

      <Card
        title="Human Needed"
        value={human}
        color="text-red-600"
      />

      <Card
        title="Resolved"
        value={resolved}
        color="text-green-600"
      />

    </div>
  );

};

export default StatsCards;