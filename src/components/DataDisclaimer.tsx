export function DataDisclaimer() {
  return (
    <p className="mt-4 rounded-xl bg-accent-soft border border-accent/20 px-3.5 py-2.5 text-[12px] text-muted leading-relaxed">
      <strong className="text-accent">⚠ Reference data, not live.</strong> Train and station details come
      from India&apos;s Open Government Data (data.gov.in) and may be incomplete or out of date. Timings,
      routes and availability change — always verify on{" "}
      <a href="https://www.irctc.co.in" target="_blank" rel="nofollow noopener" className="underline underline-offset-2">IRCTC</a>{" "}
      or{" "}
      <a href="https://enquiry.indianrail.gov.in" target="_blank" rel="nofollow noopener" className="underline underline-offset-2">NTES</a>{" "}
      before booking or travel.
    </p>
  );
}
