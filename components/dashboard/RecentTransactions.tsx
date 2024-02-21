import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getChildOrders } from "@/lib/actions/ChildOrder.actions";

// Function to get initials from a name
const getInitials = (name: any) => {
  const parts = name.split(" ");
  return parts
    .map((part: any) => part.charAt(0))
    .join("")
    .toUpperCase();
};
const RecentTransactions = async () => {
  const limitedChildOrders = await getChildOrders({
    searchString: "",
    transactionType: "",
    limit: 5, // Retrieve 10 transactions
  });

  console.log(limitedChildOrders);
  return (
    <div className="space-y-8">
      {limitedChildOrders.map((order: any) => (
        <div key={order._id} className="flex items-center">
          <Avatar className="h-9 w-9 text-sm ">
            <AvatarImage src={`/avatars/${order.avatar}.png`} alt="Avatar" />
            <AvatarFallback className="h-9 w-9 text-sm font-medium">
              {getInitials(order.buyerName)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order.buyerName}
            </p>
            <p className="text-sm text-muted-foreground">{order.phoneNumber}</p>
          </div>
          <div className="flex flex-col ml-auto">
            <div className="ml-auto font-medium">+UGX.{order.price}</div>
            <div className="ml-auto font-small text-sm text-primary">
              {order.transactionType}
            </div>
          </div>
        </div>
      ))}
    </div>
    // <div className="space-y-8">
    //   <div className="flex items-center">
    //     <Avatar className="h-9 w-9">
    //       <AvatarImage src="/avatars/01.png" alt="Avatar" />
    //       <AvatarFallback>OM</AvatarFallback>
    //     </Avatar>
    //     <div className="ml-4 space-y-1">
    //       <p className="text-sm font-medium leading-none">Olivia Martin</p>
    //       <p className="text-sm text-muted-foreground">
    //         olivia.martin@email.com
    //       </p>
    //     </div>
    //     <div className="ml-auto font-medium">+$1,999.00</div>
    //   </div>
    //   <div className="flex items-center">
    //     <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
    //       <AvatarImage src="/avatars/02.png" alt="Avatar" />
    //       <AvatarFallback>JL</AvatarFallback>
    //     </Avatar>
    //     <div className="ml-4 space-y-1">
    //       <p className="text-sm font-medium leading-none">Jackson Lee</p>
    //       <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
    //     </div>
    //     <div className="ml-auto font-medium">+$39.00</div>
    //   </div>
    //   <div className="flex items-center">
    //     <Avatar className="h-9 w-9">
    //       <AvatarImage src="/avatars/03.png" alt="Avatar" />
    //       <AvatarFallback>IN</AvatarFallback>
    //     </Avatar>
    //     <div className="ml-4 space-y-1">
    //       <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
    //       <p className="text-sm text-muted-foreground">
    //         isabella.nguyen@email.com
    //       </p>
    //     </div>
    //     <div className="ml-auto font-medium">+$299.00</div>
    //   </div>
    //   <div className="flex items-center">
    //     <Avatar className="h-9 w-9">
    //       <AvatarImage src="/avatars/04.png" alt="Avatar" />
    //       <AvatarFallback>WK</AvatarFallback>
    //     </Avatar>
    //     <div className="ml-4 space-y-1">
    //       <p className="text-sm font-medium leading-none">William Kim</p>
    //       <p className="text-sm text-muted-foreground">will@email.com</p>
    //     </div>
    //     <div className="ml-auto font-medium">+$99.00</div>
    //   </div>
    //   <div className="flex items-center">
    //     <Avatar className="h-9 w-9">
    //       <AvatarImage src="/avatars/05.png" alt="Avatar" />
    //       <AvatarFallback>SD</AvatarFallback>
    //     </Avatar>
    //     <div className="ml-4 space-y-1">
    //       <p className="text-sm font-medium leading-none">Sofia Davis</p>
    //       <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
    //     </div>
    //     <div className="ml-auto font-medium">+$39.00</div>
    //   </div>
    // </div>
  );
};
export default RecentTransactions;
