import {
  Users,
  Clock3,
  UserRound,
  CheckCircle2,
} from "lucide-react";

const StatsCards = ({ sessions = [] }) => {

  const active = sessions.length;

  const waiting = sessions.filter(
    (s) => s.status === "WAITING_FOR_BOT"
  ).length;

  const human = sessions.filter(
    (s) => s.status === "NEEDS_HUMAN"
  ).length;

  const resolved = sessions.filter(
    (s) => s.status === "RESOLVED"
  ).length;

  const cards = [
    {
      title: "Active Sessions",
      value: active,
      icon: Users,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Waiting",
      value: waiting,
      icon: Clock3,
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Needs Human",
      value: human,
      icon: UserRound,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      text: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`${card.bg} rounded-2xl shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2
                  className={`text-4xl font-bold mt-2 ${card.text}`}
                >
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.iconBg} p-3 rounded-xl`}
              >
                <Icon
                  size={28}
                  className={card.text}
                />
              </div>

            </div>

          </div>
        );

      })}

    </div>
  );

};

export default StatsCards;