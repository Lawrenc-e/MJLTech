INSERT INTO projects (id, name, summary, client, status, updated_at, budget, timeline) VALUES
  ('PRJ-104', 'Client Portal Revamp', 'Unified workspace for clients, support, and delivery.', 'Northwind Logistics', 'In Progress', '2026-01-22', '$48k', '8 weeks'),
  ('PRJ-108', 'Inventory Intelligence', 'Real-time forecasting and automated replenishment.', 'Apex Manufacturing', 'Submitted', '2026-02-04', '$32k', '6 weeks'),
  ('PRJ-097', 'Mobile Service Desk', 'Field-ready support app for on-site teams.', 'Helios Health', 'Completed', '2026-01-10', '$65k', '10 weeks');

INSERT INTO tasks (id, title, project, status, due_date, priority) VALUES
  ('TSK-077', 'Implement authentication flow', 'Client Portal Revamp', 'In Progress', '2026-02-14', 'High'),
  ('TSK-081', 'Design delivery status timeline', 'Client Portal Revamp', 'Review', '2026-02-12', 'Medium'),
  ('TSK-093', 'Build forecast API integration', 'Inventory Intelligence', 'Todo', '2026-02-18', 'High');
