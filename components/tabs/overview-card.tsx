import React from "react";
import { Skeleton } from "../ui/skeleton";
import { formatToAmount } from "@/lib/utils";

type OverviewCardProps = {
  isLoading: boolean;
  title: string;
  amount?: number;
  infotext: string;
  color: string;
};

export const OverviewCard = ({
  isLoading,
  title,
  amount,
  infotext,
  color,
}: OverviewCardProps) => {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="mt-4">
          <Skeleton className="h-8" />
          <p className="text-sm text-muted-foreground">{infotext}</p>
        </div>
      </div>
    );
  }

  if (amount == undefined) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-gray-300">No data</div>
          <p className="text-sm text-muted-foreground">{infotext}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="mt-4">
        <div className={`text-3xl font-bold ${color}`}>
          {formatToAmount(amount)}
        </div>
        <p className="text-sm text-muted-foreground">{infotext}</p>
      </div>
    </div>
  );
};
