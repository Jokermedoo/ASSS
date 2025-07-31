-- KYCtrust Database Seed Data
-- Insert default data for the application

-- Insert default site settings
INSERT INTO site_settings (
    title, 
    description, 
    order_notice, 
    whatsapp_number,
    primary_color,
    secondary_color,
    accent_color,
    language,
    meta_keywords,
    meta_description
) VALUES (
    'KYCtrust - خدمات مالية رقمية موثوقة',
    'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية',
    'سيتم التواصل معك يدوياً عبر واتساب بعد إرسال الطلب.',
    '+966501234567',
    '#3B82F6',
    '#1E40AF', 
    '#F59E0B',
    'ar',
    'خدمات مالية, محافظ رقمية, تحويلات دولية, KYC Trust, PayPal, Payoneer, Wise',
    'منصة KYCtrust الرائدة في تقديم الخدمات المالية الرقمية الآمنة والموثوقة'
);

-- Insert default services
INSERT INTO services (name, description, price, category, features, order_index, active, popular, processing_time) VALUES
('Payoneer', 'إنشاء وتفعيل حساب Payoneer للتحويلات الدولية', '30$', 'wallets', '["تفعيل فوري", "دعم 24/7", "ضمان الجودة"]', 1, true, true, '5 دقائق'),
('Wise (TransferWise)', 'فتح حساب Wise للتحويلات المالية الدولية', '30$', 'wallets', '["تحويلات سريعة", "أسعار تنافسية", "دعم متعدد العملات"]', 2, true, true, '5 دقائق'),
('Skrill', 'إ��شاء وتفعيل محفظة Skrill الرقمية', '20$', 'wallets', '["محفظة آمنة", "تحويلات سريعة", "رسوم منخفضة"]', 3, true, false, '3 دقائق'),
('Neteller', 'فتح حساب Neteller للمدفوعات الإلكترونية', '20$', 'wallets', '["أمان عالي", "سهولة الاستخدام", "قبول عالمي"]', 4, true, false, '3 دقائق'),
('Kast', 'إنشاء حساب Kast للخدمات المالية', '20$', 'banking', '["خدمات متطورة", "واجهة سهلة", "دعم فني"]', 5, true, false, '5 دقائق'),
('Redotpay', 'فتح حساب Redotpay للمدفوعات', '20$', 'wallets', '["مدفوعات آمنة", "تكامل سهل", "دعم متعدد"]', 6, true, false, '3 دقائق'),
('OKX', 'إنشاء حساب OKX لتداول العملات الرقمية', '20$', 'crypto', '["تداول آمن", "عملات متنوعة", "رسوم منخفضة"]', 7, true, false, '5 دقائق'),
('World First', 'فتح حساب World First للخدمات المصرفية', '20$', 'banking', '["خدمات مصرفية", "تحويلات دولية", "أمان عالي"]', 8, true, false, '10 دقائق'),
('Bybit', 'إنشاء حساب Bybit للتداول', '20$', 'crypto', '["منصة تداول", "أدوات متقدمة", "دعم فني"]', 9, true, false, '5 دقائق'),
('Bitget', 'فتح حساب Bitget للعملات الرقمية', '20$', 'crypto', '["تداول عملات", "أمان متقدم", "واجهة سهلة"]', 10, true, false, '5 دقائق'),
('KuCoin', 'إنشاء حساب KuCoin للتداول', '20$', 'crypto', '["منصة شاملة", "عملات متنوعة", "تداول آمن"]', 11, true, false, '5 دقائق'),
('PayPal', 'إنشاء وتفعيل حساب PayPal', '15$', 'wallets', '["دفع آمن", "قبول عالمي", "حماية المشتري"]', 12, true, true, '3 دقائق'),
('Mexc', 'فتح حساب Mexc للتداول', '20$', 'crypto', '["تداول عملات", "سيولة عالية", "أمان متقدم"]', 13, true, false, '5 دقائق'),
('Exness', 'إنشاء حساب Exness للتداول', '20$', 'trading', '["تداول فوركس", "رافعة مالية", "منصة متقدمة"]', 14, true, false, '10 دقائق'),
('شحن رصيد فودافون', 'خدمة شحن رصيد فودافون كاش', '100 جنيه = 120 جنيه (متاح أي مبلغ)', 'local', '["شحن فوري", "خصم إضافي", "خدمة محلية"]', 15, true, false, '1 دقيقة'),
('سحب من TikTok', 'خدمة سحب الأرباح من TikTok', 'حسب الاتفاق', 'social', '["سحب آمن", "معدلات جيدة", "دعم فني"]', 16, true, false, '24 ساعة'),
('سحب من PayPal', 'خدمة سحب الأموال من PayPal', 'حسب الاتفاق', 'wallets', '["سحب سريع", "أسعار تنافسية", "أمان عالي"]', 17, true, false, '2-6 ساعات');

