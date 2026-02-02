export function getRank(points: number) {
  if (points >= 200) return { name: "Challenger", color: "text-red-400" };
  if (points >= 121) return { name: "Diamond", color: "text-purple-400" };
  if (points >= 71) return { name: "Platinum", color: "text-blue-400" };
  if (points >= 31) return { name: "Gold", color: "text-yellow-400" };
  if (points >= 11) return { name: "Silver", color: "text-gray-300" };
  return { name: "Bronze", color: "text-orange-400" };
}
