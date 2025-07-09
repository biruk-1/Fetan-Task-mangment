import { createServer, Model, Response, Registry } from 'miragejs';
import { AuthResponse, LoginCredentials, SignupCredentials, Task, User } from '../types/task';

export function makeServer() {
  return createServer({
    models: {
      task: Model.extend<Partial<Task>>({}),
      user: Model.extend<Partial<User>>({}),
    },

    seeds(server) {
      server.create('user', {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      } as Partial<User>);

      server.createList('task', 5, {
        title: 'Sample Task',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Partial<Task>);
    },

    routes() {
      this.namespace = 'api';

      // Auth routes
      this.post('/auth/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody) as LoginCredentials;
        const user = schema.findBy('user', { email: attrs.email } as Partial<User>);

        if (!user || attrs.password !== 'password') {
          return new Response(401, {}, { error: 'Invalid credentials' });
        }

        return {
          token: 'fake-jwt-token',
          user: user.attrs,
        };
      });

      this.post('/auth/signup', (schema, request) => {
        const attrs = JSON.parse(request.requestBody) as SignupCredentials;
        const existingUser = schema.findBy('user', { email: attrs.email } as Partial<User>);

        if (existingUser) {
          return new Response(400, {}, { error: 'Email already exists' });
        }

        const user = schema.create('user', {
          ...attrs,
          id: Math.random().toString(36).substr(2, 9),
        } as Partial<User>);

        return {
          token: 'fake-jwt-token',
          user: user.attrs,
        };
      });

      // Task routes
      this.get('/tasks', (schema) => {
        const tasks = schema.all('task');
        return tasks.models.map(model => model.attrs);
      });

      this.post('/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const task = schema.create('task', {
          ...attrs,
          id: Math.random().toString(36).substr(2, 9),
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Partial<Task>);
        return task.attrs;
      });

      this.patch('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const task = schema.find('task', id);
        if (!task) {
          return new Response(404, {}, { error: 'Task not found' });
        }
        const updatedTask = task.update({
          ...attrs,
          updatedAt: new Date().toISOString(),
        } as Partial<Task>);
        return updatedTask.attrs;
      });

      this.delete('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const task = schema.find('task', id);
        if (!task) {
          return new Response(404, {}, { error: 'Task not found' });
        }
        task.destroy();
        return new Response(204, {});
      });
    },
  });
} 