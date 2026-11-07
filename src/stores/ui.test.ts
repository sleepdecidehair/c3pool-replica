import { beforeEach, describe, expect, it } from "vitest";
import { useUiStore } from "./ui";

describe("useUiStore", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useUiStore.setState({
      theme: "light",
      address: "",
      language: "English",
      currency: "USDT",
    });
  });

  it("切换主题并持久化", () => {
    useUiStore.getState().toggleTheme();
    expect(useUiStore.getState().theme).toBe("dark");
    expect(window.localStorage.getItem("c3.theme")).toBe("dark");
  });

  it("保存钱包地址", () => {
    useUiStore.getState().setAddress("48abc");
    expect(useUiStore.getState().address).toBe("48abc");
  });
});
