"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import {
  File,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { deleteNews, getNews, newArticle, setToPublish } from "../actions";
import { formatedTime } from "@/utils/formater";

import { any, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  bodycopy: z.string(),
  img_url: z.string(),
});

interface Item {
  id: string;
  title: string;
  isPublished: boolean;
  createAt: string; // Adjust the type if this is different
}
const News = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [news, setNews] = useState<Item[]>([]);
  const [media, setMedia] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      bodycopy: "",
      img_url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await newArticle(values);
    fetchdata();
    console.log(values);
  };

  const fetchdata = async () => {
    try {
      const data: Item[] = await getNews();
      setNews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const identik = uuidv4();

    const { data, error } = await supabase.storage
      .from("hmtt_img_storage")
      .upload("image" + "/" + identik, file);

    if (data) {
      const imageUrl = `https://jkqjspqfaakifrkxfmcv.supabase.co/storage/v1/object/public/hmtt_img_storage/image/${identik}`;
      form.setValue("img_url", imageUrl);
      setMedia(imageUrl);
    } else {
      console.log(error);
    }
  };

  const handleDelete = async (news: Item) => {
    try {
      await deleteNews(news);
      await fetchdata();
    } catch (error) {
      console.error("Error Deleting:", error);
    }
  };

  const handlePublish = async (news: Item) => {
    try {
      await setToPublish(news);
      await fetchdata();
    } catch (error) {
      console.error("Error Publishing:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="h-8 gap-1"
                          onClick={() => setIsDialogOpen(true)}
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add News
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Create new article</DialogTitle>
                          <DialogDescription>
                            Create new Artice here
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="bodycopy"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bodycopy</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="shadcn" {...field} />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                upload(e);
                              }}
                            />

                            <div>
                              {media === "" ? (
                                <></>
                              ) : (
                                <img className="w-[200px]" src={media} />
                              )}
                            </div>

                            <Button
                              type="submit"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Submit
                            </Button>
                          </form>
                        </Form>

                        {/* <input type="file" onChange={(e) => upload(e)} /> */}
                        {/* <Button onClick={upload} /> */}

                        <div className="grid gap-4 py-4"></div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Telco News</CardTitle>
                    <CardDescription>Manage your news here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {/* <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead> */}
                          <TableHead>Title</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date Created
                          </TableHead>

                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {news.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.title}
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.isPublished == true ? (
                                <Badge>Published</Badge>
                              ) : (
                                <Badge variant="secondary">Draft</Badge>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatedTime(item.createAt)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => handlePublish(item)}
                                  >
                                    Publish
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDelete(item)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                      products
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default News;
