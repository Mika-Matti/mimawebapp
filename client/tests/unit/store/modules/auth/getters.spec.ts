import { GetterTree } from "vuex";
import getters from "@/store/modules/auth/getters";
import { AuthState, RootState, DecodedToken } from "@/types";
import * as authHelpers from "@/store/modules/auth/authHelpers";

describe("Auth module getters", () => {
  it("should return true if the user is authenticated", () => {
    // Prepare the state
    const state: AuthState = {
      isAuthenticated: true,
      username: "testuser",
      role: "admin",
      expiration: 1677836800, // Some future expiration timestamp
    };

    // Call the getter
    const result = getters.getIsAuthenticated(
      state,
      null,
      {} as RootState,
      null
    );

    // Assertions
    expect(result).toBe(true);
  });

  it("should return false if there is no decodedToken", () => {
    // Prepare the state
    const state: AuthState = {
      isAuthenticated: false,
      username: "",
      role: "",
      expiration: 0,
    };

    // Mock the getCookieToken function
    jest.spyOn(authHelpers, "getCookieToken").mockReturnValueOnce(null);

    // Call the getter
    const result = getters.getIsAuthenticated(
      state,
      null,
      {} as RootState,
      null
    );

    // Assertions
    expect(result).toBe(false);
  });

  it("should return false if the session has expired", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1734567890 * 1000));
    // Prepare the state
    const state: AuthState = {
      isAuthenticated: false,
      username: "",
      role: "guest",
      expiration: 0,
    };

    const expTime = 1577836800;

    // Mock the getCookieToken function
    jest.spyOn(authHelpers, "getCookieToken").mockReturnValueOnce({
      userId: 12045950,
      username: "testuser",
      role: "admin",
      exp: expTime,
    } as DecodedToken);

    // Call the getter
    const result = getters.getIsAuthenticated(
      state,
      null,
      {} as RootState,
      null
    );

    // Assertions
    expect(result).toBe(false);
  });

  it("should return user info from token if the token exists", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(1634567890 * 1000));
    // Prepare the state
    const state: AuthState = {
      isAuthenticated: false,
      username: "",
      role: "guest",
      expiration: 0,
    };

    const expTime = 1777836800;

    // Mock the getCookieToken function
    jest.spyOn(authHelpers, "getCookieToken").mockReturnValueOnce({
      userId: 12045950,
      username: "testuser",
      role: "admin",
      exp: expTime,
    } as DecodedToken);

    // Call the getter
    const result = getters.getIsAuthenticated(
      state,
      null,
      {} as RootState,
      null
    );

    // Assertions
    expect(result).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.username).toBe("testuser");
    expect(state.role).toBe("admin");
    expect(state.expiration).toBe(expTime);
  });

  it("should return the username from state", () => {
    // Prepare the state
    const state: AuthState = {
      isAuthenticated: true,
      username: "testuser",
      role: "admin",
      expiration: 1677836800, // Some future expiration timestamp
    };

    // Call the getter
    const result = getters.getUsername(state, null, {} as RootState, null);

    // Assertions
    expect(result).toBe("testuser");
  });

  it("should return the role from state", () => {
    // Prepare the state
    const state: AuthState = {
      isAuthenticated: true,
      username: "testuser",
      role: "admin",
      expiration: 1677836800, // Some future expiration timestamp
    };

    // Call the getter
    const result = getters.getRole(state, null, {} as RootState, null);

    // Assertions
    expect(result).toBe("admin");
  });

  it("should return the expiration from state", () => {
    // Prepare the state
    const state: AuthState = {
      isAuthenticated: true,
      username: "testuser",
      role: "admin",
      expiration: 1677836800, // Some future expiration timestamp
    };

    // Call the getter
    const result = getters.getExpiration(state, null, {} as RootState, null);

    // Assertions
    expect(result).toBe(1677836800);
  });
});
