import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website'
}) => {
  const { siteSettings } = useData();
  const { language } = useTheme();

  const defaultTitle = siteSettings.title || 'KYCtrust - خدمات مالية رقمية موثوقة';
  const defaultDescription = siteSettings.description || 'نقدم خدمات مالية رقمية احترافية وآمنة لجميع المنصات العالمية مع ضمان الجودة والموثوقية';
  const defaultKeywords = [
    'خدمات مالية',
    'محافظ رقمية', 
    'تحويلات دولية',
    'KYC Trust',
    'PayPal',
    'Payoneer',
    'Wise',
    'فودافون كاش',
    'USDT',
    'العملات الرقمية',
    'التداول',
    'الخدمات المصرفية'
  ];

  const siteTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteKeywords = [...defaultKeywords, ...keywords].join(', ');
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const siteImage = image || '/og-image.png';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KYCtrust",
    "description": siteDescription,
    "url": "https://kyctrust.com",
    "logo": "https://kyctrust.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteSettings.whatsappNumber || "+201062453344",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    },
    "sameAs": [
      "https://wa.me/201062453344"
    ],
    "serviceType": "Digital Financial Services",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Financial Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "PayPal Account Creation",
            "description": "Professional PayPal account setup and verification"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Payoneer Account Creation",
            "description": "International money transfer account setup"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Wise Account Creation",
            "description": "Multi-currency account for international transfers"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content="KYCtrust Team" />
      <meta name="language" content={language} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="KYCtrust" />
      <meta property="og:locale" content={language === 'ar' ? 'ar_EG' : 'en_US'} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:site" content="@KYCtrust" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hreflang="ar" href={siteUrl} />
      <link rel="alternate" hreflang="en" href={siteUrl.replace('/ar/', '/en/')} />
      <link rel="alternate" hreflang="x-default" href={siteUrl} />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//wa.me" />
      <link rel="dns-prefetch" href="//api.whatsapp.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional Meta for Arabic Content */}
      {language === 'ar' && (
        <meta httpEquiv="Content-Language" content="ar" />
      )}
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Performance Hints */}
      <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
    </Helmet>
  );
};

export default SEOOptimizer;
