import Flutterwave from "flutterwave-node-v3";
import dotenv from "dotenv";
dotenv.config();

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY_TEST,
  process.env.FLW_SECRET_KEY_TEST,
);

export const starterPlan = async (req: any, res: any) => {
  try {
    const payload = {
      amount: 500,
      name: "the olufemi obafunmiso plan 2", //This is the name of the payment, it will appear on the subscription reminder emails
      interval: "monthly", //This will determine the frequency of the charges for this plan. Could be monthly, weekly, etc.
      duration: 24, //This is the frequency, it is numeric, e.g. if set to 5 and intervals is set to monthly you would be charged 5 months, and then the subscription stops
    };

    const response = await flw.PaymentPlan.create(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