-- Insert default payment methods
INSERT INTO payment_methods (name, details, type, active, order_index, processing_time) VALUES
('Vodafone Cash', '+201062453344', 'manual', true, 1, 'فوري'),
('USDT (TRC20)', 'TFUt8GRpk2R8Wv3FvoCiSUghRBQo4HrmQK', 'crypto', true, 2, '10-30 دقيقة'),
('USDT (ERC20)', 'سيتم توفير العنوان عند الطلب', 'crypto', true, 3, '30-60 دقيقة'),
('Bitcoin (BTC)', 'سيتم توفير العنوان عند الطلب', 'crypto', true, 4, '1-6 ساعات'),
('Ethereum (ETH)', 'سيتم توفير العنوان عند الطلب', 'crypto', true, 5, '30-60 دقيقة'),
('Orange Cash', 'متاح عند الطلب', 'manual', true, 6, 'فوري'),
('Etisalat Cash', 'متاح عند الطلب', 'manual', true, 7, 'فوري'),
('WE Cash', 'متاح عند الطلب', 'manual', true, 8, 'فوري');

-- Insert default testimonials
INSERT INTO testimonials (customer_name, customer_role, customer_company, rating, comment, is_featured, is_verified, display_order, active) VALUES
('أحمد محمد علي', 'مدير أعمال', 'شركة التقنية المتقدمة', 5, 'خدمة ممتازة وسريعة، تم إنجاز طلبي في أقل من 5 دقائق. أنصح بشدة بالتعامل مع KYCtrust للحصول على أفضل الخدمات المالية الرقمية.', true, true, 1, true),
('فاطمة أحمد السالم', 'مؤسسة شركة', 'مؤسسة النجاح للتجارة', 5, 'أفضل منصة للخدمات المالية واجهتها على الإطلاق. الدعم الفني ممتاز والأسعار مناسبة جداً مقارنة بالجودة المقدمة.', true, true, 2, true),
('خالد عبدالرحمن العلي', 'طالب جامعي', 'جامعة الملك سعود', 5, 'سهولة في الاستخدام وأمان عالي، تعاملت معهم عدة مرات ولم أواجه أي مشكلة. الخدمة سريعة والفريق محترف جداً.', true, true, 3, true),
('مريم عبدالله أحمد', 'ربة منزل', '', 4, 'خدمة موثوقة وأسعار معقولة. الدعم الفني يرد بسرعة ويحل المشاكل فوراً. أنصح بالتعامل معهم.', false, true, 4, true),
('محمد سعد الغا��دي', 'صاحب متجر إلكتروني', 'متجر التقنية', 5, 'ساعدوني في فتح حساب Payoneer وكانت العملية سلسة جداً. الآن أستطيع استقبال المدفوعات من العملاء الأجانب بسهولة.', false, true, 5, true),
('نورا خالد المطيري', 'مصممة جرافيك', 'استوديو الإبداع', 5, 'خدمة PayPal التي حصلت عليها تعمل بشكل مثالي. شكراً لفريق KYCtrust على الخدمة الرائعة والدعم المتميز.', false, true, 6, true);

