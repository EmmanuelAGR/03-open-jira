
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pending: Officia ipsum qui occaecat enim duis nulla veniam labore excepteur in magna eiusmod proident.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'In-Progress: Ea cupidatat in nostrud proident duis consectetur velit est.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        'Finished: Anim labore culpa commodo dolor velit adipisicing deserunt proident consectetur aliquip ut laborum.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ]
}
