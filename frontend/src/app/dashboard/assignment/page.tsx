"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Circle, Filter, MoreVertical, Plus, Search } from "lucide-react";
import EmptyAssignmentState from "@/components/dashboard/empty-assignment-state";
import { useAuthStore } from "@/store/auth.store";
import { useAssignmentStore } from "@/store/assignment.store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import toast from "react-hot-toast";

export default function AssignmentsPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "none">("none");

  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  const { assignments, isLoading, fetchAssignments } = useAssignmentStore();

  const filteredAssignments = useMemo(() => {
    let filtered = [...assignments];

    filtered = filtered.filter((assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortBy !== "none") {
      filtered.sort((a, b) => {
        const firstDate = new Date(a.createdAt).getTime();

        const secondDate = new Date(b.createdAt).getTime();

        return sortBy === "latest"
          ? secondDate - firstDate
          : firstDate - secondDate;
      });
    }

    return filtered;
  }, [assignments, searchQuery, sortBy]);

  const handleDeleteAssignment = async (assignmentId: string) => {
    const toastId = toast.loading("Deleting assignment...");

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/assignments/${assignmentId}`,
        {
          withCredentials: true,
        },
      );

      await fetchAssignments();

      toast.success("Assignment deleted", {
        id: toastId,
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete assignment", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAssignments();
    }
  }, [isAuthenticated, fetchAssignments]);

  if (isCheckingAuth || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-black" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (assignments.length === 0) {
    return <EmptyAssignmentState />;
  }

  return (
    <div className="animate-in fade-in duration-500 w-full">
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500/20">
            <Circle className="h-2.5 w-2.5 fill-green-500 text-green-500" />
          </div>

          <h1 className="text-[32px] font-bold tracking-[-0.04em] text-foreground">
            Assignments
          </h1>
        </div>

        <p className="mt-1 pl-7 text-sm text-muted-foreground">
          Manage and create assignments for your classes.
        </p>
      </div>

      <Card className="mb-5 flex flex-col gap-3 rounded-[26px] border-border bg-card/80 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        <Select
          value={sortBy}
          onValueChange={(value) =>
            setSortBy(value as "latest" | "oldest" | "none")
          }
        >
          <SelectTrigger className="h-10 w-47.5 rounded-xl border-border bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-black/10 focus:ring-2 focus:ring-black/5">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />

              <SelectValue />
            </div>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="none">Remove Filter</SelectItem>

            <SelectItem value="latest">Latest First</SelectItem>

            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Assignment"
            className="h-10 rounded-full border-border bg-background/80 pl-11 backdrop-blur-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-0"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredAssignments.map((assignment) => (
          <Card
            key={assignment._id}
            onClick={(e) => {
              e.stopPropagation();

              router.push(`/dashboard/assignment/${assignment._id}`);
            }}
            className="group rounded-[28px] curosor-pointer border-border bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5"
          >
            <div className="flex items-start justify-between">
              <h2 className="max-w-[80%] text-[24px] font-bold tracking-[-0.04em] text-foreground transition-colors duration-300 group-hover:text-black/80">
                {assignment.title}
              </h2>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                    className="h-8 w-8 rounded-full transition-all duration-300 hover:scale-110 hover:bg-black/5"
                  >
                    <MoreVertical className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40 rounded-2xl">
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/assignment/${assignment._id}`)
                    }
                    className="cursor-pointer"
                  >
                    Open Assignment
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAssignment(assignment._id);
                    }}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    Delete Assignment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Assigned on :
                  <span className="ml-1 font-normal text-muted-foreground">
                    {new Date(assignment.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Due :
                  <span className="ml-1 font-normal text-muted-foreground">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <Button
          onClick={() => router.push("/dashboard/assignment/create")}
          className="h-12 rounded-full border border-[#ff7a45] bg-black px-6 text-sm font-medium text-white shadow-[0_10px_40px_rgba(255,122,69,0.25)] transition-all duration-300 hover:scale-[1.03] hover:bg-black/95 hover:shadow-[0_15px_50px_rgba(255,122,69,0.35)] active:scale-[0.98]"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Assignment
        </Button>
      </div>
    </div>
  );
}