-- Insert default FAQs
INSERT INTO faqs (question, answer, category, display_order, active, language) VALUES
('كم يستغرق تنفيذ الطلب؟', 'معظم طلباتنا يتم تنفيذها خلال 5 دقائق أو أقل. بعض الخدمات المعقدة قد تحتاج إلى وقت أطول قليلاً حسب نوع الخدمة المطلوبة.', 'general', 1, true, 'ar'),
('هل خدماتكم آمنة ومضمونة؟', 'نعم، نحن نستخدم أعلى معايير الأمان والتشفير. جميع البيانات محمية ولا نحتفظ بأي معلومات حساسة. كما نقدم ضمان استرداد الأموال في حالة عدم تنفيذ الخدمة.', 'security', 2, true, 'ar'),
('ما هي طرق الدفع المتاحة؟', 'نقبل الدفع عبر فودافون كاش، العملات الرقمية (USDT, Bitcoin, Ethereum)، وطرق دفع أخرى. يمكنك مراجعة جميع الطرق المتاحة في قسم طرق الدفع.', 'payment', 3, true, 'ar'),
('هل تقدمون ضمان على الخدمات؟', 'نعم، نحن نقدم ضمان كامل على جميع خدماتنا. في حالة عدم تنفيذ الخدمة كما هو متفق عليه، نقوم بإعادة كامل المبلغ المدفوع.', 'guarantee', 4, true, 'ar'),
('كيف يمكنني التواصل مع الدعم الفني؟', 'يمكنك التواصل معنا عبر واتساب على مدار 24/7 على الرقم +966501234567، أو من خلال نموذج التواصل في الموقع. فريق الدعم متاح دائماً لمساعدتك.', 'support', 5, true, 'ar'),
('هل تدعمون العملاء خارج السعودية؟', 'نعم، خدماتنا متاحة للعملاء في جميع أنحاء العالم. نقدم الدعم بعدة لغات ونتعامل مع العملات المختلفة.', 'international', 6, true, 'ar'),
('ما هي أوقات العمل؟', 'نحن نعمل على مدار 24 ساعة طوال أيام الأسبوع. ��ريق الدعم الفني متاح دائماً للرد على استفساراتكم ومساعدتكم في أي وقت.', 'general', 7, true, 'ar'),
('هل يمكنني تتبع حالة طلبي؟', 'نعم، سيتم إرسال رسائل تحديث عبر واتساب لإعلامك بحالة طلبك. كما يمكنك التواصل معنا في أي وقت للاستفسار عن حالة الطلب.', 'orders', 8, true, 'ar');

-- Insert English FAQs
INSERT INTO faqs (question, answer, category, display_order, active, language) VALUES
('How long does it take to complete an order?', 'Most of our orders are completed within 5 minutes or less. Some complex services may take a little longer depending on the type of service requested.', 'general', 1, true, 'en'),
('Are your services secure and guaranteed?', 'Yes, we use the highest security and encryption standards. All data is protected and we do not store any sensitive information. We also provide a money-back guarantee if the service is not executed properly.', 'security', 2, true, 'en'),
('What payment methods are available?', 'We accept payment via Vodafone Cash, cryptocurrencies (USDT, Bitcoin, Ethereum), and other payment methods. You can review all available methods in the payment methods section.', 'payment', 3, true, 'en'),
('Do you provide a guarantee on services?', 'Yes, we provide a full guarantee on all our services. If the service is not executed as agreed, we will refund the full amount paid.', 'guarantee', 4, true, 'en'),
('How can I contact technical support?', 'You can contact us via WhatsApp 24/7 at +966501234567, or through the contact form on the website. Support team is always available to help you.', 'support', 5, true, 'en'),
('Do you support customers outside Saudi Arabia?', 'Yes, our services are available to customers worldwide. We provide support in multiple languages and deal with different currencies.', 'international', 6, true, 'en'),
('What are your working hours?', 'We work 24 hours a day, 7 days a week. Technical support team is always available to answer your inquiries and help you at any time.', 'general', 7, true, 'en'),
('Can I track my order status?', 'Yes, update messages will be sent via WhatsApp to inform you of your order status. You can also contact us at any time to inquire about the order status.', 'orders', 8, true, 'en');

