import { FinderPage } from "@/components/route-ui";
export function generateStaticParams() {
  return [{ kind: "hair" }, { kind: "beauty" }];
}
export default async function FinderRoute({
  params,
}: {
  params: Promise<{ kind: string }>;
}) {
  const { kind } = await params;
  return <FinderPage kind={kind === "hair" ? "hair" : "beauty"} />;
}
