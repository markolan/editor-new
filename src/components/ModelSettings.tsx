import React from 'react';
import { Settings, Key } from 'lucide-react';

interface ModelSettingsProps {
  settings: {
    temperature: number;
    maxTokens: number;
    topP: number;
    prompt: string;
    apiEndpoint: string;
    apiKey: string;
    modelVersion: string;
  };
  onSettingsChange: (settings: any) => void;
}

function ModelSettings({ settings, onSettingsChange }: ModelSettingsProps) {
  const handleChange = (field: string, value: string | number) => {
    onSettingsChange({
      ...settings,
      [field]: value
    });
  };

  const modelVersions = [
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'claude-2', label: 'Claude 2' },
    { value: 'llama-2', label: 'LLaMA 2' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">模型参数设置</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Key className="w-4 h-4 text-blue-600" />
            <h4 className="font-medium text-blue-900">API 配置</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API 接口地址
              </label>
              <input
                type="text"
                value={settings.apiEndpoint}
                onChange={(e) => handleChange('apiEndpoint', e.target.value)}
                placeholder="https://api.example.com/v1/chat/completions"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API 密钥
              </label>
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => handleChange('apiKey', e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                模型版本
              </label>
              <select
                value={settings.modelVersion}
                onChange={(e) => handleChange('modelVersion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {modelVersions.map((version) => (
                  <option key={version.value} value={version.value}>
                    {version.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 mt-1">
            值: {settings.temperature} (越高创造性越强)
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Tokens
          </label>
          <input
            type="number"
            value={settings.maxTokens}
            onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Top P
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.topP}
            onChange={(e) => handleChange('topP', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 mt-1">
            值: {settings.topP}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            预设 Prompt
          </label>
          <textarea
            value={settings.prompt}
            onChange={(e) => handleChange('prompt', e.target.value)}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="输入预设提示词..."
          />
        </div>
      </div>
    </div>
  );
}

export default ModelSettings;