import { toast } from "sonner";

export const toastWrapper = (title: string, desc: string) => {
  toast(title, {
    description: desc,
    action: {
      label: "닫기",
      onClick: () => {},
    },
  });
};
