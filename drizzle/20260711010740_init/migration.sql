CREATE TABLE "processed" (
	"chainId" integer,
	"address" text,
	"transactionHash" text,
	"logIndex" integer,
	"id" uuid NOT NULL,
	"token" text NOT NULL,
	"recipient" text NOT NULL,
	"affiliate" text NOT NULL,
	"intentAmount" text NOT NULL,
	"recipientAmount" text NOT NULL,
	"protocolAmount" text NOT NULL,
	"affiliateAmount" text NOT NULL,
	"srcChainId" integer,
	"srcAddress" text,
	"status" integer NOT NULL,
	"timestamp" timestamp with time zone NOT NULL,
	"blockNumber" text NOT NULL,
	"blockHash" text NOT NULL,
	CONSTRAINT "processed_pkey" PRIMARY KEY("chainId","transactionHash","logIndex","address")
);
--> statement-breakpoint
CREATE INDEX "processed_events_id_idx" ON "processed" ("id");--> statement-breakpoint
CREATE INDEX "processed_events_recipient_idx" ON "processed" ("recipient");--> statement-breakpoint
CREATE INDEX "processed_events_affiliate_idx" ON "processed" ("affiliate");--> statement-breakpoint
CREATE INDEX "processed_events_status_idx" ON "processed" ("status");