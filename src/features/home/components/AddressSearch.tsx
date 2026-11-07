import { Message } from "@arco-design/web-react";
import { IconArrowRight, IconSearch } from "@arco-design/web-react/icon";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import { useState, type FormEvent } from "react";
import { useUiStore } from "../../../stores/ui";

export function AddressSearch() {
  const address = useUiStore((state) => state.address);
  const setAddress = useUiStore((state) => state.setAddress);
  const [value, setValue] = useState(address);

  const submit = useDebouncedCallback(
    (next: string) => {
      const trimmed = next.trim();
      if (!trimmed) {
        Message.warning("请输入 XMR / USDT 钱包地址");
        return;
      }
      setAddress(trimmed);
      Message.success("地址已保存到本地，可在页头查看");
    },
    { wait: 250 },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(value);
  };

  return (
    <form className="address-search" onSubmit={handleSubmit}>
      <div className="address-search__box">
        <IconSearch className="address-search__icon" />
        <input
          id="address-search-input"
          className="address-search__input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter your XMR / USDT withdrawal address"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="address-search__submit">
          View stats <IconArrowRight />
        </button>
      </div>
    </form>
  );
}
