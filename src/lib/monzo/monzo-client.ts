import type { Models } from "@otters/monzo";

const convertAmounts = (pot: Models.Pot): Models.Pot => ({
  ...pot,
  balance: pot.balance / 100,
  goal_amount: pot.goal_amount / 100,
});

export class MonzoClient {
  constructor() {}

  public async depositIntoPot(args: {
    potId: string;
    amount: number;
    sourceAccount: string;
  }) {
    const result = await this.post<Models.Pot>(`/pot/deposit/${args.potId}`, {
      source: args.sourceAccount,
      amount: args.amount,
    });
    return convertAmounts(result);
  }

  public async withDrawFromPot(args: {
    potId: string;
    amount: number;
    destinationAccount: string;
  }) {
    return await this.post<Models.Pot>(`/pot/withdraw/${args.potId}`, {
      amount: args.amount,
      destination: args.destinationAccount,
    });
  }

  public async pots(accountId: string) {
    return await this.get<Models.Pot[]>(`/pots/${accountId}`);
  }

  public async accounts() {
    return await this.get<Models.Account[]>("/accounts");
  }

  public async balance(accountId: string) {
    return await this.get<Models.Balance>(`/balance/${accountId}`);
  }

  private async request<
    R,
    B extends Record<string, unknown> = Record<string, never>
  >(method: string, path: string, body?: B): Promise<R> {
    const search = new URLSearchParams(window.location.search);
    const searchParams = new URLSearchParams(window.location.search);
    const withCode = searchParams.has("code")
      ? {
          params: {
            code: searchParams.get("code") ?? "",
          },
        }
      : {};

    const queryString = new URLSearchParams(withCode.params).toString();

    const finalQueryString = queryString ? `?${queryString}` : "";

    if (search.has("code")) {
      window.history.pushState(
        {},
        document.title,
        "/" +
          window.location.href
            .substring(window.location.href.lastIndexOf("/") + 1)
            .split("?")[0]
      );
    }

    const newOptions = {
      ...withCode,
    };

    const normalisedPath = path.startsWith("/") ? path.slice(1) : path;
    const monzoPath = `/monzo/${normalisedPath}${finalQueryString}`;

    const response = await fetch(monzoPath, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }

  private get<R>(path: string) {
    return this.request<R>("GET", path);
  }

  private delete<R>(path: string) {
    return this.request<R>("delete", path);
  }

  private post<R>(path: string, body: Record<string, unknown>) {
    return this.request<R, Record<string, unknown>>("POST", path, body);
  }

  private put<R>(path: string, body: Record<string, unknown>) {
    return this.request<R, Record<string, unknown>>("PUT", path, body);
  }
}
