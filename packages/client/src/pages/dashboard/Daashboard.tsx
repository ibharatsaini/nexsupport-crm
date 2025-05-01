import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Users, Building2, Ticket, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getTicketCountByStatus } from "../../api/tickets";
import { getDefaultOrganizations, getOrganizationUsers } from "../../api/organizations";
import { getTicketsByOrganization } from "../../api/tickets";
import { formatRelativeTime } from "../../lib/utils";
import { useAuthStore } from "../../stores/authStore";
import { useOrganizationStore } from "../../stores/organizationStore";
import Select, { Option } from "../../components/ui/Select";
import { getOrganizations } from "../../api/organizations";
import Badge from "../../components/ui/Badge";
// import { organizations } from "../../data/mockData";

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    selectedOrganization,
    setSelectedOrganization,
    fetchAndSetFirstOrganization,
  } = useOrganizationStore();

  // Fetch organizations
  const { data: organizationsResponse } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getDefaultOrganizations(),
  });
  const {data: allOrganizations} = useQuery({
    queryKey: ['all_organization'],
    queryFn: ()=>getOrganizations()
  })
  console.log(organizationsResponse, selectedOrganization);
  // Set first organization as default if none selected
  useEffect(() => {
    console.log(
      selectedOrganization,
      organizationsResponse,
      organizationsResponse
    );
    if (
      !selectedOrganization &&
      organizationsResponse 
      // organizationsResponse.length > 0
    ) {
      console.log(`Here`);
      fetchAndSetFirstOrganization();
    }
  }, [
    organizationsResponse,
    selectedOrganization,
    fetchAndSetFirstOrganization,
  ]);

  // Fetch stats based on selected organization
  console.log(selectedOrganization);
  const { data: ticketStats } = useQuery({
    queryKey: ["ticketStats", selectedOrganization?.id],
    queryFn: () =>
      selectedOrganization && getTicketCountByStatus(selectedOrganization?.id),
    enabled: !!selectedOrganization,
  });

  const { data: usersResponse } = useQuery({
    queryKey: ["organizationUsers", selectedOrganization?.id],
    queryFn: () => getOrganizationUsers(selectedOrganization!.id),
    enabled: !!selectedOrganization,
  });

  const { data: ticketsResponse } = useQuery({
    queryKey: ["organizationTickets", selectedOrganization?.id],
    queryFn: () => getTicketsByOrganization(selectedOrganization!.id),
    enabled: !!selectedOrganization,
  });

  // if (!organizationsResponse) {
  //   navigate(`/onboarding`);
  // }
  if (!allOrganizations) return <></>;
  
  const organizations = allOrganizations
  const organizationOptions =
    organizations!.length &&
    organizations.map((org) => ({
      value: org.id,
      label: org.name,
    }));

  const handleOrganizationChange = (orgId: string) => {
    const org = allOrganizations!.find((o) => o.id === orgId);
    if (org) {
      setSelectedOrganization(org);
    }
  };

  if(!ticketStats) return <></>

  console.log(ticketStats,ticketsResponse)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Select
            options={organizationOptions as Option[]}
            value={selectedOrganization?.id || ""}
            onChange={handleOrganizationChange}
            className="w-48"
          />
          <Button
            as={Link}
            type="button"
            to="/tickets/new"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Create Ticket
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ticketsResponse?.length || "0"}
            </div>
            <p className="text-xs text-gray-500">
              In {selectedOrganization?.name}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ticketStats!.OPEN || "0"}
            </div>
            <p className="text-xs text-gray-500">Requiring attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersResponse?.length || "0"}
            </div>
            <p className="text-xs text-gray-500">Team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.length || "0"}
            </div>
            <p className="text-xs text-gray-500">Total organizations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketsResponse?.slice(0, 5).map((ticket) => (
                <Link
                  key={ticket.id}
                  to={`/tickets/${ticket.id}`}
                  className="block hover:bg-gray-50 -mx-4 px-4 py-2 rounded-md transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{ticket.title}</p>
                      <p className="text-sm text-gray-500">
                        {formatRelativeTime(ticket.createdAt)}
                      </p>
                    </div>
                    <Badge
                      variant={ticket.status === "OPEN" ? "warning" : "success"}
                    >
                      {ticket.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usersResponse?.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-700 font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Badge>{user.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
