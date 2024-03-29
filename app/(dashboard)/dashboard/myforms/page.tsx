import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import FormSearch from "@/components/formStatsPage/FormSearch";
import { SearchParamProps } from "@/types";
import CardStatsWrapper from "@/components/formStatsPage/CardStatsWrapper";
import FormCardSkeleton from "@/components/formStatsPage/FormCardSkeleton";
import FormCards from "@/components/formStatsPage/FormCards";
import StatsCards from "@/components/formStatsPage/StatsCards";
import NoFormsCard from "@/components/formStatsPage/NoFormsCard";

export default async function Home({ searchParams }: SearchParamProps) {
  const searchText = (searchParams?.query as string) || "";
  return (
    <div className="container pt-4 mb-8">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 mx-auto md:items-end md:justify-between ">
        <h2 className="text-4xl font-bold col-span-1">Your forms</h2>
        <FormSearch />
      </div>

      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4, 5].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards searchText={searchText} />
        </Suspense>
      </div>
    </div>
  );
}

// async function CardStatsWrapper() {
//   const stats = await GetFormStats();
//   console.log(stats);
//   return <StatsCards loading={false} data={stats} />;
// }

// interface StatsCardProps {
//   data?: Awaited<ReturnType<typeof GetFormStats>>;
//   loading: boolean;
// }

// function StatsCards(props: StatsCardProps) {
//   const { data, loading } = props;

//   return (
//     <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//       <StatsCard
//         title="Total visits"
//         icon={<LuView className="text-blue-600" />}
//         helperText="All time form visits"
//         value={data?.visits.toLocaleString() || ""}
//         loading={loading}
//         className="shadow-md shadow-blue-600"
//       />

//       <StatsCard
//         title="Total submissions"
//         icon={<FaWpforms className="text-yellow-600" />}
//         helperText="All time form submissions"
//         value={data?.submissions.toLocaleString() || ""}
//         loading={loading}
//         className="shadow-md shadow-yellow-600"
//       />

//       <StatsCard
//         title="Submission rate"
//         icon={<HiCursorClick className="text-green-600" />}
//         helperText="Visits that result in form submission"
//         value={data?.submissionRate.toLocaleString() + "%" || ""}
//         loading={loading}
//         className="shadow-md shadow-green-600"
//       />

//       <StatsCard
//         title="Bounce rate"
//         icon={<TbArrowBounce className="text-red-600" />}
//         helperText="Visits that leaves without interacting"
//         value={data?.submissionRate.toLocaleString() + "%" || ""}
//         loading={loading}
//         className="shadow-md shadow-red-600"
//       />
//     </div>
//   );
// }

// function StatsCard({
//   title,
//   value,
//   icon,
//   helperText,
//   loading,
//   className,
// }: {
//   title: string;
//   value: string;
//   helperText: string;
//   className: string;
//   loading: boolean;
//   icon: ReactNode;
// }) {
//   return (
//     <Card className={className}>
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-sm font-medium text-muted-foreground">
//           {title}
//         </CardTitle>
//         {icon}
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">
//           {loading && (
//             <Skeleton>
//               <span className="opacity-0">0</span>
//             </Skeleton>
//           )}
//           {!loading && value}
//         </div>
//         <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
//       </CardContent>
//     </Card>
//   );
// }

// function FormCardSkeleton() {
//   return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
// }

// async function FormCards() {
//   const forms = await GetForms();
//   console.log(forms);

//   return (
//     <>
//       {forms?.map((form) => (
//         <FormCard key={form.id} form={form} />
//       ))}
//     </>
//   );
// }

// function FormCard({ form }: { form: any }) {
//   console.log(form);
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 justify-between">
//           <span className="truncate font-bold">{form.name}</span>
//           {form.published && <Badge>Published</Badge>}
//           {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
//         </CardTitle>
//         <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
//           {formatDistance(form.createdAt, new Date(), {
//             addSuffix: true,
//           })}
//           {form.published && (
//             <span className="flex items-center gap-2">
//               <LuView className="text-muted-foreground" />
//               <span>{form.visits.toLocaleString()}</span>
//               <FaWpforms className="text-muted-foreground" />
//               <span>{form.submissions.toLocaleString()}</span>
//             </span>
//           )}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
//         {form.description || "No description"}
//       </CardContent>
//       <CardFooter>
//         {form.published && (
//           <Button asChild className="w-full mt-2 text-md gap-4">
//             <Link href={`/dashboard/myforms/forms/${form.id}`}>
//               View submissions <BiRightArrowAlt />
//             </Link>
//           </Button>
//         )}
//         {!form.published && (
//           <Button
//             asChild
//             variant={"secondary"}
//             className="w-full mt-2 text-md gap-4"
//           >
//             <Link href={`/builder/${form.id}`}>
//               Edit form <FaEdit />
//             </Link>
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }
