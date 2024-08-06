import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Popover } from "@headlessui/react";

export const IconPicker = ({ onChange, children, asChild, document, editable }) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || "light";

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover className="relative">
      <Popover.Button as={asChild ? "div" : "button"} className="focus:outline-none">
        {children}
      </Popover.Button>
      <Popover.Panel className="absolute z-10">
        <div className="p-0 w-full border-none shadow-none">
          <EmojiPicker
            height={350}
            theme={theme}
            onEmojiClick={(data) => onChange(data.emoji, document)}
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
};
