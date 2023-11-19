export type RegisterState =
  | SuccesState
  | FailState
  | VerifyState
  | VerifyFailState;

interface SuccesState {
  state: "Success";
}

interface FailState {
  state: "Fail";
}

interface VerifyState {
  state: "VerifyCode";
  username: string;
}

interface VerifyFailState {
  state: "VerifyFail";
}
