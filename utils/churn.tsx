export const initiateChurn = (id: string, key: string) => {
  (window as any).churnkey.init("show", {
    customerId: id,
    authHash: key,
    appId: "c1v2373yz",
    mode: "live",
    provider: "stripe",
  });
};
