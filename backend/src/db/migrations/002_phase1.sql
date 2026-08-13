-- Phase 1 additions: product variants, expanded custom-order lifecycle,
-- quotation pricing breakdown. Safe to run on an existing database —
-- everything uses IF NOT EXISTS / guards.

-- 1. Product variants (Blueprint Vol. IV, Section 8)
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size TEXT,
  colour TEXT,
  sku TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  price_override_kes NUMERIC(10, 2),
  low_stock_threshold INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);

-- 2. Expanded custom-order production lifecycle (Blueprint Vol. IV, Section 10)
-- Request -> Design -> Mockup -> Client Approval -> Production -> Quality Check -> Ready -> Delivery
ALTER TABLE custom_orders DROP CONSTRAINT IF EXISTS custom_orders_status_check;
ALTER TABLE custom_orders ADD CONSTRAINT custom_orders_status_check
  CHECK (status IN (
    'pending_review', 'in_design', 'mockup_sent', 'approved',
    'in_production', 'quality_check', 'ready', 'delivered', 'cancelled'
  ));

-- Existing rows using the old status set remain valid — all old values
-- ('pending_review','mockup_sent','approved','in_production','completed','cancelled')
-- still exist except 'completed', which maps to 'delivered' going forward.
UPDATE custom_orders SET status = 'delivered' WHERE status = 'completed';

-- 3. Quotation pricing breakdown (Blueprint Vol. IV, Section 12)
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS quantity INTEGER;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS unit_price_kes NUMERIC(10, 2);
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS production_cost_kes NUMERIC(10, 2) NOT NULL DEFAULT 0;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS delivery_cost_kes NUMERIC(10, 2) NOT NULL DEFAULT 0;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS discount_percent NUMERIC(5, 2) NOT NULL DEFAULT 0;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS total_kes NUMERIC(10, 2);
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS validity_days INTEGER NOT NULL DEFAULT 14;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS terms TEXT;
