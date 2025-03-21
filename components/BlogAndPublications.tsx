import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogsAndPublications } from "@/data/blogs";


const MediumIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="inline-block"
  >
    <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.904c-.165.126-.247.344-.204.563v13.517c-.043.22.039.437.204.563l1.868 1.904v.403h-9.337v-.403l1.937-1.882c.19-.19.19-.505 0-.695l-5.446-13.205-6.1 13.205c-.146.19-.37.19-.558 0l-5.81-2.977v-.403l2.208-2.15zm14.739 5.008l-2.406 5.828h5.604l-3.198-5.828z" />
  </svg>
);

export default function BlogAndPublications() {
  return (
    <section id="blog" className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
      <h2 className="text-4xl font-bold text-center mb-12 relative text-foreground dark:text-white">
          <BookOpen className="inline-block mr-2 h-8 w-8 text-primary" />
          Blogs & Publications
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </h2>
        
        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="grid grid-cols-2 w-[300px] mx-auto mb-8 bg-primary/10 rounded-full p-1 shadow-sm">
            <TabsTrigger
              value="blogs"
              className="rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/20"
            >
              Blogs
            </TabsTrigger>
            <TabsTrigger
              value="publications"
              className="rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/20"
            >
              Publications
            </TabsTrigger>
          </TabsList>

          {/* Blogs Tab */}
          <TabsContent value="blogs">
            <div className="max-w-5xl mx-auto">
              <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted/20">
                {blogsAndPublications
                  .filter((item) => item.type === "blog")
                  .map((blog) => (
                    <Card
                      key={blog.title}
                      className="flex-none w-80 p-6 bg-gradient-to-br from-primary/5 to-background border border-primary/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
                      <span className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm flex items-center space-x-1">
                        <MediumIcon />
                        <span>Medium</span>
                      </span>
                      <h3 className="text-xl font-semibold mb-2 text-justify mt-5">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{blog.date}</p>
                      <p className="text-muted-foreground mb-4 text-justify line-clamp-3">{blog.description}</p>
                      <Button
                        asChild
                        variant="link"
                        className="p-0 h-auto text-primary hover:underline transition-colors duration-200"
                      >
                        <Link href={blog.link} target="_blank">
                          Read More →
                        </Link>
                      </Button>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Publications Tab */}
          <TabsContent value="publications">
            <div className="max-w-2xl mx-auto">
              {blogsAndPublications
                .filter((item) => item.type === "publication")
                .map((publication) => (
                  <Card
                    key={publication.title}
                    className="p-6 bg-gradient-to-br from-primary/5 to-background border border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                  >
                    <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
                    <span className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                      Featured
                    </span>
                    <h3 className="text-xl font-semibold mb-2 text-justify mt-5">{publication.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{publication.date}</p>
                    <div className="max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted/20">
                      <p className="text-muted-foreground mb-4 text-justify">{publication.description}</p>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p><strong>Publisher:</strong> {publication.publisher}</p>
                        <p><strong>Location:</strong> {publication.location}</p>
                        <p><strong>Conference:</strong> {publication.conference}</p>
                        <p><strong>DOI:</strong> {publication.doi}</p>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="link"
                      className="mt-4 p-0 h-auto text-primary hover:underline transition-colors duration-200"
                    >
                      <Link href={publication.link} target="_blank">
                        View Publication →
                      </Link>
                    </Button>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}