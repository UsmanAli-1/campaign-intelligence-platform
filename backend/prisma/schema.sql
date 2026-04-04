-- ================================================
-- CAMPAIGN INTELLIGENCE PLATFORM
-- PostgreSQL Schema
-- ================================================

-- USERS
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  name        VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- CLIENTS
CREATE TABLE clients (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  industry    VARCHAR(255) NOT NULL,
  website     VARCHAR(255),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- CAMPAIGNS
CREATE TYPE campaign_status AS ENUM ('active', 'paused', 'completed', 'draft');

CREATE TABLE campaigns (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  client_id   UUID NOT NULL REFERENCES clients(id),
  status      campaign_status DEFAULT 'draft',
  objective   VARCHAR(100),
  budget      DECIMAL(12,2) NOT NULL DEFAULT 0,
  spend       DECIMAL(12,2) NOT NULL DEFAULT 0,
  deleted_at  TIMESTAMP,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_campaigns_client_id  ON campaigns(client_id);
CREATE INDEX idx_campaigns_status     ON campaigns(status);
CREATE INDEX idx_campaigns_deleted_at ON campaigns(deleted_at);

-- CAMPAIGN METRICS (daily snapshots)
CREATE TABLE campaign_metrics (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  date        DATE NOT NULL,
  impressions INT DEFAULT 0,
  clicks      INT DEFAULT 0,
  conversions INT DEFAULT 0,
  spend       DECIMAL(12,2) DEFAULT 0,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_metrics_campaign_id ON campaign_metrics(campaign_id);
CREATE INDEX idx_metrics_date        ON campaign_metrics(date);

-- CREATIVE BRIEFS
CREATE TABLE creative_briefs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id      UUID REFERENCES campaigns(id),
  client_name      VARCHAR(255) NOT NULL,
  industry         VARCHAR(255) NOT NULL,
  website          VARCHAR(255),
  competitors      TEXT,
  objective        VARCHAR(100) NOT NULL,
  audience         TEXT NOT NULL,
  budget           DECIMAL(12,2) NOT NULL,
  tone             VARCHAR(100),
  imagery_style    VARCHAR(100),
  color_direction  TEXT,
  dos              TEXT,
  donts            TEXT,
  ai_output        JSONB,
  created_at       TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_briefs_campaign_id ON creative_briefs(campaign_id);

-- ALERT RULES
CREATE TABLE alert_rules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  metric      VARCHAR(50) NOT NULL,
  operator    VARCHAR(20) NOT NULL,
  threshold   DECIMAL(12,2) NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rules_campaign_id ON alert_rules(campaign_id);

-- ALERT HISTORY
CREATE TABLE alert_history (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id  UUID NOT NULL,
  rule_id      UUID NOT NULL REFERENCES alert_rules(id),
  message      TEXT NOT NULL,
  is_read      BOOLEAN DEFAULT FALSE,
  triggered_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_alerts_campaign_id ON alert_history(campaign_id);
CREATE INDEX idx_alerts_is_read     ON alert_history(is_read);