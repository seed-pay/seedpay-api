CREATE TABLE "processed" (
	"chainId" integer,
	"address" text,
	"transactionHash" text,
	"logIndex" integer,
	"id" uuid NOT NULL,
	"token" text NOT NULL,
	"recipient" text NOT NULL,
	"affiliate" text NOT NULL,
	"intentAmount" bigint NOT NULL,
	"recipientAmount" bigint NOT NULL,
	"protocolAmount" bigint NOT NULL,
	"affiliateAmount" bigint NOT NULL,
	"srcChainId" integer,
	"srcAddress" text,
	"status" integer NOT NULL,
	"timestamp" bigint NOT NULL,
	"blockNumber" bigint NOT NULL,
	"blockHash" text NOT NULL,
	CONSTRAINT "processed_pkey" PRIMARY KEY("chainId","transactionHash","logIndex","address")
);
--> statement-breakpoint
CREATE INDEX "processed_events_id_idx" ON "processed" ("id");--> statement-breakpoint
CREATE INDEX "processed_events_recipient_idx" ON "processed" ("recipient");--> statement-breakpoint
CREATE INDEX "processed_events_affiliate_idx" ON "processed" ("affiliate");--> statement-breakpoint
CREATE INDEX "processed_events_status_idx" ON "processed" ("status");