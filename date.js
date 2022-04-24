exports.getTimeOfDay = function() {
  const today = new Date();
  const hour = today.getHours();
  let tod = "";

  if (hour >= 0 && hour < 12) tod = "Morning";
  else if (hour >= 12 && hour < 16) tod = "Afternoon";
  else if (hour >= 16 && hour < 19) tod = "Evening";
  else tod = "Night";
  return tod;
}
