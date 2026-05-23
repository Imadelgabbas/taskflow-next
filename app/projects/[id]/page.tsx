import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();

  return projects.map((p) => ({
    id: String(p.id),
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });

  if (!project) notFound();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: project.color,
            marginRight: 8,
          }}
        />
        {project.name}
      </h1>

      <p>Créé le : {project.createdAt.toLocaleDateString('fr-FR')}</p>

      <a href="/dashboard">← Retour</a>
    </div>
  );
}