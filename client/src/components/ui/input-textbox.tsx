import * as React from 'react';

import { cn } from '@/lib/utils';

const InputTextBox = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      /* focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 */
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border lg:text-2xl border-zinc-200 bg-white px-3 py-2 ring-offset-white file:border-0 file:bg-transparent font-semibold  file:text-2xl file:font-medium file:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focsus-visible:ring-zinc-300',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputTextBox.displayName = 'Input';

export { InputTextBox };
