import type { Handle } from "@sveltejs/kit";
import { handle } from "./hooks.server";
import { when } from "jest-when";
import { mock, mockDeep } from "vitest-mock-extended";
import { getAuthwhitelist } from "$lib/auth-whitelist";
import { HTTP, TOKEN_COOKIE_NAME } from "$lib/constants";
import { authorise } from "$lib/backend/monzo/authorise";
import type { MonzoAPI } from "@otters/monzo";
import { HttpError } from "$lib/errors/http-error";
import { configureAmplify } from "$lib/aws/configure-amplify-server";

vi.mock("$lib/auth-whitelist");
vi.mock("$lib/backend/monzo/authorise");
vi.mock("$lib/aws/configure-amplify-server");

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(getAuthwhitelist).mockReturnValue([]);
});

describe("server hook", () => {
  it("should configure amplify if route is not whitelisted", async () => {
    const mockEvent = mockDeep<Parameters<Handle>[0]["event"]>({
      route: {
        id: "/something-else",
      },
    });

    const mockToken = "mock-token";

    when(mockEvent.cookies.get)
      .calledWith(TOKEN_COOKIE_NAME)
      .mockReturnValue(mockToken);

    const mockCode = "mock-code";

    when(mockEvent.url.searchParams.get)
      .calledWith("code")
      .mockReturnValue(mockCode);

    const redirectUrl = "https://example.com/redirect";

    const mockClient = mock<MonzoAPI>();

    when(authorise).calledWith(mockToken, mockCode).mockResolvedValue({
      complete: true,
      client: mockClient,
    });

    const response = await handle({ event: mockEvent, resolve: vi.fn() });

    expect(configureAmplify).toHaveBeenCalled();
  });

  it("should always resolve any routes that are on the auth whitelist", async () => {
    vi.mocked(getAuthwhitelist).mockReturnValue(["/foo"]);

    const mockEvent = mockDeep<Parameters<Handle>[0]["event"]>({
      route: {
        id: "/foo",
      },
    });

    const mockResponse = mock<Response>();

    const mockResolve = vi.fn();

    when(mockResolve).calledWith(mockEvent).mockResolvedValue(mockResponse);

    const response = await handle({ event: mockEvent, resolve: mockResolve });
    expect(response).toBe(mockResponse);
  });

  it("should attach the monzoClient to locals and resolve the reuest if the client is authorised", async () => {
    const mockEvent = mockDeep<Parameters<Handle>[0]["event"]>({
      route: {
        id: "/something-else",
      },
    });

    const mockToken = "mock-token";

    when(mockEvent.cookies.get)
      .calledWith(TOKEN_COOKIE_NAME)
      .mockReturnValue(mockToken);

    const mockCode = "mock-code";

    when(mockEvent.url.searchParams.get)
      .calledWith("code")
      .mockReturnValue(mockCode);

    const redirectUrl = "https://example.com/redirect";

    const mockClient = mock<MonzoAPI>();

    when(authorise).calledWith(mockToken, mockCode).mockResolvedValue({
      complete: true,
      client: mockClient,
    });

    const resolve = vi.fn();
    const mockResponse = mock<Response>();
    when(resolve).calledWith(mockEvent).mockResolvedValue(mockResponse);

    const response = await handle({ event: mockEvent, resolve });

    expect(response).toBe(mockResponse);
    expect(mockEvent.locals.monzoClient).toBe(mockClient);
  });

  it("should redirect to the login page if an HttpError is thrown", async () => {
    const mockEvent = mockDeep<Parameters<Handle>[0]["event"]>({
      route: {
        id: "/something-else",
      },
    });

    const mockToken = "mock-token";

    when(mockEvent.cookies.get)
      .calledWith(TOKEN_COOKIE_NAME)
      .mockReturnValue(mockToken);

    const mockCode = "mock-code";

    when(mockEvent.url.searchParams.get)
      .calledWith("code")
      .mockReturnValue(mockCode);

    const redirectUrl = "https://example.com/redirect";

    when(authorise)
      .calledWith(mockToken, mockCode)
      .mockRejectedValue(
        new HttpError("unauthorised", HTTP.statusCodes.Forbidden),
      );

    const response = await handle({ event: mockEvent, resolve: vi.fn() });

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(HTTP.statusCodes.Found);
    expect(response.headers.get(HTTP.headerNames.Location)).toEqual("/login");
  });

  it("should redirect to the monzo redirect URL if the client is not authorised", async () => {
    const mockEvent = mockDeep<Parameters<Handle>[0]["event"]>({
      route: {
        id: "/something-else",
      },
    });

    const mockToken = "mock-token";

    when(mockEvent.cookies.get)
      .calledWith(TOKEN_COOKIE_NAME)
      .mockReturnValue(mockToken);

    const mockCode = "mock-code";

    when(mockEvent.url.searchParams.get)
      .calledWith("code")
      .mockReturnValue(mockCode);

    const redirectUrl = "https://example.com/redirect";

    when(authorise).calledWith(mockToken, mockCode).mockResolvedValue({
      complete: false,
      response: {
        redirectUrl,
      },
    });

    const response = await handle({ event: mockEvent, resolve: vi.fn() });

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(HTTP.statusCodes.Found);
    expect(response.headers.get(HTTP.headerNames.Location)).toEqual(
      redirectUrl,
    );
  });
});
