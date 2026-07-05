/**
 * Bank / EFT details for the order-confirmation screen ONLY.
 * Pulled from environment variables (see .env.example) so real details are
 * never hardcoded in the repo. If unset at build time, the confirmation screen
 * falls back to a message telling the customer we'll send details on WhatsApp.
 *
 * These are read in server context (build time). They are only rendered inside
 * the confirmation section of /checkout, which is hidden until an order is placed.
 */
export const eft = {
  bank: import.meta.env.EFT_BANK as string | undefined,
  accountNumber: import.meta.env.EFT_ACCOUNT_NUMBER as string | undefined,
  branchCode: import.meta.env.EFT_BRANCH_CODE as string | undefined,
  accountName: import.meta.env.EFT_ACCOUNT_NAME as string | undefined,
};

export const hasEft = Boolean(eft.bank && eft.accountNumber);
