import { InMemoryDbService } from 'angular-in-memory-web-api';

export class FakeBackendService implements InMemoryDbService { 
    createDb() {
        const tasks = [
            {
                id: 1,
                description: 'Pular pedra',
            },
            {
                id: 2,
                description: 'Pular barata'

            }
        ];

        return { tasks: tasks };
    }
}