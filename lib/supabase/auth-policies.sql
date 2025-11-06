-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Active products are viewable by everyone"
  ON products FOR SELECT
  USING (status = 'active' OR seller_id = auth.uid());

CREATE POLICY "Sellers can insert own products"
  ON products FOR INSERT
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Sellers can update own products"
  ON products FOR UPDATE
  USING (seller_id = auth.uid());

CREATE POLICY "Sellers can delete own products"
  ON products FOR DELETE
  USING (seller_id = auth.uid());

-- Orders policies
CREATE POLICY "Users can view their orders (buyer or seller)"
  ON orders FOR SELECT
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Buyers can create orders"
  ON orders FOR INSERT
  WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Sellers can update order status"
  ON orders FOR UPDATE
  USING (seller_id = auth.uid());

-- AI interactions policies
CREATE POLICY "Users can view own AI interactions"
  ON ai_interactions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own AI interactions"
  ON ai_interactions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- WhatsApp messages policies
CREATE POLICY "Users can view own WhatsApp messages"
  ON whatsapp_messages FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "System can insert WhatsApp messages"
  ON whatsapp_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update WhatsApp messages"
  ON whatsapp_messages FOR UPDATE
  USING (true);
