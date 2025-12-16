export const calculateRentalCost =([
    rentPerMonth,
    months,
    deliveryFee =149,
    platformFee=99,
    gst=18,
    securityDeposit=2000,

])=>{
    const rentTotal = rentPerMonth * months;
    const gstAmount = (rentTotal * gst) / 100;
    
    return {
        rentTotal,
        gstAmount,
        deliveryFee,
        platformFee,
        securityDeposit,
        total : rentTotal + gstAmount + deliveryFee + platformFee + securityDeposit,

    };
};