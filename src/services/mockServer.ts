import { createServer, Model, Response } from 'miragejs';
import { Task, User } from '../types/task';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      task: Model.extend<Partial<Task>>({}),
      user: Model.extend<Partial<User>>({}),
    },

    seeds(server) {
      server.create('user', {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as User);
    },

    routes() {
      this.namespace = 'api';

      this.post('/auth/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.findBy('user', { email: email.toLowerCase() }) as any;

        if (user && password === 'password') {
          return {
            user: user.attrs,
            token: 'fake-jwt-token',
          };
        }

        return new Response(
          401,
          {},
          { error: 'Invalid email or password' }
        );
      });

      this.get('/tasks', (schema) => {
        const tasks = schema.all('task');
        return tasks.models.map((task: any) => ({
          ...task.attrs,
          status: task.attrs?.status || 'pending',
          completed: task.attrs?.completed || false,
        }));
      });

      this.post('/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const task = schema.create('task', {
          ...attrs,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Task);

        return task.attrs;
      });

      this.patch('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const task = schema.find('task', id) as any;

        if (!task) {
          return new Response(404, {}, { error: 'Task not found' });
        }

        const updatedTask = task.update({
          ...task.attrs,
          ...attrs,
          updatedAt: new Date().toISOString(),
        });

        return updatedTask.attrs;
      });

      this.delete('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const task = schema.find('task', id);

        if (!task) {
          return new Response(404, {}, { error: 'Task not found' });
        }

        task.destroy();
        return new Response(204);
      });
    },
  });
} 