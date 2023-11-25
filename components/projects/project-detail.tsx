//import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import API_URL from "@/api/config";
import { useTranslations } from "next-intl";
import ProjectCard from "./project-card";
import { TSimpleProject } from "@/types/types";

interface DetailProjectProps {
  data?: TSimpleProject[];
  setSelectedProject?: (project: TSimpleProject) => void;
}

export default function DetailProject({
  setSelectedProject,
}: DetailProjectProps) {
  const lang = useTranslations("Projects");

  const { data: session } = useSession();
  const [projects, setProjects] = useState<TSimpleProject[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      setIsLoading(true);
      fetch(`${API_URL}/customer/projects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProjects(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener los proyectos:", error);
          setError("Error al cargar los datos");
          setIsLoading(false);
        });
    }
  }, [session]);

  if (isLoading) return <p>{lang("loading")}</p>;
  if (error) return <p>{error}</p>;
  if (!projects.length) return <p>{lang("no_projects")}</p>;

  return (
    <>
      {projects.map((project) => {
        return (
          <div key={project.id}>
            <ProjectCard
              project={project}
              setSelectedProject={setSelectedProject}
            />
          </div>
        );
      })}
    </>
  );
}
