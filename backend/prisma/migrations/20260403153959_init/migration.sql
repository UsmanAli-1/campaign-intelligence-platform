-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'paused', 'completed', 'draft');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "website" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "objective" TEXT,
    "budget" DOUBLE PRECISION NOT NULL,
    "spend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_metrics" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "spend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaign_id" TEXT NOT NULL,

    CONSTRAINT "campaign_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creative_briefs" (
    "id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "website" TEXT,
    "competitors" TEXT,
    "objective" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "tone" TEXT,
    "imagery_style" TEXT,
    "color_direction" TEXT,
    "dos" TEXT,
    "donts" TEXT,
    "ai_output" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaign_id" TEXT,

    CONSTRAINT "creative_briefs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert_rules" (
    "id" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "threshold" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaign_id" TEXT NOT NULL,

    CONSTRAINT "alert_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alert_history" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "triggered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaign_id" TEXT NOT NULL,
    "rule_id" TEXT NOT NULL,

    CONSTRAINT "alert_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "campaigns_client_id_idx" ON "campaigns"("client_id");

-- CreateIndex
CREATE INDEX "campaigns_status_idx" ON "campaigns"("status");

-- CreateIndex
CREATE INDEX "campaigns_deleted_at_idx" ON "campaigns"("deleted_at");

-- CreateIndex
CREATE INDEX "campaign_metrics_campaign_id_idx" ON "campaign_metrics"("campaign_id");

-- CreateIndex
CREATE INDEX "campaign_metrics_date_idx" ON "campaign_metrics"("date");

-- CreateIndex
CREATE INDEX "creative_briefs_campaign_id_idx" ON "creative_briefs"("campaign_id");

-- CreateIndex
CREATE INDEX "alert_rules_campaign_id_idx" ON "alert_rules"("campaign_id");

-- CreateIndex
CREATE INDEX "alert_history_campaign_id_idx" ON "alert_history"("campaign_id");

-- CreateIndex
CREATE INDEX "alert_history_is_read_idx" ON "alert_history"("is_read");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_metrics" ADD CONSTRAINT "campaign_metrics_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creative_briefs" ADD CONSTRAINT "creative_briefs_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_rules" ADD CONSTRAINT "alert_rules_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alert_history" ADD CONSTRAINT "alert_history_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "alert_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
