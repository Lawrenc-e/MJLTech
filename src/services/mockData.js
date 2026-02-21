export const mockProjects = [
  {
    id: 'PRJ-104',
    name: 'Client Portal Revamp',
    summary: 'Unified workspace for clients, support, and delivery.',
    client: 'Northwind Logistics',
    status: 'In Progress',
    updatedAt: '2026-01-22',
    budget: '$48k',
    timeline: '8 weeks'
  },
  {
    id: 'PRJ-108',
    name: 'Inventory Intelligence',
    summary: 'Real-time forecasting and automated replenishment.',
    client: 'Apex Manufacturing',
    status: 'Submitted',
    updatedAt: '2026-02-04',
    budget: '$32k',
    timeline: '6 weeks'
  },
  {
    id: 'PRJ-097',
    name: 'Mobile Service Desk',
    summary: 'Field-ready support app for on-site teams.',
    client: 'Helios Health',
    status: 'Completed',
    updatedAt: '2026-01-10',
    budget: '$65k',
    timeline: '10 weeks'
  }
];

export const mockTasks = [
  {
    id: 'TSK-077',
    title: 'Implement authentication flow',
    project: 'Client Portal Revamp',
    status: 'In Progress',
    dueDate: '2026-02-14',
    priority: 'High'
  },
  {
    id: 'TSK-081',
    title: 'Design delivery status timeline',
    project: 'Client Portal Revamp',
    status: 'Review',
    dueDate: '2026-02-12',
    priority: 'Medium'
  },
  {
    id: 'TSK-093',
    title: 'Build forecast API integration',
    project: 'Inventory Intelligence',
    status: 'Todo',
    dueDate: '2026-02-18',
    priority: 'High'
  }
];

export const mockAdminStats = {
  clients: 28,
  developers: 14,
  projects: 42,
  satisfaction: '4.8/5'
};

export const mockUsers = [
  {
    id: 'USR-001',
    name: 'Ava Morales',
    role: 'client',
    company: 'Northwind Logistics',
    status: 'Active'
  },
  {
    id: 'USR-007',
    name: 'Devon Reed',
    role: 'developer',
    company: 'MJLTechs',
    status: 'Active'
  },
  {
    id: 'USR-012',
    name: 'Sofia Chen',
    role: 'developer',
    company: 'MJLTechs',
    status: 'Active'
  },
  {
    id: 'USR-020',
    name: 'Maya Patel',
    role: 'admin',
    company: 'MJLTechs',
    status: 'Active'
  }
];

export const mockProducts = [
  {
    id: 'PRD-001',
    name: 'Workflow Orchestrator',
    stage: 'Beta',
    status: 'Active',
    owner: 'Platform Team'
  },
  {
    id: 'PRD-002',
    name: 'Delivery Insights',
    stage: 'Pilot',
    status: 'Active',
    owner: 'Analytics Team'
  },
  {
    id: 'PRD-003',
    name: 'Client Success Hub',
    stage: 'Roadmap',
    status: 'Planned',
    owner: 'Customer Ops'
  }
];