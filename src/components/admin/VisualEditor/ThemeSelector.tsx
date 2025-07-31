import React, { useState } from 'react';
import { Palette, Check, Plus, Download, Upload } from 'lucide-react';
import { PageTheme } from './PageBuilder';

interface ThemeSelectorProps {
  themes: PageTheme[];
  currentTheme: PageTheme | null;
  onThemeChange: (theme: PageTheme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTheme, setNewTheme] = useState<Partial<PageTheme>>({
    name: '',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      small: 8,
      medium: 16,
      large: 32
    }
  });

  const handleCreateTheme = () => {
    if (newTheme.name && newTheme.colors) {
      const theme: PageTheme = {
        id: `custom-${Date.now()}`,
        name: newTheme.name,
        colors: newTheme.colors,
        fonts: newTheme.fonts || { heading: 'Inter', body: 'Inter' },
        spacing: newTheme.spacing || { small: 8, medium: 16, large: 32 }
      };
      
      onThemeChange(theme);
      setShowCreateForm(false);
      setIsOpen(false);
      
      // Reset form
      setNewTheme({
        name: '',
        colors: {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          accent: '#F59E0B',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        spacing: {
          small: 8,
          medium: 16,
          large: 32
        }
      });
    }
  };

  const exportTheme = (theme: PageTheme) => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const themeData = JSON.parse(e.target?.result as string);
          const importedTheme: PageTheme = {
            ...themeData,
            id: `imported-${Date.now()}`
          };
          onThemeChange(importedTheme);
        } catch (error) {
          console.error('Failed to import theme:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Palette className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentTheme ? currentTheme.name : 'Select Theme'}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Choose Theme</h3>
              <p className="text-sm text-gray-500 mt-1">Select or create a theme for your page</p>
            </div>

            <div className="p-4">
              {/* Built-in Themes */}
              <div className="space-y-3 mb-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      currentTheme?.id === theme.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      onThemeChange(theme);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{theme.name}</h4>
                        <div className="flex items-center space-x-2 mt-2">
                          {Object.values(theme.colors).slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {currentTheme?.id === theme.id && (
                          <Check className="h-5 w-5 text-blue-600" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportTheme(theme);
                          }}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Export Theme"
                        >
                          <Download className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Custom Theme</span>
                </button>

                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importTheme}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Import Theme</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create Theme Modal */}
      {showCreateForm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Create Custom Theme</h3>
                <p className="text-sm text-gray-500 mt-1">Design your own theme colors and typography</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Theme Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme Name
                  </label>
                  <input
                    type="text"
                    value={newTheme.name || ''}
                    onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                    placeholder="My Custom Theme"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Theme Colors
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(newTheme.colors || {}).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                          {key}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => setNewTheme({
                              ...newTheme,
                              colors: { ...newTheme.colors!, [key]: e.target.value }
                            })}
                            className="w-12 h-8 rounded border border-gray-300"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => setNewTheme({
                              ...newTheme,
                              colors: { ...newTheme.colors!, [key]: e.target.value }
                            })}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Typography
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Heading Font
                      </label>
                      <select
                        value={newTheme.fonts?.heading || 'Inter'}
                        onChange={(e) => setNewTheme({
                          ...newTheme,
                          fonts: { ...newTheme.fonts!, heading: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Poppins">Poppins</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Body Font
                      </label>
                      <select
                        value={newTheme.fonts?.body || 'Inter'}
                        onChange={(e) => setNewTheme({
                          ...newTheme,
                          fonts: { ...newTheme.fonts!, body: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Poppins">Poppins</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Spacing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Spacing Scale
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(newTheme.spacing || {}).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                          {key}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="4"
                            max="100"
                            value={value}
                            onChange={(e) => setNewTheme({
                              ...newTheme,
                              spacing: { ...newTheme.spacing!, [key]: parseInt(e.target.value) }
                            })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <span className="text-xs text-gray-500">px</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div 
                    className="p-6 border border-gray-300 rounded-lg"
                    style={{ 
                      backgroundColor: newTheme.colors?.background,
                      color: newTheme.colors?.text,
                      fontFamily: newTheme.fonts?.body
                    }}
                  >
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ 
                        color: newTheme.colors?.primary,
                        fontFamily: newTheme.fonts?.heading
                      }}
                    >
                      Sample Heading
                    </h3>
                    <p className="mb-4">This is how your theme will look in practice.</p>
                    <button 
                      className="px-4 py-2 rounded font-medium text-white"
                      style={{ backgroundColor: newTheme.colors?.primary }}
                    >
                      Sample Button
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTheme}
                  disabled={!newTheme.name}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Theme
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
