const estimatedRent = (costPrice, monthUsed) => {
  monthUsed = Number(monthUsed);
  costPrice = Number(costPrice);
  if (isNaN(monthUsed) || isNaN(costPrice)) {
    console.log("Invalid inputs");
    return null;
  }

  const rentpercent = Math.max(5 - monthUsed * 0.1, 2);

  const estimatedCost = Math.round(costPrice * (rentpercent / 100));
  const platformFee = Math.round(estimatedCost * 0.1);
  const listersEarning = estimatedCost - platformFee;
  return { estimatedCost, platformFee, listersEarning };
};

module.exports = { estimatedRent };