-- Insert default page themes
INSERT INTO page_themes (name, description, colors, fonts, spacing, is_default, is_public) VALUES
('Modern Blue', 'A clean and modern theme with blue accents', 
 '{"primary": "#3B82F6", "secondary": "#1E40AF", "accent": "#F59E0B", "background": "#F8FAFC", "text": "#1F2937"}',
 '{"heading": "Inter", "body": "Inter"}',
 '{"small": 8, "medium": 16, "large": 32}',
 true, true),
('Elegant Purple', 'An elegant theme with purple and pink accents',
 '{"primary": "#8B5CF6", "secondary": "#7C3AED", "accent": "#EC4899", "background": "#FEFBFF", "text": "#374151"}',
 '{"heading": "Playfair Display", "body": "Inter"}',
 '{"small": 12, "medium": 24, "large": 48}',
 false, true),
('Corporate Gray', 'A professional corporate theme',
 '{"primary": "#374151", "secondary": "#111827", "accent": "#059669", "background": "#F9FAFB", "text": "#1F2937"}',
 '{"heading": "Roboto", "body": "Roboto"}',
 '{"small": 6, "medium": 12, "large": 24}',
 false, true),
('Green Finance', 'A finance-focused green theme',
 '{"primary": "#059669", "secondary": "#047857", "accent": "#F59E0B", "background": "#F0FDF4", "text": "#1F2937"}',
 '{"heading": "Montserrat", "body": "Open Sans"}',
 '{"small": 10, "medium": 20, "large": 40}',
 false, true);

-- Insert default admin user (password: admin123123)
INSERT INTO admin_users (username, email, password_hash, full_name, role, active) VALUES
('admin', 'admin@kyctrust.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewE6DK4/QK6k6zFu', 'System Administrator', 'admin', true);

-- Insert default email templates
INSERT INTO email_templates (name, subject, body_html, body_text, category, active) VALUES
('order_confirmation', 'تأكيد الطلب - KYCtrust', 
 '<h2>شكراً لك على طلبك</h2><p>مرحباً {{customer_name}},</p><p>تم استلام طلبك بنجاح وسيتم التواصل معك قريباً.</p><p><strong>تفاصيل الطلب:</strong></p><ul><li>رقم الطلب: {{order_number}}</li><li>الخدمة: {{service_name}}</li><li>السعر: {{service_price}}</li></ul><p>شكراً لثقتك في KYCtrust</p>',
 'مرحباً {{customer_name}}, تم استلام طلبك بنجاح وسيتم التواصل معك قريباً. رقم الطلب: {{order_number}}, الخدمة: {{service_name}}, السعر: {{service_price}}. شكراً لثقتك في KYCtrust',
 'orders', true),
('order_completed', 'تم إنجاز طلبك - KYCtrust',
 '<h2>تم إنجاز طلبك بنجاح</h2><p>مرحباً {{customer_name}},</p><p>نحن سعداء لإعلامك أن طلبك قد تم إنجازه بنجاح.</p><p><strong>تفاصيل الطلب:</strong></p><ul><li>رقم الطلب: {{order_number}}</li><li>الخدمة: {{service_name}}</li></ul><p>شكراً لاختيارك KYCtrust</p>',
 'مرحباً {{customer_name}}, تم إنجاز طلبك بنجاح. رقم الطلب: {{order_number}}, الخدمة: {{service_name}}. شكراً لاختيارك KYCtrust',
 'orders', true);

-- Insert analytics events for demo
INSERT INTO analytics_events (event_type, page_url, user_agent, device_type, browser, country) VALUES
('page_view', '/', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'desktop', 'Chrome', 'SA'),
('page_view', '/services', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)', 'mobile', 'Safari', 'AE'),
('order_created', '/order', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'desktop', 'Chrome', 'SA'),
('contact_form', '/contact', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'desktop', 'Safari', 'EG');

-- Update sequences to avoid conflicts
SELECT setval('site_settings_id_seq', (SELECT MAX(id) FROM site_settings));
