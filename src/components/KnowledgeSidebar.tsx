import React from 'react';
import { BookOpen } from 'lucide-react';

interface Fragment {
  id: string;
  content: string;
  confidence: number;
  source: string;
}

interface KnowledgeSidebarProps {
  fragments: Fragment[];
}

function KnowledgeSidebar({ fragments }: KnowledgeSidebarProps) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">相关知识</h3>
      </div>
      
      {fragments.length > 0 ? (
        <div className="space-y-4">
          {fragments.map((fragment) => (
            <div
              key={fragment.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="text-sm text-gray-700 mb-2">{fragment.content}</div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>来源: {fragment.source}</span>
                <span>置信度: {(fragment.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          暂无相关知识片段
        </div>
      )}
    </div>
  );
}

export default KnowledgeSidebar;