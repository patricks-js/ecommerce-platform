"use client";

import CreateCategoryForm from "@/components/forms/create-category-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, Line, LineChart } from "recharts";

// Sample data
const activeUsersData = [
  { month: "Jan", users: 4000 },
  { month: "Feb", users: 4500 },
  { month: "Mar", users: 5000 },
  { month: "Apr", users: 5500 },
  { month: "May", users: 6000 },
  { month: "Jun", users: 6500 },
];

const totalSalesData = [
  { month: "Jan", sales: 50000 },
  { month: "Feb", sales: 55000 },
  { month: "Mar", sales: 60000 },
  { month: "Apr", sales: 65000 },
  { month: "May", sales: 70000 },
  { month: "Jun", sales: 75000 },
];

const topSellers = [
  {
    id: 1,
    name: "Maria Silva",
    sales: 150000,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "João Santos",
    sales: 120000,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Ana Oliveira",
    sales: 100000,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Carlos Rodrigues",
    sales: 90000,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Beatriz Ferreira",
    sales: 80000,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

const totalTransactionValue = 15000000; // R$ 15 million

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard do Marketplace</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Valor Total Movimentado na Plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">
            {totalTransactionValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usuários Ativos</CardTitle>
            <CardDescription>Número de usuários ativos por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Usuários",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <LineChart data={activeUsersData}>
                <Line dataKey="users" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total de Vendas</CardTitle>
            <CardDescription>
              Valor total de vendas por mês (R$)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "Vendas",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={totalSalesData}>
                <Bar dataKey="sales" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-start gap-8 mt-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Vendedores Mais Populares</CardTitle>
            <CardDescription>
              Top 5 vendedores por volume de vendas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Total de Vendas (R$)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={seller.avatar} alt={seller.name} />
                        <AvatarFallback>
                          {seller.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{seller.name}</span>
                    </TableCell>
                    <TableCell>
                      {seller.sales.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create Category</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateCategoryForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
