export type LoginState = SuccesState | FailState;

interface SuccesState {
  state: "Success";
  token: string;
}

interface FailState {
  state: "Fail";
}
