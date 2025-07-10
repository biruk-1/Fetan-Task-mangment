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
      // Create test user
      server.create('user', {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as User);

      // Create sample tasks
      const sampleTasks = [
        {
          id: '1',
          title: 'FetanSystem Technology internship test project',
          status: 'completed',
          userId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'FetanSystem Technology internship test project',
          status: 'in_progress',
          userId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'FetanSystem Technology internship test project',
          status: 'pending',
          userId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'FetanSystem Technology internship test project',
          status: 'completed',
          userId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          title: 'FetanSystem Technology internship test project',
          status: 'pending',
          userId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];

      sampleTasks.forEach(task => {
        server.create('task', task as Task);
      });
    },

    routes() {
      this.namespace = 'api';

      // Auth endpoints
      this.post('/auth/login', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.findBy('user', { email });

        if (user && password === 'password') {
          return {
            token: 'fake-jwt-token',
            user: user.attrs,
          };
        }

        return new Response(401, {}, { error: 'Invalid credentials' });
      });

      this.post('/auth/signup', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.create('user', {
          ...attrs,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as User);

        return {
          token: 'fake-jwt-token',
          user: user.attrs,
        };
      });

      // Task endpoints
      this.get('/tasks', (schema) => {
        const tasks = schema.all('task');
        return tasks.models.map(task => ({
          ...task.attrs,
          status: task.attrs.status || 'pending',
        }));
      });

      this.post('/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newTask = {
          id: Math.random().toString(36).substr(2, 9),
          title: attrs.title,
          status: 'pending',
          userId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Task;
        
        const task = schema.create('task', newTask);
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
        } as Task);

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