import React from 'react';
import { Clock, Download, Eye } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  section: string;
  timestamp: string;
  content: string;
}

function ProposalHistory() {
  // Mock data - in a real app, this would come from your backend
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      title: '高层建筑施工方案',
      section: '项目概况',
      timestamp: '2024-03-15 14:30',
      content: '项目概况内容...'
    },
    {
      id: '2',
      title: '地铁站施工方案',
      section: '施工工艺技术',
      timestamp: '2024-03-14 16:45',
      content: '施工工艺技术内容...'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">历史记录</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <span>{item.section}</span>
                  <span>•</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="查看"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="下载"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProposalHistory;