import axios from "axios";
import { AuthState, RootState, DecodedToken } from "@/types";
import { API_URLS } from "@/config";
import actions from "@/store/modules/auth/actions";
import * as authHelpers from "@/store/modules/auth/authHelpers";

// Mock axios.post function to avoid actual API requests
jest.mock("axios");

describe("Auth module login action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should log in successfully", async () => {
    const commit = jest.fn(); // Create a mock commit function
    const username = "testuser";
    const password = "testpassword";
    const response = { status: 200, data: { token: "dummytoken" } };

    const decodedToken: DecodedToken = {
      username: "testusername",
      role: "testrole",
      exp: 36000,
      userId: 0,
    };
    jest.spyOn(authHelpers, "getCookieToken").mockReturnValueOnce(decodedToken);

    // Use jest.spyOn to temporarily spy on axios.post and return the mock response
    jest.spyOn(axios, "post").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as AuthState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    const result = await actions.login(context, {
      username,
      password,
    });

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.login, {
      username,
      password,
    });

    expect(commit).toHaveBeenCalledWith("setIsAuthenticated", true);
    expect(commit).toHaveBeenCalledWith("setUsername", "testusername");
    expect(commit).toHaveBeenCalledWith("setRole", "testrole");
    expect(commit).toHaveBeenCalledWith("setExpiration", 36000);
    expect(result).toBeNull();
  }); // Test case ends

  it("should fail and return error message if no decodedToken", async () => {
    const commit = jest.fn(); // Create a mock commit function
    const username = "testuser";
    const password = "testpassword";
    const response = { status: 200, data: { token: "dummytoken" } };

    // Use jest.spyOn to temporarily spy on axios.post and return the mock response
    jest.spyOn(axios, "post").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as AuthState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    const result = await actions.login(context, {
      username,
      password,
    });

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.login, {
      username,
      password,
    });

    expect(result).toBe("A client error occurred during login");
  }); // Test case ends

  it("should return error message if invalid user or password", async () => {
    const commit = jest.fn(); // Create a mock commit function
    const username = "baduser";
    const password = "testpassword";
    const response = { status: 401 };

    // Use jest.spyOn to temporarily spy on axios.post and return the mock response
    jest.spyOn(axios, "post").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as AuthState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    const result = await actions.login(context, {
      username,
      password,
    });

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.login, {
      username,
      password,
    });

    expect(result).toBe("Invalid username or password");
  }); // Test case ends

  it("should return error message if request fails", async () => {
    const commit = jest.fn(); // Create a mock commit function
    const username = "testuser";
    const password = "testpassword";
    const response = { status: 500 };

    // Use jest.spyOn to temporarily spy on axios.post and return the mock response
    jest.spyOn(axios, "post").mockRejectedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as AuthState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    const result = await actions.login(context, {
      username,
      password,
    });

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.login, {
      username,
      password,
    });

    expect(result).toBe("An error occurred during login");
  }); // Test case ends
});

describe("Auth module logout action", () => {
  beforeEach(() => {
    // Reset the mock implementations for each test
    jest.clearAllMocks();
  });

  it("should log out successfully if response status is 200", async () => {
    const commit = jest.fn(); // Create a mock commit function
    const response = { status: 200 };

    // Use jest.spyOn to temporarily spy on axios.post and return the mock response
    jest.spyOn(axios, "post").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as AuthState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    const result = await actions.logout(context);

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.logout);

    expect(commit).toHaveBeenCalledWith("setIsAuthenticated", false);
    expect(commit).toHaveBeenCalledWith("setUsername", "");
    expect(commit).toHaveBeenCalledWith("setRole", "guest");
    expect(commit).toHaveBeenCalledWith("setExpiration", 0);
    expect(result).toBeNull();
  }); // Test case ends

  it("should return error message if response status is not 200", async () => {
    const commit = jest.fn(); // Create a mock commit function
    const response = { status: 401 };

    // Use jest.spyOn to temporarily spy on axios.post and return the mock response
    jest.spyOn(axios, "post").mockResolvedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as AuthState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    const result = await actions.logout(context);

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.logout);

    expect(result).toBe("Error: Logout failed");
  }); // Test case ends

  it("should return error message if no response", async () => {
    const commit = jest.fn(); // Create a mock commit function
    const response = null;

    // Use jest.spyOn to temporarily spy on axios.post and return the mock response
    jest.spyOn(axios, "post").mockRejectedValueOnce(response);

    // Create a mock context
    const context = {
      commit,
      dispatch: jest.fn(),
      state: {} as AuthState,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    };

    // Call the action
    const result = await actions.logout(context);

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(API_URLS.logout);

    expect(result).toBe("An error occurred during logout");
  }); // Test case ends
});
