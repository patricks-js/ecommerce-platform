import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPendingSellers } from "@/lib/api";
import { Check, MoreHorizontal, X } from "lucide-react";

export default async function AppliesPage() {
  const pendingApplication = await getPendingSellers();

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Aplicações de Usuários</h1>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ações</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data da Aplicação</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="max-h-[800px] overflow-auto">
          <Table>
            <TableBody>
              {pendingApplication.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="grid gap-4">
                          <Button size="sm" className="w-full">
                            <Check className="mr-2 h-4 w-4" /> Aceitar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full"
                          >
                            <X className="mr-2 h-4 w-4" /> Rejeitar
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={application.avatar}
                        alt={application.name}
                      />
                      <AvatarFallback>
                        {application.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {application.name}
                  </TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>
                    {new Date(application.applicationDate).toLocaleDateString(
                      "pt-BR",
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.status === "approved"
                          ? "success"
                          : application.status === "rejected"
                            ? "destructive"
                            : "default"
                      }
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
