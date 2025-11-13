"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

// ---------- Root ----------
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// ---------- Content ----------
export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[150px] rounded-xl border border-[#077a7d] bg-white/95 backdrop-blur-md shadow-lg",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=left]:slide-in-from-right-2",
        "p-2 space-y-1 mr-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

// ---------- Label ----------
export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      "px-3 py-1 text-xs font-semibold text-gray-600 tracking-wide",
      inset && "pl-8",
      className
    )}
    {...props}
  />
);

// ---------- Separator ----------
export const DropdownMenuSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    className={cn("h-px bg-gray-200 my-1", className)}
    {...props}
  />
);

// ---------- Item ----------
export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "danger";
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex select-none items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer transition-all",
      "text-gray-700 hover:bg-[#077a7d]/10 hover:text-[#077a7d]",
      "focus:bg-[#077a7d]/20 focus:text-[#077a7d]",
      inset && "pl-10",
      variant === "danger" &&
        "text-red-500 hover:bg-red-50 focus:bg-red-100 focus:text-red-600",
      "data-disabled:opacity-50 data-disabled:pointer-events-none",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

// ---------- Checkbox Item ----------
export const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(
      "relative flex items-center gap-3 select-none rounded-lg px-3 py-2 text-sm outline-none cursor-pointer",
      "text-gray-700 hover:bg-[#077a7d]/10 hover:text-[#077a7d]",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="w-4 h-4 text-[#077a7d]" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

// ---------- Radio Group ----------
export const DropdownMenuRadioGroup =
  DropdownMenuPrimitive.RadioGroup;

// ---------- Radio Item ----------
export const DropdownMenuRadioItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "relative flex items-center gap-3 select-none rounded-lg px-3 py-2 text-sm outline-none cursor-pointer",
      "text-gray-700 hover:bg-[#077a7d]/10 hover:text-[#077a7d]",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="w-3 h-3 text-[#077a7d] fill-[#077a7d]/40" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

// ---------- Submenu ----------
export const DropdownMenuSub =
  DropdownMenuPrimitive.Sub;

export const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm cursor-pointer outline-none",
      "text-gray-700 hover:bg-gray-100 hover:text-[#077a7d]",
      inset && "pl-10",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto w-4 h-4" />
  </DropdownMenuPrimitive.SubTrigger>
);

export const DropdownMenuSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      "min-w-[150px] rounded-xl border border-gray-200 bg-white shadow-lg p-2 space-y-1 animate-in fade-in-0 zoom-in-95",
      className
    )}
    {...props}
  />
);

// ---------- Shortcut ----------
export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    className={cn(
      "ml-auto text-xs text-gray-400 tracking-widest",
      className
    )}
    {...props}
  />
);
