# Database Design

## Collections

### tenants
Stores tenant/company information, system prompts, and media assets.

### sessions
Stores active customer conversations and their current status.

### messages
Stores inbound and outbound message audit logs.

### campaigns
Stores broadcast campaign templates.


Tenant
  │
  ├── Sessions
  │      │
  │      └── Messages
  │
  └── Campaigns