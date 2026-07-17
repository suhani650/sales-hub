-- Run this AFTER `npx prisma migrate dev`, e.g.:
--   mysql -u nexora_user -p nexora_db < prisma/sql/extras.sql
-- Prisma's schema DSL can't express triggers/procedures directly, so these
-- live in raw SQL and are applied as a follow-up step.

-- 1) Decrement inventory automatically whenever an order_item is inserted.
DROP TRIGGER IF EXISTS trg_order_item_stock_decrement;
DELIMITER $$
CREATE TRIGGER trg_order_item_stock_decrement
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
  UPDATE inventory
  SET quantity = GREATEST(quantity - NEW.quantity, 0)
  WHERE product_id = NEW.product_id;
END$$
DELIMITER ;

-- 2) Restore inventory if an order is cancelled after items were placed.
DROP TRIGGER IF EXISTS trg_order_cancel_stock_restore;
DELIMITER $$
CREATE TRIGGER trg_order_cancel_stock_restore
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
  IF NEW.status = 'CANCELLED' AND OLD.status <> 'CANCELLED' THEN
    UPDATE inventory i
    JOIN order_items oi ON oi.product_id = i.product_id
    SET i.quantity = i.quantity + oi.quantity
    WHERE oi.order_id = NEW.id;
  END IF;
END$$
DELIMITER ;

-- 3) View: vendor revenue summary for the admin analytics screen.
CREATE OR REPLACE VIEW vw_vendor_revenue AS
SELECT
  v.id            AS vendor_id,
  v.storeName     AS store_name,
  COUNT(DISTINCT oi.order_id) AS order_count,
  SUM(oi.line_total)          AS gross_revenue,
  SUM(oi.commission_amount)   AS platform_commission
FROM vendors v
LEFT JOIN order_items oi ON oi.vendor_id = v.id
GROUP BY v.id, v.storeName;

-- 4) Stored procedure: recompute a product's average rating + count.
DROP PROCEDURE IF EXISTS sp_recalculate_product_rating;
DELIMITER $$
CREATE PROCEDURE sp_recalculate_product_rating(IN p_product_id INT)
BEGIN
  UPDATE products p
  SET
    p.rating_avg = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE product_id = p_product_id),
    p.rating_count = (SELECT COUNT(*) FROM reviews WHERE product_id = p_product_id)
  WHERE p.id = p_product_id;
END$$
DELIMITER ;
