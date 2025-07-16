
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLinks } from "@/hooks/useLinks";
import { AddLinkDialog } from "@/components/links/AddLinkDialog";
import { LinksList } from "@/components/links/LinksList";
import { LinksStats } from "@/components/links/LinksStats";
import { Loader } from "lucide-react";

const Links = () => {
  const { links, loading, addLink, toggleLinkStatus, deleteLink } = useLinks();

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader className="w-8 h-8 animate-spin text-green-500" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gerenciar Links
            </h1>
            <p className="text-gray-600">
              Organize e monitore todos os seus links
            </p>
          </div>
          
          <AddLinkDialog onAddLink={addLink} />
        </div>

        {/* Stats */}
        <LinksStats links={links} />

        {/* Links List */}
        <Card>
          <CardHeader>
            <CardTitle>Seus Links</CardTitle>
            <CardDescription>
              Gerencie e organize seus links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LinksList 
              links={links}
              onToggleStatus={toggleLinkStatus}
              onDelete={deleteLink}
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Links;
