import { Data } from "$lib/backend/data";
import type { Payment } from "../../types/payment";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  // const data = new Data();
  // const payments = await data.getPayments("ben");

  const dummyPayments: Payment[] = [
    {
      id: "1",
      name: "Savings",
      username: "ben",
      when: "every thursday",
      amount: "£10",
    },
    {
      id: "2",
      name: "Cleaning",
      username: "ben",
      when: "every wednesday",
      amount: "£45",
    },
  ];
  return { payments: dummyPayments };
};
