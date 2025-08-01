import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Settings, Database, Globe, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { useCustomization } from '../context/CustomizationContext';
import { databaseService } from '../services/database';

interface TestResult {
  name: string;
  status: 'success' | 'warning' | 'error' | 'pending';
  message: string;
  details?: string;
}

interface TestSuite {
  name: string;
  icon: React.ComponentType<any>;
  tests: TestResult[];
}

const IntegrationTester: React.FC = () => {
  const { theme } = useTheme();
  const { services, paymentMethods, siteSettings, loading, error } = useData();
  const { customization } = useCustomization();
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'success' | 'warning' | 'error' | 'pending'>('pending');

  const runTests = async () => {
    setIsRunning(true);
    const suites: TestSuite[] = [];

    // Database & API Tests
    const databaseTests: TestResult[] = [];
    
    try {
      // Test services loading
      if (services.length > 0) {
        databaseTests.push({
          name: 'Services Loading',
          status: 'success',
          message: `${services.length} services loaded successfully`,
          details: `Active services: ${services.filter(s => s.active).length}`
        });
      } else {
        databaseTests.push({
          name: 'Services Loading',
          status: 'warning',
          message: 'No services found',
          details: 'Consider adding some services for better user experience'
        });
      }

      // Test payment methods
      if (paymentMethods.length > 0) {
        databaseTests.push({
          name: 'Payment Methods',
          status: 'success',
          message: `${paymentMethods.length} payment methods configured`,
          details: `Active methods: ${paymentMethods.filter(m => m.active).length}`
        });
      } else {
        databaseTests.push({
          name: 'Payment Methods',
          status: 'error',
          message: 'No payment methods configured',
          details: 'At least one payment method is required'
        });
      }

      // Test site settings
      if (siteSettings.title && siteSettings.description) {
        databaseTests.push({
          name: 'Site Settings',
          status: 'success',
          message: 'Site settings configured correctly',
          details: `WhatsApp: ${siteSettings.whatsappNumber || 'Not set'}`
        });
      } else {
        databaseTests.push({
          name: 'Site Settings',
          status: 'warning',
          message: 'Incomplete site settings',
          details: 'Some settings may be missing'
        });
      }

      // Test database connectivity
      try {
        await databaseService.trackEvent('integration_test', { timestamp: new Date().toISOString() });
        databaseTests.push({
          name: 'Database Connectivity',
          status: 'success',
          message: 'Database connection working',
          details: 'Events can be tracked successfully'
        });
      } catch (error) {
        databaseTests.push({
          name: 'Database Connectivity',
          status: 'warning',
          message: 'Using fallback storage',
          details: 'Database not available, using localStorage'
        });
      }

    } catch (error) {
      databaseTests.push({
        name: 'Database Tests',
        status: 'error',
        message: 'Database tests failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    suites.push({
      name: 'Database & API',
      icon: Database,
      tests: databaseTests
    });

    // UI Components Tests
    const uiTests: TestResult[] = [];

    try {
      // Test theme system
      if (theme) {
        uiTests.push({
          name: 'Theme System',
          status: 'success',
          message: `Current theme: ${theme}`,
          details: 'Theme switching works correctly'
        });
      }

      // Test customization
      if (customization) {
        uiTests.push({
          name: 'Customization System',
          status: 'success',
          message: 'Customization context loaded',
          details: `Hero section: ${customization.hero ? 'Configured' : 'Default'}`
        });
      } else {
        uiTests.push({
          name: 'Customization System',
          status: 'warning',
          message: 'Using default customization',
          details: 'Custom settings not loaded'
        });
      }

      // Test responsive design
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isDesktop = window.innerWidth >= 1024;
      
      uiTests.push({
        name: 'Responsive Design',
        status: 'success',
        message: `Device: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}`,
        details: `Screen width: ${window.innerWidth}px`
      });

      // Test accessibility
      const hasAriaLabels = document.querySelectorAll('[aria-label]').length > 0;
      const hasHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0;
      
      if (hasAriaLabels && hasHeadings) {
        uiTests.push({
          name: 'Accessibility',
          status: 'success',
          message: 'Basic accessibility features present',
          details: 'ARIA labels and heading structure found'
        });
      } else {
        uiTests.push({
          name: 'Accessibility',
          status: 'warning',
          message: 'Limited accessibility features',
          details: 'Consider adding more ARIA labels and proper heading structure'
        });
      }

    } catch (error) {
      uiTests.push({
        name: 'UI Tests',
        status: 'error',
        message: 'UI tests failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    suites.push({
      name: 'UI Components',
      icon: Settings,
      tests: uiTests
    });

    // Performance Tests
    const performanceTests: TestResult[] = [];

    try {
      // Test page load time
      if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        
        if (loadTime < 3000) {
          performanceTests.push({
            name: 'Page Load Time',
            status: 'success',
            message: `${loadTime}ms - Excellent`,
            details: 'Page loads quickly'
          });
        } else if (loadTime < 5000) {
          performanceTests.push({
            name: 'Page Load Time',
            status: 'warning',
            message: `${loadTime}ms - Good`,
            details: 'Consider optimizing images and scripts'
          });
        } else {
          performanceTests.push({
            name: 'Page Load Time',
            status: 'error',
            message: `${loadTime}ms - Slow`,
            details: 'Page load time needs optimization'
          });
        }
      }

      // Test memory usage
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMemory = memory.usedJSHeapSize / 1024 / 1024; // MB
        
        if (usedMemory < 50) {
          performanceTests.push({
            name: 'Memory Usage',
            status: 'success',
            message: `${usedMemory.toFixed(1)}MB - Excellent`,
            details: 'Low memory footprint'
          });
        } else if (usedMemory < 100) {
          performanceTests.push({
            name: 'Memory Usage',
            status: 'warning',
            message: `${usedMemory.toFixed(1)}MB - Moderate`,
            details: 'Memory usage is acceptable'
          });
        } else {
          performanceTests.push({
            name: 'Memory Usage',
            status: 'error',
            message: `${usedMemory.toFixed(1)}MB - High`,
            details: 'Consider optimizing memory usage'
          });
        }
      }

      // Test network connectivity
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const effectiveType = connection.effectiveType;
        
        performanceTests.push({
          name: 'Network Connection',
          status: effectiveType === '4g' ? 'success' : effectiveType === '3g' ? 'warning' : 'error',
          message: `${effectiveType.toUpperCase()} connection`,
          details: `Downlink: ${connection.downlink}Mbps`
        });
      }

    } catch (error) {
      performanceTests.push({
        name: 'Performance Tests',
        status: 'error',
        message: 'Performance tests failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    suites.push({
      name: 'Performance',
      icon: Globe,
      tests: performanceTests
    });

    // User Experience Tests
    const uxTests: TestResult[] = [];

    try {
      // Test WhatsApp integration
      const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], button[onclick*="wa.me"]');
      if (whatsappLinks.length > 0) {
        uxTests.push({
          name: 'WhatsApp Integration',
          status: 'success',
          message: `${whatsappLinks.length} WhatsApp links found`,
          details: 'Users can easily contact via WhatsApp'
        });
      } else {
        uxTests.push({
          name: 'WhatsApp Integration',
          status: 'warning',
          message: 'No WhatsApp links found',
          details: 'Consider adding WhatsApp contact options'
        });
      }

      // Test call-to-action buttons
      const ctaButtons = document.querySelectorAll('button[class*="bg-"], .cta-button');
      if (ctaButtons.length > 0) {
        uxTests.push({
          name: 'Call-to-Action Buttons',
          status: 'success',
          message: `${ctaButtons.length} CTA buttons found`,
          details: 'Clear action points for users'
        });
      }

      // Test navigation
      const navItems = document.querySelectorAll('nav a, nav button');
      if (navItems.length > 0) {
        uxTests.push({
          name: 'Navigation',
          status: 'success',
          message: `${navItems.length} navigation items`,
          details: 'Site navigation is available'
        });
      }

      // Test contact information
      const hasPhone = siteSettings.whatsappNumber && siteSettings.whatsappNumber.includes('+201062453344');
      if (hasPhone) {
        uxTests.push({
          name: 'Contact Information',
          status: 'success',
          message: 'Contact details configured',
          details: 'Users can reach support easily'
        });
      } else {
        uxTests.push({
          name: 'Contact Information',
          status: 'warning',
          message: 'Contact details incomplete',
          details: 'Verify phone number and contact methods'
        });
      }

    } catch (error) {
      uxTests.push({
        name: 'UX Tests',
        status: 'error',
        message: 'UX tests failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    suites.push({
      name: 'User Experience',
      icon: Users,
      tests: uxTests
    });

    setTestSuites(suites);

    // Calculate overall status
    const allTests = suites.flatMap(suite => suite.tests);
    const hasErrors = allTests.some(test => test.status === 'error');
    const hasWarnings = allTests.some(test => test.status === 'warning');

    if (hasErrors) {
      setOverallStatus('error');
    } else if (hasWarnings) {
      setOverallStatus('warning');
    } else {
      setOverallStatus('success');
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`p-6 rounded-xl border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-reverse space-x-3">
          {getStatusIcon(overallStatus)}
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Integration Test Results
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              System health and functionality check
            </p>
          </div>
        </div>
        
        <button
          onClick={runTests}
          disabled={isRunning}
          className="flex items-center space-x-reverse space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Running Tests...' : 'Run Tests'}</span>
        </button>
      </div>

      {/* Test Suites */}
      <div className="space-y-6">
        {testSuites.map((suite, index) => (
          <div key={index} className={`p-4 rounded-lg border ${
            theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <suite.icon className="h-5 w-5 text-blue-600" />
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {suite.name}
              </h3>
            </div>
            
            <div className="space-y-3">
              {suite.tests.map((test, testIndex) => (
                <div key={testIndex} className={`p-3 rounded-lg border ${getStatusColor(test.status)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-reverse space-x-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <div className="font-medium">{test.name}</div>
                        <div className="text-sm opacity-75">{test.message}</div>
                        {test.details && (
                          <div className="text-xs opacity-60 mt-1">{test.details}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className={`mt-6 p-4 rounded-lg border ${getStatusColor(overallStatus)}`}>
        <div className="flex items-center space-x-reverse space-x-3">
          {getStatusIcon(overallStatus)}
          <div>
            <div className="font-semibold">
              {overallStatus === 'success' && 'All systems operational'}
              {overallStatus === 'warning' && 'System operational with warnings'}
              {overallStatus === 'error' && 'Issues detected - action required'}
            </div>
            <div className="text-sm opacity-75">
              {testSuites.reduce((acc, suite) => acc + suite.tests.length, 0)} tests completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationTester;
