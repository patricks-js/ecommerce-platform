import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/lib/api";

// This would typically come from a database or API
const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    createdAt: "2023-01-15T10:00:00Z",
    status: true,
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@example.com",
    createdAt: "2023-02-20T14:30:00Z",
    status: false,
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    createdAt: "2023-03-10T09:15:00Z",
    status: true,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Ana Rodrigues",
    email: "ana.rodrigues@example.com",
    createdAt: "2023-04-05T16:45:00Z",
    status: true,
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
];

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Lista de Usuários</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                <Badge variant={user.status ? "default" : "destructive"}>
                  {user.status ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
