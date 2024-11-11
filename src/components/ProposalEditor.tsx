import React, { useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';

interface ProposalEditorProps {
  section: string;
  onSectionChange: (section: string) => void;
  modelSettings: {
    temperature: number;
    maxTokens: number;
    topP: number;
    prompt: string;
  };
}

function ProposalEditor({ section, onSectionChange, modelSettings }: ProposalEditorProps) {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement AI API call here
    setTimeout(() => {
      setIsGenerating(false);
      setContent('Generated content will appear here...');
    }, 2000);
  };

  const sections = [
    { id: 'overview', label: '项目概况' },
    { id: 'basis', label: '编制依据' },
    { id: 'plan', label: '施工计划' },
    { id: 'technology', label: '施工工艺技术' },
    { id: 'safety', label: '施工安全保护措施' },
    { id: 'staffing', label: '施工管理及人员配备' },
    { id: 'acceptance', label: '验收要求' },
    { id: 'emergency', label: '应急处置措施' }
  ];

  const currentSection = sections.find(s => s.id === section)?.label || '选择章节';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">方案编辑</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span>{currentSection}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  {sections.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        item.id === section ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            当前编辑: <span className="font-medium text-gray-900">{currentSection}</span>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="在此编辑内容或点击生成按钮使用AI生成..."
        />
        
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isGenerating ? '生成中...' : 'AI生成'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProposalEditor;