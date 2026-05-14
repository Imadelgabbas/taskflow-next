import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default async function DashboardPage() {
  const res = await fetch('http://localhost:4000/projects', {
    cache: 'no-store',
  });

  const projects: Project[] = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <AddProjectForm />

      <ul>
        {projects.map((p) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />

            <a href={`/projects/${p.id}`}>{p.name}</a>

            <form action={renameProject} style={{ display: 'flex', gap: 4 }}>
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="color" value={p.color} />

              <input
                name="newName"
                defaultValue={p.name}
                required
                style={{
                  padding: 4,
                  border: '1px solid #ccc',
                  borderRadius: 4,
                }}
              />

              <button
                type="submit"
                style={{
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Rename
              </button>
            </form>

            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />

              <button
                type="submit"
                style={{
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}