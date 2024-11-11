import React from 'react';
import { Upload, X, FileText, Search, Download, ExternalLink } from 'lucide-react';

interface DocumentUploadProps {
  documents: File[];
  onDocumentsChange: (documents: File[]) => void;
}

// Mock data for existing documents in knowledge base
const existingDocuments = [
  {
    id: '1',
    name: '建筑工程施工质量验收统一标准.pdf',
    size: '2.5 MB',
    type: 'PDF',
    uploadDate: '2024-03-15',
    category: '规范标准'
  },
  {
    id: '2',
    name: '安全施工指南.doc',
    size: '1.8 MB',
    type: 'Word',
    uploadDate: '2024-03-14',
    category: '施工指南'
  },
  {
    id: '3',
    name: '地基工程技术规范.pdf',
    size: '3.2 MB',
    type: 'PDF',
    uploadDate: '2024-03-13',
    category: '规范标准'
  }
];

function DocumentUpload({ documents, onDocumentsChange }: DocumentUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onDocumentsChange([...documents, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    onDocumentsChange(documents.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">上传新文档</h3>
        
        <div className="space-y-4">
          <label className="block">
            <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 cursor-pointer">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="text-sm text-gray-600">
                  点击或拖拽文件至此处上传
                </div>
                <div className="text-xs text-gray-500">
                  支持 PDF、Word、CAD、Excel 等格式
                </div>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.dwg,.xls,.xlsx,.txt"
              />
            </div>
          </label>

          {documents.length > 0 && (
            <div className="space-y-2">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">{doc.name}</div>
                      <div className="text-xs text-gray-500">
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">知识库文档</h3>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="搜索文档..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">所有分类</option>
              <option value="standard">规范标准</option>
              <option value="guide">施工指南</option>
              <option value="tech">技术文档</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文档名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上传日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {existingDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploadDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-700">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-700">
            <div>共 {existingDocuments.length} 个文档</div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">上一页</button>
              <span>1 / 1</span>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentUpload;